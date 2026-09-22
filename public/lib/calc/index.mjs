/**
 * Pure formulas for number instruments — shared by MCP + tests.
 * Pages keep inline compute for zero-module static hosting; keep these in sync.
 */

export function billSplit({ total, tipPct, people }) {
  const t = Math.max(0, Number(total) || 0);
  const tip = Math.max(0, Number(tipPct) || 0);
  const p = Math.max(1, Math.floor(Number(people) || 1));
  const tipAmt = t * (tip / 100);
  const grand = t + tipAmt;
  return {
    tipAmount: tipAmt,
    grand,
    perPerson: grand / p,
    people: p
  };
}

/** Tip on pre-tax subtotal vs on tax-inclusive total. */
export function taxTip({ subtotal, taxPct, tipPct, tipOn }) {
  const sub = Math.max(0, Number(subtotal) || 0);
  const tax = Math.max(0, Number(taxPct) || 0);
  const tip = Math.max(0, Number(tipPct) || 0);
  const taxAmt = sub * (tax / 100);
  const tipBase = tipOn === 'total' ? sub + taxAmt : sub;
  const tipAmt = tipBase * (tip / 100);
  const grand = sub + taxAmt + tipAmt;
  return { taxAmount: taxAmt, tipAmount: tipAmt, tipBase, grand };
}

/** Invoice lines → subtotal → discount → tax → due. */
export function invoiceTotal({ lines, discount, discMode, taxPct }) {
  const rows = (Array.isArray(lines) ? lines : []).map((L) => {
    const qty = Math.max(0, Number(L && L.qty) || 0);
    const rate = Math.max(0, Number(L && L.rate) || 0);
    const amt = qty * rate;
    const desc = String((L && L.desc) || '').trim();
    return { desc, qty, rate, amt };
  }).filter((L) => L.desc || L.amt > 0);
  const subtotal = rows.reduce((s, L) => s + L.amt, 0);
  const discRaw = Math.max(0, Number(discount) || 0);
  let discAmt = discMode === 'pct' ? subtotal * (discRaw / 100) : discRaw;
  if (discAmt > subtotal) discAmt = subtotal;
  const taxable = Math.max(0, subtotal - discAmt);
  const tax = Math.max(0, Number(taxPct) || 0);
  const taxAmount = taxable * (tax / 100);
  const grand = taxable + taxAmount;
  return { lines: rows, subtotal, discountAmount: discAmt, taxAmount, grand };
}

/** Distance at pace → duration ms; or duration → required pace. */
export function paceEta({ distance, paceMinPerUnit, hours, mode }) {
  const d = Math.max(0, Number(distance) || 0);
  const pace = Math.max(0, Number(paceMinPerUnit) || 0);
  if (mode === 'pace') {
    const h = Math.max(0, Number(hours) || 0);
    const mins = h * 60;
    const needed = d > 0 ? mins / d : 0;
    return { etaHours: h, paceMinPerUnit: needed, distance: d };
  }
  const etaMin = d * pace;
  return { etaHours: etaMin / 60, paceMinPerUnit: pace, distance: d };
}

function srgbToLinear(c) {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

export function parseHexColor(hex) {
  const h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16)
    ];
  }
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16)
  ];
}

export function relativeLuminance(rgb) {
  if (!rgb) return 0;
  const [r, g, b] = rgb.map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fgHex, bgHex) {
  const fg = parseHexColor(fgHex);
  const bg = parseHexColor(bgHex);
  if (!fg || !bg) return { ratio: 0, aa: false, aaa: false, aaLarge: false, aaaLarge: false };
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return {
    ratio,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5
  };
}

