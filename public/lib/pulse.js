/**
 * ibm.io pulse — first-party local analytics (IndexedDB).
 * Same beacon shape can later POST to a collector; this build stays on-device.
 */
(function (global) {
  'use strict';

  var DB_NAME = 'ibm.pulse';
  var DB_VERSION = 1;
  var STORE = 'events';
  var MAX_ROWS = 5000;
  var SESSION_KEY = 'ibm.pulse.sid';
  var OFF_KEY = 'pulse.off';
  var SHARED_KEY = 'ibm.tools.shared';

  var dbPromise = null;
  var queue = [];
  var flushing = false;

  function uuid() {
    try {
      if (global.crypto && typeof global.crypto.randomUUID === 'function') {
        return global.crypto.randomUUID();
      }
    } catch (e) {}
    return 'p-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function sessionId() {
    try {
      var sid = global.sessionStorage && global.sessionStorage.getItem(SESSION_KEY);
      if (!sid) {
        sid = uuid();
        if (global.sessionStorage) global.sessionStorage.setItem(SESSION_KEY, sid);
      }
      return sid;
    } catch (e) {
      return uuid();
    }
  }

  function isOff() {
    try {
      if (global.navigator && global.navigator.doNotTrack === '1') return true;
    } catch (e) {}
    try {
      var raw = global.localStorage && global.localStorage.getItem(SHARED_KEY);
      var data = raw ? JSON.parse(raw) : null;
      if (data && data[OFF_KEY]) return true;
    } catch (e2) {}
    return false;
  }

  function setOff(off) {
    try {
      var raw = global.localStorage.getItem(SHARED_KEY);
      var data = raw ? JSON.parse(raw) : {};
      if (!data || typeof data !== 'object') data = {};
      if (off) data[OFF_KEY] = true;
      else delete data[OFF_KEY];
      global.localStorage.setItem(SHARED_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function openDb() {
    if (dbPromise) return dbPromise;
    if (!global.indexedDB) {
      dbPromise = Promise.reject(new Error('no indexedDB'));
      return dbPromise;
    }
    dbPromise = new Promise(function (resolve, reject) {
      var req = global.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          var store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
          store.createIndex('ts', 'ts', { unique: false });
          store.createIndex('site', 'site', { unique: false });
          store.createIndex('name', 'name', { unique: false });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('idb open failed')); };
    });
    return dbPromise;
  }

  function trimStore(db) {
    return new Promise(function (resolve) {
      var tx = db.transaction(STORE, 'readwrite');
      var store = tx.objectStore(STORE);
      var countReq = store.count();
      countReq.onsuccess = function () {
        var n = countReq.result || 0;
        if (n <= MAX_ROWS) {
          resolve();
          return;
        }
        var drop = n - MAX_ROWS;
        var idx = store.index('ts');
        var cur = idx.openCursor();
        cur.onsuccess = function () {
          var cursor = cur.result;
          if (!cursor || drop <= 0) return;
          cursor.delete();
          drop -= 1;
          cursor.continue();
        };
      };
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { resolve(); };
    });
  }

  function writeEvent(row) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).add(row);
        tx.oncomplete = function () {
          trimStore(db).then(resolve, resolve);
        };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function flushQueue() {
    if (flushing || !queue.length) return;
    flushing = true;
    var next = queue.shift();
    writeEvent(next)
      .catch(function () {})
      .then(function () {
        flushing = false;
        flushQueue();
      });
  }

  function inferSite(opts) {
    if (opts && opts.site) return opts.site;
    var path = (global.location && global.location.pathname) || '';
    if (/^\/(wordcount|wordcounter|timecount|stories|pulse|tools|bill|hourly|budget|fuel|tax|invoice|unit|dose|bitrate|bandwidth|scalemap|pace|ratio|typescale|exposure|contrast|hue|odds|combo|deal|sample|streak|bayes)(\/|$)/i.test(path)) {
      return 'suite';
    }
    return 'portfolio';
  }

  function buildRow(name, props, opts) {
    opts = opts || {};
    props = props && typeof props === 'object' ? props : {};
    var loc = global.location || {};
    return {
      ts: Date.now(),
      name: String(name || 'event'),
      site: inferSite(opts),
      path: opts.path != null ? String(opts.path) : (loc.pathname || '/'),
      title: opts.title != null ? String(opts.title) : (global.document && document.title) || '',
      referrer: opts.referrer != null ? String(opts.referrer) : (global.document && document.referrer) || '',
      tool: opts.tool != null ? opts.tool : null,
      sid: sessionId(),
      props: props
    };
  }

  function track(name, props, opts) {
    if (isOff()) return Promise.resolve(null);
    var row = buildRow(name, props, opts);
    queue.push(row);
    flushQueue();
    return Promise.resolve(row);
  }

  function pageview(opts) {
    opts = opts || {};
    return track('pageview', opts.props || {}, opts);
  }

  function query(filter) {
    filter = filter || {};
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readonly');
        var store = tx.objectStore(STORE);
        var req = store.getAll();
        req.onsuccess = function () {
          var rows = req.result || [];
          if (filter.since != null) {
            var since = Number(filter.since);
            rows = rows.filter(function (r) { return r.ts >= since; });
          }
          if (filter.site) {
            rows = rows.filter(function (r) { return r.site === filter.site; });
          }
          if (filter.name) {
            rows = rows.filter(function (r) { return r.name === filter.name; });
          }
          rows.sort(function (a, b) { return b.ts - a.ts; });
          if (filter.limit != null) rows = rows.slice(0, Number(filter.limit));
          resolve(rows);
        };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function summarize(filter) {
    return query(filter).then(function (rows) {
      var views = 0;
      var events = 0;
      var byPath = {};
      var byDay = {};
      var bySite = { suite: 0, portfolio: 0 };
      var i, r, day, path;
      for (i = 0; i < rows.length; i++) {
        r = rows[i];
        if (r.name === 'pageview') views += 1;
        else events += 1;
        path = r.path || '/';
        byPath[path] = (byPath[path] || 0) + 1;
        day = new Date(r.ts).toISOString().slice(0, 10);
        byDay[day] = (byDay[day] || 0) + 1;
        if (r.site === 'suite' || r.site === 'portfolio') bySite[r.site] += 1;
      }
      var topPaths = Object.keys(byPath)
        .map(function (p) { return { path: p, count: byPath[p] }; })
        .sort(function (a, b) { return b.count - a.count; })
        .slice(0, 12);
      var days = Object.keys(byDay).sort();
      var spark = days.map(function (d) { return { day: d, count: byDay[d] }; });
      return {
        total: rows.length,
        views: views,
        events: events,
        bySite: bySite,
        topPaths: topPaths,
        spark: spark,
        recent: rows.slice(0, 40)
      };
    });
  }

  function clear() {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function exportJson(filter) {
    return query(filter).then(function (rows) {
      return JSON.stringify({ exportedAt: Date.now(), count: rows.length, events: rows }, null, 2);
    });
  }

  global.IBMPulse = {
    track: track,
    pageview: pageview,
    query: query,
    summarize: summarize,
    clear: clear,
    exportJson: exportJson,
    isOff: isOff,
    setOff: setOff,
    sessionId: sessionId,
    MAX_ROWS: MAX_ROWS
  };
})(typeof window !== 'undefined' ? window : globalThis);
