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
		stack: ['Tauri', 'HTML', 'Local-first', 'Ollama', 'Notebooks'],
		links: [
			{ label: 'Live', href: 'https://ibm.io/notebook/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/throughline' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['Local-first architecture', 'Desktop + web parity', 'BYO model UX'],
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
			'Free online word counter — single-file, offline-capable, localStorage only. Live at ibm.io/wordcount.',
		year: 2026,
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/wordcounter/card.png',
			alt: 'wordcounter — local word counter UI',
			width: 1280,
			height: 800,
		},
		stack: ['HTML', 'CSS', 'localStorage', 'PWA'],
		links: [
			{ label: 'Live', href: 'https://ibm.io/wordcount/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/wordcounter' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2025–2026',
			skills: ['Single-file apps', 'Theme systems', 'Offline UX'],
			synopsis: [
				'A quiet writing meter: paste or type, see words / reading time / sentences / characters, and keep everything on-device. Theme chrome ports into this portfolio.',
				'Built as a single-file, offline-friendly tool — no accounts, no sync, no telemetry.',
			],
			goals: ['Make the most common writing metric feel calm and local.'],
			results: ['Public at ibm.io/wordcount; themes reused across the suite.'],
			prototypes: [{ label: 'Open wordcounter', href: 'https://ibm.io/wordcount/' }],
		},
	},
	{
		slug: 'loom-os',
		title: 'LOOM',
		description:
			'Personal intelligence OS with a retro terminal aesthetic — local-first AI powered by Ollama with vector memory.',
		year: 2026,
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/loom-os/card.png',
			alt: 'LOOM — personal intelligence OS terminal',
		},
		stack: ['TypeScript', 'Ollama', 'Vector memory', 'Local-first'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2025–2026',
			skills: ['Agent tooling', 'Local LLM UX', 'Terminal craft'],
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
		stack: ['Rust', 'Web', 'Simulation'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/ramen/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/ramen' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
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
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/loam/card.jpg',
			alt: 'loam — permaculture design builder',
			width: 1200,
			height: 600,
		},
		stack: ['Godot 4', 'GDScript', 'Simulation', 'Permaculture'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/loam' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
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
		featured: true,
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
			skills: ['Systems design', 'Voxel rendering', 'Orbital folklore as UI'],
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
		stack: ['WebGL', 'GLSL', 'HTML'],
		links: [
			{ label: 'Demo', href: 'https://mhsenkow.github.io/mercury-button/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/mercury-button' },
		],
		details: {
			role: 'Shader craft',
			entity: 'Independent',
			years: '2026',
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
		featured: true,
		category: 'creative',
		image: {
			src: '/images/projects/sec-loom/card.png',
			alt: 'SEC Loom — filing intelligence terminal',
			width: 1280,
			height: 800,
		},
		stack: ['TypeScript', 'Cloudflare Workers', 'Postgres', 'SEC EDGAR'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/sec-loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			skills: ['Data provenance', 'Financial disclosure UX', 'Terminal craft'],
			synopsis: [
				'A cited research terminal for quarterly 13F changes and Form 4 insider activity: Whale Grid, Conviction Flow, consensus–contrarian maps, and constrained natural-language queries — with filing accession numbers on every move.',
				'Demo data stays labeled as demo until the API reports live; it never pretends mock values are current market truth.',
			],
			goals: [
				'Make institutional filings explorable without laundering provenance.',
				'Ship a polished product proof from a written PRD.',
			],
		},
	},
	{
		slug: 'imdb-loom',
		title: 'IMDb Loom',
		description:
			'Printable actor-network posters — Vite atelier plus DuckDB pipeline for film graph craft.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/imdb-loom/card.jpg',
			alt: 'IMDb Loom — actor network posters',
			width: 1200,
			height: 600,
		},
		stack: ['TypeScript', 'Vite', 'DuckDB', 'Print'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/imbd_loom' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			synopsis: [
				'IMDb Loom turns actor collaboration graphs into printable network posters — an atelier UI over a DuckDB pipeline for local film-data craft.',
			],
		},
	},
	{
		slug: 'loom-storyteller',
		title: 'Loom Story Teller',
		description:
			'Local-first data storytelling for macOS — DuckDB, Vega-Lite, WebGPU.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/loom-storyteller/card.jpg',
			alt: 'Loom Story Teller — local data storytelling',
			width: 1200,
			height: 600,
		},
		stack: ['TypeScript', 'DuckDB', 'Vega-Lite', 'WebGPU', 'macOS'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/Loom_story_teller' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			synopsis: [
				'Local-first data storytelling on macOS: query with DuckDB, author with Vega-Lite, render with WebGPU — keep the narrative machine on your desk.',
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
		stack: ['Tauri', 'Bun', 'Ollama', 'Playwright'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/RecursiveSerendipity' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
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
			src: '/images/projects/sleeping-ox/card.jpg',
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
		stack: ['TypeScript', 'Manifold', 'WebGL', 'STL'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/trashcanAI/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/trashcanAI' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
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
		stack: ['TypeScript', 'Manifold', 'STL', 'Fabrication'],
		links: [
			{ label: 'Live', href: 'https://mhsenkow.github.io/geodesic/' },
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/geodesic' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
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
			synopsis: [
				'A Vega visualization gallery for interactive chart creation and data management — a playground adjacent to Meta-era data-viz craft.',
			],
			prototypes: [{ label: 'Open gallery', href: 'https://starship-vega.vercel.app' }],
		},
	},
	{
		slug: 'ibm-alum',
		title: 'IBM Alum',
		description:
			'Independent ex-IBM alumni directory — Next.js + Postgres, static public preview on GitHub Pages.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/ibm-alum/card.jpg',
			alt: 'IBM Alum — alumni directory',
			width: 1200,
			height: 600,
		},
		stack: ['Next.js', 'Postgres', 'TypeScript'],
		links: [
			{ label: 'GitHub', href: 'https://github.com/mhsenkow/ibm_alum' },
		],
		details: {
			role: 'Design & engineering',
			entity: 'Independent',
			years: '2026',
			synopsis: [
				'An independent directory for ex-IBM alumni — Next.js app with Postgres backing and a static public preview on GitHub Pages.',
			],
		},
	},
];
