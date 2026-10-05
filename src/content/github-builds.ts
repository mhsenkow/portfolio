import type { Project } from './projects';

/** Curated public GitHub builds — machines, tools, sims, and craft experiments. */
export const githubBuilds: Project[] = [
	{
		slug: 'throughline',
		title: 'throughline',
		description:
			'Free local-first AI notebooks — web + macOS desktop. BYO model. We hold nothing.',
		year: 2026,
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/throughline/card.png',
			alt: 'throughline — local-first AI notebooks',
		},
		stack: ['Tauri', 'Rust', 'Python', 'HTML', 'Local-first', 'Ollama', 'Notebooks'],
		links: [
			{ label: 'Live', href: 'https://ibm.io/notebook/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/throughline' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: [
				'Local-first architecture',
				'Desktop + web parity',
				'BYO model UX',
				'Rust',
				'Python',
			],
			synopsis: [
				'throughline is a free, local-first AI notebook — web and macOS desktop — where your prompts, cells, and context stay on your machine. Bring your own model; nothing is held server-side.',
				'Craft thesis: the notebook should feel like a quiet tool, not a chat product. Same through-line as wordcounter and the loom family — local by default, portable, no account wall.',
			],
			goals: [
				'Ship a usable AI notebook that never requires a cloud account.',
				'Keep web and desktop behavior aligned so the tool travels with you.',
			],
			results: [
				'Public web build at ibm.io/notebook; open source on GitHub.',
			],
			prototypes: [
				{ label: 'Open notebook', href: 'https://ibm.io/notebook/' },
			],
		},
	},
	{
		slug: 'wordcounter',
		title: 'wordcounter',
		description:
			'Free online word counter — single-file, offline-capable, localStorage only. Sibling money/unit tools (invoice, tax, dose…) live on the same suite at ibm.io.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/wordcounter/card.png',
			alt: 'wordcounter — local word counter UI',
			width: 1280,
			height: 800,
		},
		stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'localStorage', 'PWA'],
		links: [
			{ label: 'Live', href: 'https://ibm.io/wordcount/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/wordcounter' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2025–2026',
			skills: ['Single-file apps', 'Theme systems', 'Offline UX', 'JavaScript'],
			synopsis: [
				'A quiet writing meter: paste or type, see words / reading time / sentences / characters, and keep everything on-device. Theme chrome ports into this portfolio.',
				'Built as a single-file, offline-friendly tool — no accounts, no sync, no telemetry. The same craft language powers sibling calculators (invoice, tax, bill, dose, and more) under /tools on ibm.io.',
			],
			goals: ['Make the most common writing metric feel calm and local.'],
			results: [
				'Public at ibm.io/wordcount; themes reused across the suite.',
				'Invoice generator and related money/unit tools shipped into the same suite.',
			],
			prototypes: [
				{ label: 'Open wordcounter', href: 'https://ibm.io/wordcount/' },
				{ label: 'Invoice generator', href: 'https://ibm.io/invoice/' },
			],
		},
	},
	{
		slug: 'loom-os',
		title: 'LOOM',
		description:
			'Personal intelligence OS with a retro terminal aesthetic — local-first AI powered by Ollama with vector memory.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/loom-os/card.png',
			alt: 'LOOM — personal intelligence OS terminal',
		},
		stack: ['TypeScript', 'Python', 'Ollama', 'Vector memory', 'Local-first'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2025–2026',
			skills: ['Agent tooling', 'Local LLM UX', 'Terminal craft', 'TypeScript', 'Python'],
			synopsis: [
				'LOOM is a personal intelligence OS — retro terminal chrome over a local-first AI stack. Ollama for inference, vector memory for recall, nothing that needs a SaaS login to think.',
				'Part of the loom family: tools that treat local compute as the default substrate.',
			],
			goals: ['Make local AI feel like a durable personal OS, not a demo.'],
			results: ['Public repo; foundational for later loom tools (SEC, story teller, IMDb).'],
		},
	},
	{
		slug: 'ramen',
		title: 'RAMEN',
		description:
			'RAMA CYCLE — walk the inner surface of a Kepler Drum. Embodied sci-fi space walk in the browser.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/ramen/card.jpg',
			alt: 'RAMEN — Kepler Drum walkthrough',
			width: 1200,
			height: 600,
		},
		stack: ['Rust', 'GDScript', 'GDShader', 'Web', 'Simulation'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/ramen/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/ramen' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['Rust', 'GDScript', 'Embodied interaction', 'Simulation'],
			synopsis: [
				'RAMEN (RAMA CYCLE) lets you walk the inner surface of a Kepler Drum — an embodied skim of Clarke/Niven-scale habitat geometry in the browser.',
			],
			prototypes: [{ label: 'Walk the drum', href: 'https://mhsenkow.github.io/ramen/' }],
		},
	},
	{
		slug: 'orrery',
		title: 'ORRERY',
		description:
			'Embodied planetary god-game prototype in WebXR — hold a solar system in your hands.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/orrery/card.png',
			alt: 'ORRERY — planetary HUD prototype',
			width: 1600,
			height: 900,
		},
		stack: ['JavaScript', 'WebXR', 'Three.js'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/orrery/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/orrery' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['WebXR', 'Three.js', 'JavaScript', 'Spatial UX'],
			synopsis: [
				'ORRERY is an embodied planetary god-game prototype: WebXR-first, built to feel like holding an orrery rather than clicking a map.',
			],
			prototypes: [{ label: 'Open ORRERY', href: 'https://mhsenkow.github.io/orrery/' }],
		},
	},
	{
		slug: 'loam',
		title: 'loam',
		description:
			'Low-poly isometric permaculture builder — plants instead of buildings, nutrient carriers instead of villagers, soil food web instead of economy.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/loam/card.png',
			alt: 'loam — permaculture design builder',
			width: 1200,
			height: 600,
		},
		stack: ['Godot 4', 'GDScript', 'GDShader', 'Simulation', 'Permaculture'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/loam' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['GDScript', 'Systems simulation', 'Permaculture UX'],
			synopsis: [
				'loam swaps the city-builder tropes: plants are the buildings, nutrient carriers are the villagers, and the soil food web is the economy. Low-poly isometric Godot 4 craft adjacent to walstad loom.',
			],
			goals: ['Make permaculture systems feel playable without turning them into extractive sim tropes.'],
		},
	},
	{
		slug: 'smoke-ring',
		title: 'The Smoke Ring',
		description:
			'Real-time voxel strategy sim in a gas torus — Integral Trees–inspired sky with no ground.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/smoke-ring/card.png',
			alt: 'The Smoke Ring — integral trees in a gas torus',
			width: 1600,
			height: 1306,
		},
		stack: ['TypeScript', 'Three.js', 'Vite', 'Voxel', 'ECS'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/smoke-ring' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['Systems design', 'Voxel rendering', 'TypeScript', 'Three.js', 'Orbital folklore as UI'],
			synopsis: [
				'A real-time voxel strategy sim set inside a gas torus orbiting a neutron star — hundred-kilometer trees, floating water spheres, and drifting jungles obey orbital mechanics disguised as folk wisdom: East takes you Out, Out takes you West…',
				'Inspired by Larry Niven’s The Integral Trees. No game engine — fixed-tick TypeScript sim with Three.js rendering and offline AI fallbacks.',
			],
			goals: [
				'Prove a sky-with-no-ground strategy loop can feel legible.',
				'Keep sim headless-testable and free of engine lock-in.',
			],
		},
	},
	{
		slug: 'mercury-button',
		title: 'Mercury button',
		description:
			'A liquid-metal button in one WebGL fragment shader — spectral thin-film, shallow-water fluid surface, no textures.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/mercury-button/card.png',
			alt: 'Mercury — liquid-metal WebGL button',
			width: 1240,
			height: 420,
		},
		stack: ['WebGL', 'GLSL', 'HTML', 'Shader'],
		links: [
			{ label: 'Demo', href: 'https://mhsenkow.github.io/mercury-button/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/mercury-button' },
		],
		details: {
			role: 'Shader craft',
			entity: 'Independent',
			years: '2026',
			skills: ['GLSL', 'WebGL', 'Fragment shaders', 'Optical materials'],
			synopsis: [
				'Single self-contained index.html. Capsule, metal, iridescence, and label are all generated per pixel; the surface is a live shallow-water fluid. Materials use measured optical constants — not a sprite sheet.',
			],
			prototypes: [{ label: 'Open demo', href: 'https://mhsenkow.github.io/mercury-button/' }],
		},
	},
	{
		slug: 'sec-loom',
		title: 'SEC Loom',
		description:
			'Cited institutional and insider filing intelligence terminal — 13F whales, Form 4 wire, provenance-backed.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/sec-loom/card.png',
			alt: 'SEC Loom — filing intelligence terminal',
			width: 1280,
			height: 800,
		},
		stack: ['TypeScript', 'Cloudflare Workers', 'Postgres', 'SQL', 'SEC EDGAR'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/sec-loom/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/sec-loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: [
				'Data provenance',
				'Financial disclosure UX',
				'Terminal craft',
				'TypeScript',
				'Postgres',
			],
			synopsis: [
				'A cited research terminal for quarterly 13F changes and Form 4 insider activity: Whale Grid, Conviction Flow, consensus–contrarian maps, and constrained natural-language queries — with filing accession numbers on every move.',
				'Demo data stays labeled as demo until the API reports live; it never pretends mock values are current market truth.',
			],
			goals: [
				'Make institutional filings explorable without laundering provenance.',
				'Ship a polished product proof from a written PRD.',
			],
			results: [
				'Public GitHub Pages demo with Whale Grid, Conviction Flow, and provenance-backed moves',
				'Demo/live honesty rules baked into the product surface — mock data never poses as market truth',
			],
			prototypes: [
				{ label: 'Open SEC Loom', href: 'https://mhsenkow.github.io/sec-loom/' },
			],
		},
	},
	{
		slug: 'imdb-loom',
		title: 'IMDb Loom',
		description:
			'Printable actor-network posters — story gallery + poster atelier over a DuckDB pipeline for film-graph craft.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/imdb-loom/card.png',
			alt: 'IMDb Loom atelier — scream-queen chord poster with inspect insights',
			width: 1600,
			height: 1000,
		},
		stack: ['TypeScript', 'Python', 'Vite', 'D3', 'DuckDB', 'Print'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/imbd_loom/?view=home' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/imbd_loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: [
				'Construct-based data viz',
				'Print-first authoring UX',
				'DuckDB pipelines',
				'TypeScript',
				'Python',
				'Data provenance / methodology',
			],
			headerImage: {
				src: '/images/projects/imdb-loom/atelier-chord.png',
				alt: 'Scream-queen web chord diagram in the poster atelier with strip constructs and Insight Hub',
				width: 1600,
				height: 1000,
			},
			prototypes: [
				{ label: 'Story gallery', href: 'https://mhsenkow.github.io/imbd_loom/?view=home' },
				{ label: 'Open atelier', href: 'https://mhsenkow.github.io/imbd_loom/?view=atelier' },
				{ label: 'Trust the data', href: 'https://mhsenkow.github.io/imbd_loom/?view=methodology' },
			],
			synopsis: [
				'Concept: Most film networks only show who worked with whom. Loom adds a second axis — who someone is (voice vs on-camera, gender coding, role type) flowing into what kind of work they do (genre, medium, era). Each “construct” is a saved lens: query + visual treatment.',
				'Story gallery: Six shelves of tuned sheets — Just look cool, Horror webs, Voice & cartoons, Careers & bridges, New lenses, Archetypes & eras. Open a sheet, then re-author in the atelier.',
				'Poster atelier: Chord, edge-bundle, timeline, and scatter heroes with density knobs, find/highlight/isolate, Insight Hub callouts, and local-only PDF export — one app from IMDb datasets → DuckDB → mm-sized SVG → print.',
				'Forms beyond the knot: Timeline heroes for long careers and silent→sound skylines; scatter for strength × prominence (blockbuster cloud). Theme/palette (loom, ink, dusk, okabe, contrast) travels in the share URL.',
				'Trust the data: Methodology surface for sources (IMDb non-commercial, optional TMDB/Wikidata/Bechdel), math, integrity badges, and per-construct quality — provenance is part of the product.',
			],
			goals: [
				'Make collaboration graphs readable as woven objects, not hairballs',
				'Author large-format posters without Illustrator / Gephi / RAWGraphs',
				'Keep construct, palette, and filters shareable in the URL',
				'Expose data limits honestly (top-billed cast, gender proxies, Bechdel coverage)',
			],
			results: [
				'Public explorer on GitHub Pages with 30+ constructs and curated gallery shelves',
				'Atelier ships chord / bundle / timeline / scatter heroes with strip sub-views and Insight Hub',
				'Pipeline builds construct JSON via DuckDB; PDF export stays local (Puppeteer)',
				'Methodology page documents sources, metrics, and integrity status per construct',
			],
			sections: [
				{
					title: 'Story gallery',
					body: 'Browse a cut that already reads as an object, then jump into the atelier to re-author.',
					images: [
						{
							src: '/images/projects/imdb-loom/home.png',
							alt: 'IMDb Loom story gallery — shelves of curated weaves with Open atelier and Trust the data',
						},
					],
				},
				{
					title: 'Poster atelier',
					body: 'Hero band as a dense chord or edge bundle; strip below pulls related constructs as parallel threads. Insight Hub turns the cut into readable claims.',
					images: [
						{
							src: '/images/projects/imdb-loom/atelier-chord.png',
							alt: 'Scream-queen web chord in atelier with construct strip and Insight Hub callouts',
						},
						{
							src: '/images/projects/imdb-loom/atelier-bundle.png',
							alt: 'Voice actors in cartoons edge-bundle hero with multi-construct strip and strength legend',
						},
					],
				},
				{
					title: 'Forms beyond the knot',
					body: 'Timeline and scatter heroes for careers that don’t want a circular weave.',
					images: [
						{
							src: '/images/projects/imdb-loom/atelier.png',
							alt: 'Voice actors in cartoons atelier view with vertical name warp and bundled co-appearance arcs',
						},
						{
							src: '/images/projects/imdb-loom/atelier-timeline.png',
							alt: 'Long-careers timeline hero — decades on the X axis with co-appearance arcs',
						},
						{
							src: '/images/projects/imdb-loom/atelier-scatter.png',
							alt: 'Blockbuster strength × prominence scatter hero in the poster atelier',
						},
					],
				},
				{
					title: 'Trust the data',
					body: 'Co-appearances are high-confidence (same IMDb title in principals); gender/voice/Bechdel carry explicit caveats on the methodology page.',
					images: [
						{
							src: '/images/projects/imdb-loom/methodology.png',
							alt: 'Trust the data methodology page listing IMDb, TMDB, Wikidata, and Bechdel sources with caveats',
						},
					],
				},
			],
		},
	},
	{
		slug: 'loom-storyteller',
		title: 'Loom Story Teller',
		description:
			'Local-first data storytelling at loom.ibm.io — live feeds into charts, DuckDB in the browser, Dive for Scuba-style slice-and-dice.',
		year: 2026,
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/loom-storyteller/card.png',
			alt: 'Loom Chart — Quake globe from live USGS feed, sized by magnitude',
			width: 1280,
			height: 800,
		},
		gallery: [
			{
				src: '/images/projects/loom-storyteller/stories.png',
				alt: 'What’s interesting right now — 60+ live story cards across open data',
			},
			{
				src: '/images/projects/loom-storyteller/chart.png',
				alt: 'Quake globe — longitude × latitude, color by mag_type, size by magnitude',
			},
			{
				src: '/images/projects/loom-storyteller/explorer.png',
				alt: 'Explorer — USGS Quakes table with column sparklines and filters',
			},
			{
				src: '/images/projects/loom-storyteller/dive.png',
				alt: 'Dive — time-series count of quakes with filters, group-by, and shareable link',
			},
			{
				src: '/images/projects/loom-storyteller/sources.png',
				alt: 'Data & sources — live feeds from Wikipedia, USGS, NASA, GDACS, and more',
			},
		],
		stack: [
			'TypeScript',
			'Rust',
			'Tauri',
			'DuckDB',
			'Vega-Lite',
			'WebGPU',
			'WGSL',
			'macOS',
			'Cloudflare',
		],
		links: [
			{ label: 'Live — loom.ibm.io', href: 'https://loom.ibm.io/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/Loom_story_teller' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: [
				'Local-first data UX',
				'DuckDB-WASM',
				'Vega-Lite / WebGPU',
				'Dive / OLAP exploration',
				'Live open-data feeds',
				'TypeScript',
				'Rust',
				'Tauri',
			],
			synopsis: [
				'Loom is a local-first data storyteller: connect a live feed or drop a CSV, then move Explorer → Chart → Query → Dive without leaving the browser. DuckDB runs on-device; charts author in Vega-Lite; GPU scenes (globe, firefly, terrain) render when the mark needs them.',
				'“What’s interesting right now” scans dozens of live feeds — USGS quakes, ISS track, HN, crypto, weather, NASA events — and opens the best one as a shareable chart. The whole encoding travels in the URL hash so a link reopens the same view.',
			],
			goals: [
				'Make live open data feel as playful as a notebook and as precise as SQL.',
				'Ship one craft language across desktop (Tauri + DuckDB) and the public web build at loom.ibm.io.',
			],
			results: [
				'Public at https://loom.ibm.io — Explorer, Chart, Query, Dive, plus “What’s interesting right now.”',
				'Live feeds and catalogs (data.gov, city portals, TidyTuesday, USGS, NASA, GDACS) load into DuckDB and chart in one tap.',
				'Shareable #chart= / #dive= links restore data, encodings, headline, and look; Share exports Square / Portrait / Story / Wide frames.',
			],
			prototypes: [
				{
					label: 'Open Loom',
					href: 'https://loom.ibm.io/',
					description: 'Public web build — start from a live story or load your own CSV.',
				},
				{
					label: 'Example: Quake globe',
					href: 'https://loom.ibm.io/#chart=eyJ2IjoxLCJzcmMiOiJzdHJlYW06Ly91c2dzIiwiYyI6eyJrIjoiZ2xvYmUiLCJ4IjoibG9uZ2l0dWRlIiwieSI6ImxhdGl0dWRlIiwiYyI6Im1hZ190eXBlIiwicyI6Im1hZ25pdHVkZSIsInRpIjoiUXVha2UgZ2xvYmUiLCJzdCI6IlNwaW4gdGhlIHBsYW5ldCDigJQgcXVha2VzIGFzIHBvaW50cyJ9fQ',
					description: 'Live USGS quakes on a globe — longitude × latitude, color by mag_type.',
				},
				{
					label: 'Source',
					href: 'https://github.com/mhsenkow/Loom_story_teller',
					description: 'Open-source repo — desktop + web, sample spool, theme tokens shared with ibm.io.',
				},
			],
			sections: [
				{
					title: 'What’s interesting right now',
					body: [
						'Every empty screen leads with a discovery deck: 60+ live stories across Earth, Space, Markets, News, and Cities. Filter by topic or mark type (globe, choropleth, hexbin, trails…), tap a card, and Loom opens it as a chart with headline included — no blank canvas.',
					],
					images: [
						{
							src: '/images/projects/loom-storyteller/stories.png',
							alt: 'What’s interesting right now — live story cards from USGS, NASA, ISS, HN, and more',
						},
					],
				},
				{
					title: 'Chart — encodings that travel',
					body: [
						'Suggest chart / Deep scan / Tell a story propose marks that fit the table. Encoding channels (X / Y / Color / Size / Lon / Lat) update the canvas live; Copy chart link or the address bar restores the same data, type, fields, and look. GPU scenes (globe, orbit, firefly, terrain) sit beside classic Vega-Lite marks.',
					],
					images: [
						{
							src: '/images/projects/loom-storyteller/chart.png',
							alt: 'Chart view — Quake globe with suggestions rail and encoding panel',
						},
					],
				},
				{
					title: 'Explorer — rows you can feel',
					body: [
						'Virtualized tables with per-column sparklines, bars, heat, and null%, plus inline filters. Profile a column, spark a chart from the toolbar, or jump straight to Chart / Dive with the same active table (loom_active in DuckDB).',
					],
					images: [
						{
							src: '/images/projects/loom-storyteller/explorer.png',
							alt: 'Explorer — USGS Quakes with magnitude sparklines and cell bars',
						},
					],
				},
				{
					title: 'Dive — click to ask',
					body: [
						'Scuba-style slice-and-dice: pick a time window, filter, group by, compare periods, and drill any value. Metrics include count, percentiles, first/last, and share. The query lives in the link — Back undoes a step; Copy link shares the dive.',
					],
					images: [
						{
							src: '/images/projects/loom-storyteller/dive.png',
							alt: 'Dive — quake count over time with filters, group-by, and SQL link',
						},
					],
				},
				{
					title: 'Data & sources',
					body: [
						'Connect live feeds (Wikipedia edits, USGS quakes, NASA events, GDACS alerts, NWS, weather, transit…) or browse catalogs — data.gov, city/state portals, TidyTuesday, curated packs. Drop your own CSVs; everything stays on-device unless you choose to share.',
					],
					images: [
						{
							src: '/images/projects/loom-storyteller/sources.png',
							alt: 'Data & sources — live feeds panel with USGS Earthquakes connected',
						},
					],
				},
			],
		},
	},
	{
		slug: 'recursive-serendipity',
		title: 'Recursive Serendipity',
		description:
			'Local-first evolutionary app runner — Tauri, Bun, Ollama, Playwright vision eval.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/recursive-serendipity/card.png',
			alt: 'Recursive Serendipity — evolutionary app runner',
		},
		stack: ['Tauri', 'Rust', 'TypeScript', 'Bun', 'Ollama', 'Playwright'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/RecursiveSerendipity' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['Rust', 'TypeScript', 'Agent loops', 'Vision eval'],
			synopsis: [
				'An evolutionary loop for apps: generate, run, vision-eval with Playwright, mutate — all local via Tauri, Bun, and Ollama.',
			],
		},
	},
	{
		slug: 'sleeping-ox',
		title: 'Sleeping Ox Studios',
		description:
			'A blue ox roams a fixed voxel world of real projects while the world re-skins through endless low-poly styles.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/sleeping-ox/card.png',
			alt: 'Sleeping Ox Studios — voxel portfolio world',
			width: 1200,
			height: 600,
		},
		stack: ['TypeScript', 'Three.js', 'Voxel', 'Portfolio'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/sleeping-ox-studios/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/sleeping-ox-studios' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Sleeping Ox Studios',
			years: '2026',
			skills: ['TypeScript', 'Three.js', 'Procedural theming', 'Spatial IA'],
			synopsis: [
				'Walkable portfolio: career work spirals west through time, solo GitHub repos east in thematic groves. The load-bearing idea is a theming engine that re-skins one fixed 3D world through many readings of “low-poly voxel.”',
				'Content is generated from live sources — not hand-edited dossiers.',
			],
			prototypes: [
				{ label: 'Enter the world', href: 'https://mhsenkow.github.io/sleeping-ox-studios/' },
			],
		},
	},
	{
		slug: 'trashcan-ai',
		title: 'trashcanAI',
		description:
			'Parametric receptacle generator with algorithmic surface finishes — watertight STL for FDM.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/trashcan-ai/card.png',
			alt: 'trashcanAI — parametric receptacle generator',
			width: 1280,
			height: 800,
		},
		stack: ['TypeScript', 'Manifold', 'WebGL', 'STL', 'Computational geometry'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/trashcanAI/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/trashcanAI' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['TypeScript', 'Manifold CSG', 'Parametric design', 'FDM fabrication'],
			synopsis: [
				'Browser tool for custom-dimensioned bins with algorithmic exterior finishes (ribbing, knurling, Voronoi, weave…) and smooth interiors — watertight Manifold meshes ready for FDM.',
			],
			prototypes: [{ label: 'Generate a bin', href: 'https://mhsenkow.github.io/trashcanAI/' }],
		},
	},
	{
		slug: 'geodesic',
		title: 'Geodesic hubs',
		description:
			'Organic 3D-printable geodesic dome connector hub generator — Manifold CSG, STL export.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/geodesic/card.png',
			alt: 'Geodesic — dome hub generator',
			width: 1280,
			height: 720,
		},
		stack: ['TypeScript', 'Manifold', 'STL', 'Fabrication', 'Computational geometry'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/geodesic/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/geodesic' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['TypeScript', 'Manifold CSG', 'Parametric fabrication'],
			synopsis: [
				'Design geodesic dome connector hubs in the browser: icosa/octa/tetra V1–V8, round or timber sockets, Weaverbird-style organic surfaces, watertight STL bundles with fit checks.',
			],
			prototypes: [{ label: 'Design hubs', href: 'https://mhsenkow.github.io/geodesic/' }],
		},
	},
	{
		slug: 'fun-loaders',
		title: 'fun-loaders',
		description:
			'Canvas-based React loading animations — Menger sponges, reaction-diffusion, attractors, Hilbert curves.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/fun-loaders/card.png',
			alt: 'fun-loaders — generative loading animations',
			width: 1280,
			height: 800,
		},
		stack: ['React', 'TypeScript', 'Canvas'],
		links: [
			{ label: 'Demo', href: 'https://mhsenkow.github.io/fun-loaders/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/fun-loaders' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['React', 'TypeScript', 'Canvas', 'Generative animation'],
			synopsis: [
				'A library of complex canvas loaders inspired by fractals, reaction-diffusion, strange attractors, and space-filling curves — waiting as craft, not spinner chrome.',
			],
			prototypes: [{ label: 'Browse loaders', href: 'https://mhsenkow.github.io/fun-loaders/' }],
		},
	},
	{
		slug: 'starship-vega',
		title: 'Starship Vega',
		description:
			'Modern Vega visualization gallery with interactive chart creation and data management.',
		year: 2025,
		category: 'creative',
		image: {
			src: '/images/projects/starship-vega/card.png',
			alt: 'Starship Vega — visualization gallery',
		},
		stack: ['TypeScript', 'Vega', 'React'],
		links: [
			{ label: 'Live', href: 'https://starship-vega.vercel.app' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/starship-vega' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2025',
			skills: ['TypeScript', 'React', 'Vega', 'Data visualization'],
			synopsis: [
				'A Vega visualization gallery for interactive chart creation and data management — a playground adjacent to Meta-era data-viz craft.',
			],
			prototypes: [{ label: 'Open gallery', href: 'https://starship-vega.vercel.app' }],
		},
	},
];