/** D65 / 2° CIE XYZ → CIELAB. */
function xyzToLab(x, y, z) {
  const Xn = 0.95047;
  const Yn = 1;
  const Zn = 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const fx = f(x / Xn);
  const fy = f(y / Yn);
  const fz = f(z / Zn);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

function labToXyz(L, a, b) {
  const Xn = 0.95047;
  const Yn = 1;
  const Zn = 1.08883;
  const fy = (L + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const inv = (t) => {
    const t3 = t * t * t;
    return t3 > 216 / 24389 ? t3 : (108 / 841) * (t - 4 / 29);
  };
  return [Xn * inv(fx), Yn * inv(fy), Zn * inv(fz)];
}

function linearToSrgb(c) {
  const x = Math.max(0, Math.min(1, c));
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

function rgbToLab(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
  const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
  return xyzToLab(x, y, z);
}

function labToRgb(L, a, b) {
  const [x, y, z] = labToXyz(L, a, b);
  const r = linearToSrgb(x * 3.2404542 + y * -1.5371385 + z * -0.4985314);
  const g = linearToSrgb(x * -0.969266 + y * 1.8760108 + z * 0.041556);
  const bl = linearToSrgb(x * 0.0556434 + y * -0.2040259 + z * 1.0572252);
  return [
    Math.round(Math.max(0, Math.min(1, r)) * 255),
    Math.round(Math.max(0, Math.min(1, g)) * 255),
    Math.round(Math.max(0, Math.min(1, bl)) * 255)
  ];
}

function rgbToHex(rgb) {
  return (
    '#' +
    rgb
      .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Helmholtz / Schrödinger-style geometry over CIELAB (paper approx via ΔE structure).
 * Neutral at equal lightness = closest to black → (L*, 0, 0).
 * Path A→gray is radial in a*b* (shortest under the usual ΔE family).
 *
 * Build from geometric HCL, or from hex (+ optional intensity / quality for Bezold–Brücke).
 */
export function colorGeometry(opts = {}) {
  const t = Math.max(0, Math.min(100, Number(opts.path) || 0)) / 100;
  const geo = opts.quality !== 'straight';
  let L;
  let a;
  let b;
  let rgb;

  if (opts.hex != null && opts.hue == null && opts.C == null && opts.L == null) {
    const base = parseHexColor(opts.hex) || [196, 92, 38];
    const inten = Math.max(5, Math.min(150, Number(opts.intensity) || 100)) / 100;
    if (geo) {
      const lab0 = rgbToLab(base);
      L = Math.max(0, Math.min(100, lab0.L * inten));
      a = lab0.a;
      b = lab0.b;
      rgb = labToRgb(L, a, b);
    } else {
      rgb = base.map((c) => Math.max(0, Math.min(255, c * inten)));
      const lab = rgbToLab(rgb);
      L = lab.L;
      a = lab.a;
      b = lab.b;
    }
  } else {
    L = Math.max(0, Math.min(100, Number(opts.L) != null ? Number(opts.L) : 50));
    const C = Math.max(0, Math.min(140, Number(opts.C) != null ? Number(opts.C) : 40));
    const hueDeg = ((Number(opts.hue) || 0) % 360 + 360) % 360;
    const rad = (hueDeg * Math.PI) / 180;
    a = C * Math.cos(rad);
    b = C * Math.sin(rad);
    rgb = labToRgb(L, a, b);
  }

  const lab = { L, a, b };
  const C = Math.sqrt(a * a + b * b);
  const hue = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  const mid = { L, a: a * (1 - t), b: b * (1 - t) };
  const midC = C * (1 - t);
  const midRgb = labToRgb(mid.L, mid.a, mid.b);
  const grayRgb = labToRgb(L, 0, 0);
  const damp = C > 0 ? Math.pow(C, 0.7) : 0;
  /* Straight-line intensity twin of current Lab color (same L* scaled via RGB). */
  const straightRgb = rgb.map((c) => Math.max(0, Math.min(255, c * 0.45)));
  const straightLab = rgbToLab(straightRgb);

  return {
    hex: rgbToHex(rgb),
    L,
    a,
    b,
    C,
    hue,
    grayL: L,
    grayHex: rgbToHex(grayRgb),
    midHex: rgbToHex(midRgb),
    midC,
    path: t,
    damp,
    quality: geo ? 'geodesic' : 'straight',
    straightHue: ((Math.atan2(straightLab.b, straightLab.a) * 180) / Math.PI + 360) % 360,
    hueShift: (((Math.atan2(straightLab.b, straightLab.a) * 180) / Math.PI + 360) % 360) - hue
  };
}

export function combinations(n, k) {
  n = Math.max(0, Math.floor(Number(n) || 0));
  k = Math.max(0, Math.floor(Number(k) || 0));
  if (k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

/**
 * Simple Bayes update for a binary hypothesis.
 * prior = P(H), hit = P(E|H), miss = P(E|¬H) → posterior P(H|E)
 */
export function bayesUpdate({ prior, hit, miss }) {
  const p = Math.min(1, Math.max(0, Number(prior) || 0));
  const ph = Math.min(1, Math.max(0, Number(hit) || 0));
  const pm = Math.min(1, Math.max(0, Number(miss) || 0));
  const num = ph * p;
  const den = num + pm * (1 - p);
  const posterior = den > 0 ? num / den : 0;
  return { prior: p, posterior, likelihoodRatio: pm > 0 ? ph / pm : Infinity };
}

export function formatDurationHours(hours) {
  const h = Math.max(0, Number(hours) || 0);
  const totalMin = Math.round(h * 60);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  if (hh <= 0) return mm + ' min';
  return hh + ':' + String(mm).padStart(2, '0');
}
