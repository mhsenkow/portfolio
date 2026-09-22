import { githubBuilds } from './github-builds';

export type Project = {
	slug: string;
	/** Legacy URL segments that should resolve to this project. */
	aliases?: string[];
	/** Folder under public/images/projects for auto-gallery (defaults to slug). */
	mediaDir?: string;
	title: string;
	description: string;
	year?: number;
	featured?: boolean;
	links?: { label: string; href: string }[];
	image?: { src: string; alt: string; width?: number; height?: number };
	gallery?: { src: string; alt: string; width?: number; height?: number }[];
	stack?: string[];
  category?: 'work' | 'creative';
  details?: {
    role?: string;
    entity?: string;
    location?: string;
    years?: string;
    team?: string;
    synopsis?: string | string[];
    skills?: string[];
    prototypes?: { label: string; href: string }[];
    headerImage?: { src: string; alt: string; width?: number; height?: number };
    headerEmbed?: { html: string; title?: string; link?: string };
    goals?: string | string[];
    results?: string | string[];
    sections?: {
      title: string;
      body?: string | string[];
      images?: { src: string; alt: string }[];
    }[];
  };
};

export const projects: Project[] = [
	...githubBuilds,
	{
		slug: 'judge',
		aliases: ['i2systems-lighting-infra'],
		mediaDir: 'i2systems-lighting-infra',
		title: 'Judge — Salesforce / CRM integrity',
		description:
			'Local-first review-gated integrity layer over Salesforce — scan accounts/contacts, rank issues, apply sandbox-safe fixes with HubSpot / Mailchimp sync and a full audit trail.',
		year: 2026,
		featured: true,
		image: {
			src: '/images/projects/i2systems-lighting-infra/card.png',
			alt: 'Judge — Agents view with detail panel',
			width: 1024,
			height: 600,
		},
		stack: ['Product design', 'Salesforce', 'Next.js', 'Postgres', 'CRM integrity'],
		details: {
			role: 'Staff Product Designer / builder',
			entity: 'i2Systems',
			location: 'Remote · Morris, CT lighting manufacturer',
			years: '2025–present',
			team: 'Built locally as a working CRM integrity surface for sales ops and marketing.',
			skills: [
				'CRM / data integrity UX',
				'Prototyping in production code',
				'Salesforce + HubSpot + Mailchimp connectors',
			],
			headerImage: {
				src: '/images/projects/i2systems-lighting-infra/card.png',
				alt: 'Judge — Agents view with detail panel',
				width: 1024,
				height: 600,
			},
			synopsis: [
				'Judge is a review-gated integrity layer I built locally over Salesforce, with HubSpot and Mailchimp sync. It scans accounts and contacts, ranks issues, and applies sandbox-safe fixes with an audit trail — human review instead of blind automation, Salesforce stays system of record.',
				'Direction is governance, not replacement: native connectors keep syncing; Judge makes integrity issues visible and stamps every decision.',
			],
			goals: [
				'Make CRM data trustworthy enough that sales and marketing can act on it without tribal cleanup rituals',
				'Keep Salesforce as system of record while adding a human review gate before writes',
				'Leave an audit trail for every proposed and applied fix',
			],
			results: [
				'Judge MVP live for sandbox Salesforce scan → review → gated apply, with HubSpot/Mailchimp connections and audit log',
			],
			sections: [
				{
					title: 'Salesforce infra — Judge',
					body: [
						'Built Judge MVP (Next.js + Postgres) as the working surface for CRM integrity: connect Salesforce / HubSpot / Mailchimp, scan sandbox accounts and contacts into a working copy, severity-rank proposals, and gate writes behind review with dry-run, confirm, and undo.',
						'Direction is governance, not replacement — native connectors keep syncing; Judge makes integrity issues visible and stamps every decision on an audit trail.',
					],
				},
			],
		},
	},
	{
		slug: 'walstad-loom',
		title: 'walstad loom',
		description:
			'A generative pixel-art Walstad aquarium — 3D voxel sim → palette-quantize render, closed nutrient loop, agent fish with genomes. Watch more than you play.',
		year: 2026,
		category: 'creative',
		image: {
			src: '/images/projects/walstad-loom/card.png',
			alt: 'walstad loom — library capsule',
			width: 600,
			height: 900,
		},
		gallery: [
			{ src: '/images/projects/walstad-loom/tank-void.png', alt: 'Void tank — isolated aquascape' },
			{ src: '/images/projects/walstad-loom/planted.png', alt: 'Planted community tank' },
			{ src: '/images/projects/walstad-loom/school.png', alt: 'Schooling fish in the water column' },
			{ src: '/images/projects/walstad-loom/night.png', alt: 'Night photoperiod' },
			{ src: '/images/projects/walstad-loom/detail.png', alt: 'Close detail in the tank' },
		],
		stack: ['Godot 4', 'GDScript', 'GDShader', 'Simulation', 'Pixel art', 'Steam'],
		links: [
			{ label: 'Steam', href: 'https://store.steampowered.com/app/4796460/' },
			{ label: 'GitHub (free builds)', href: 'https://github.com/mhsenkow/SimFish/releases' },
			{ label: 'Site', href: 'https://mhsenkow.github.io/SimFish/docs/' },
		],
		details: {
			role: 'Design, engineering, simulation, art direction',
			entity: 'Sleeping Ox Studios',
			years: '2025–2026 · Early Access July 7, 2026',
			skills: [
				'Systems design',
				'Real-time rendering',
				'Procedural content',
				'Game feel / HUD craft',
				'Steamworks',
			],
			headerImage: {
				src: '/images/projects/walstad-loom/header.png',
				alt: 'walstad loom store header',
				width: 920,
				height: 430,
			},
			prototypes: [
				{ label: 'Wishlist on Steam', href: 'https://store.steampowered.com/app/4796460/' },
				{ label: 'Play free (GitHub)', href: 'https://github.com/mhsenkow/SimFish/releases/latest' },
			],
			synopsis: [
				'walstad loom is a living tank you watch more than you play. A continuous 3D voxel aquascape runs through a palette-quantize + dither pipeline so everything reads as chunky 48-color pixel art — while plants, fish, shrimp, and snails interact in a Walstad-style closed nutrient loop underneath.',
				'Craft thesis: the beauty is downstream of the sim. Leaves arrange by real phyllotaxis. Shells draw carbonate and erode in soft water. Beer–Lambert extinction turns depth into colour. Fish carry genomes, coats, and minds — not keyframed loops.',
				'Built solo in Godot 4 as digital craft: the same through-line as the generative sketches and Isovox experiments, taken all the way to a shippable Steam game. macOS / Windows / Linux / Android.',
			],
			sections: [
				{
					title: 'The pipeline',
					body: [
						'Continuous 3D simulation → voxel fauna and foliage → GDShader palette LUT + Bayer dither → 48-color output. Motion comes from state, not animation clips.',
					],
					images: [
						{ src: '/images/projects/walstad-loom/tank-void.png', alt: 'Void preset tank' },
					],
				},
				{
					title: 'The loop',
					body: [
						'Plants pull nutrients from stratified substrate. Fauna waste feeds the bed. Algae blooms when nutrients run hot; grazers pull it back. Population dynamics settle over minutes of observation — the tank teaches you by happening.',
					],
					images: [
						{ src: '/images/projects/walstad-loom/planted.png', alt: 'Planted bed' },
					],
				},
				{
					title: 'Agents, not sprites',
					body: [
						'Each fish is an individual: heritable morphology, swim pattern, flank motifs, asymmetry. Optional Guardian companion voice runs locally (on-device LLM on desktop Steam builds).',
					],
					images: [
						{ src: '/images/projects/walstad-loom/school.png', alt: 'School in the column' },
					],
				},
			],
			goals: [
				'Make a tank that feels like watching a real planted aquarium — then prove the feeling is load-bearing sim, not wallpaper.',
				'Ship the craft: Steam depots, notarized macOS, free GitHub builds, a store page that reads honest.',
			],
			results: [
				'Public builds on GitHub Releases; Steam wishlist open for Early Access July 7, 2026.',
				'Same binaries across GitHub and Steam desktop depots.',
			],
		},
	},
	{
		slug: 'apple-accessibility',
		title: 'Apple — Accessibility and internal tooling',
		description:
			'IS&T internship: accessibility audits, coded interaction examples, login concept, and a bushel/app-bundle exploration.',
		year: 2012,
		featured: true,
		links: [
			{ label: 'App bundles', href: 'https://developer.apple.com/app-store/app-bundles/' },
		],
		image: { src: '/images/projects/cards/apple.png', alt: 'Apple' },
		stack: ['Accessibility', 'UX', 'Prototyping'],
		details: {
			role: 'Product Designer (intern)',
			entity: 'Apple — IS&T UX (internal software)',
			years: '2012; summer',
			headerImage: { src: '/images/projects/apple-accessibility/ipad_login_concept.png', alt: 'iPad login concept — flow map' },
			synopsis: [
				"My first professional experience in UX was with Apple's IS&T (Information Systems & Technology) UX group, focusing on internal software. I worked across multiple efforts, with a primary focus on Accessibility — a passion that continues to influence my design work today.",
				"Team make‑up: Group of designers situated in a heavy eng‑pm area of Apple; guidance from a manager but mostly me wrangling projects on my own with minimal guidance.",
				"Apple's design philosophy — meticulous attention to detail and a seamless user experience — stood out compared to later experiences at Microsoft, IBM, and Meta. This foundation shaped how I approached each project.",
				"Wireframes: Early work centered on quick, direct asks that needed concepts. One was an iPad login concept that needed an MVP UI. I followed my typical pattern: connect with stakeholders, locate available resources (at the time PDF-based design language assets), iterate on variations and states (including motion examples), and partner with engineering early to ensure feasibility.",
				"Accessibility: The internship's main thrust became a deep focus on Accessibility in internal tooling. I audited existing software, leveled up on accessibility standards, and partnered with leads to recenter discussion around Universal Access — fixes that improve both edge cases and the in‑between states. This included prototypes to explore improved interactions and research with customers using assistive tech.",
				"End results: A set of thorough documentation artifacts left with IS&T — immediate recommendations across tools, coded interaction examples for accessibility, guidance for designers moving forward, and a touch of blue‑sky for login potentials (e.g., making the login experience more enjoyable).",
				"Side contests: I also took part in two small concept projects (including app bundles) by interviewing across the company, finding missing interaction points, and producing visuals to sell the story. The 'bushel' concept explored app-grouping — an early intern exploration adjacent to what later became App Store App Bundles (not a shipped claim).",
			],
			skills: ['Accessibility', 'UX/UI', 'Documentation', 'Prototyping', 'User research'],
			goals: [
				'Ensure internal tools work for everyone, including users with assistive technologies',
				'Shift the conversation from compliance to Universal Access — improvements that benefit all users',
				'Learn accessibility standards deeply and apply them meaningfully',
				'Create concepts that make login experiences more enjoyable and accessible',
				'Leave behind actionable guidance so accessibility work continues after the internship'
			],
			results: [
				'Left IS&T with audit docs, coded accessibility examples, and designer guidance',
				'Login MVP concept wired with early eng feasibility checks',
				'Bushel concept explored app-grouping — early intern exploration adjacent to later App Store bundles (not a shipped claim)',
				'Accessibility stayed a lasting lens on later product work',
			],
			prototypes: [
				{ label: 'Login concept video', href: 'https://www.youtube.com/watch?v=Q4RT9MrK3F0&feature=youtu.be' }
			],
			sections: [
				{
					title: 'Wireframes',
					images: [
						{ src: '/images/projects/apple-accessibility/ipad_login_concept.png', alt: 'iPad login concept wireframes and flow map' }
					]
				},
				{
					title: 'Accessibility',
					images: [
            { src: '/images/projects/apple-accessibility/accessibility-documentation-artifacts.png', alt: 'Documentation artifacts including design guidance, coded interaction examples, and accessibility recommendations' }
          ]
				},
				{
					title: 'End results',
					images: [
						{ src: '/images/projects/apple-accessibility/end-results-documentation-collage.png', alt: 'End results documentation collage showing accessibility research photos, user testing sessions, and design recommendations' }
						
					]
				},
				{
					title: 'Side contests',
					images: [
						{ src: '/images/projects/apple-accessibility/bushel-apps-visualization.png', alt: 'Bushel of apps concept — app bundle visualization for marketing team challenge' },
						{ src: '/images/projects/apple-accessibility/bushel-apps-wireframes-flow.png', alt: 'A Bushel of apps concept wireframes and flow map' }
					],
					body: "I also took part in two small concept projects (including app bundles) by interviewing across the company, finding missing interaction points, and producing visuals to sell the story. The 'bushel' concept explored app-grouping — an early intern exploration adjacent to what later became App Store App Bundles (not a shipped claim).",
				}
			]
		},
	},
	{
		slug: 'ibm-spss-modeler',
		title: 'IBM — Carbon Design System integration and SPSS Modeler redesign',
		description:
			'Integrating Carbon Design System into SPSS Modeler to make data visualization clearer and more intuitive for data scientists.',
		year: 2016,
    featured: true,
		links: [
      { label: 'Prototype 1 — Tooltip Exploration', href: 'https://codepen.io/mhsenkow/full/dXRwqW' },
      { label: 'Prototype 2 — Display of Specifics', href: 'https://codepen.io/mhsenkow/full/MjWGdP' },
      { label: 'Prototype 3 — NN highlight', href: 'https://codepen.io/mhsenkow/full/apwZxz' },
		],
		image: { src: '/images/projects/ibm-spss-modeler/card.png', alt: 'SPSS Modeler redesign — Carbon chart interactions' },
    gallery: [],
		stack: ['IBM Design', 'Data Tools'],
		details: {
			role: 'Product Designer / Front‑end',
			entity: 'IBM Design',
      location: 'Austin, TX',
			years: '2016–2017',
			headerImage: { src: '/images/projects/ibm-spss-modeler/SPSS_Modeler.png', alt: 'SPSS Modeler overview showing Carbon Design System integration' },
      synopsis: [
        'This work focused on integrating the Carbon Design System (formerly Analytics Platform) into SPSS Modeler, redesigning charts and interactions to make data visualization clearer and more usable for data scientists.',
        'Team make-up: Collaborative work with engineers, PMs, and data scientists at IBM. Main design lead for this area of work. Management/leadership work w/ newer designers and cross-org communication.',
        'Understanding the space: Determined the full corpus of charts to overhaul, cataloged usage, and interviewed users to uncover edge cases. Competitive audit revealed must‑haves like mini‑maps, deeper drill‑ins, and motion helping comprehension.',
        'Wireframes and prototypes: Shared wireframes with stakeholders and built coded prototypes to explore responsive behavior. Visual experimentation surfaced that users primarily sought the key number; later designs emphasized a clearer data‑input region.',
        'Finalization: Iterations converged to match and connect with the Carbon Design System. Built coded prototypes of specific interactions; worked closely with dev on edge cases (too few/too many values), tooltips, help states, and clarity affordances.',
        'Advanced work: Progressed to more advanced chart types (e.g., neural networks) and deeper interaction patterns. Predictor chart learnings informed brusher concepts to expose full value ranges adjacent to tables.',
        'Outcome: Patterns from this redesign still appear in product checks years later, demonstrating the lasting impact of the Carbon Design System integration.'
      ],
      skills: ['UX design', 'Front-end', 'Design systems', 'Data visualization'],
      goals: [
        'Overhaul SPSS Modeler charts onto Carbon with a clear key-number hierarchy',
        'Handle edge cases (too few / too many values) without breaking the viz',
        'Ship coded interaction prototypes (tooltips, help, motion) engineers could reuse',
        'Extend the system to advanced types (neural nets, predictor/brusher patterns)',
      ],
      results: [
        'Carbon-aligned chart patterns still visible in product checks years later',
        'Live CodePen prototypes documented tooltip, motion, and neural-net highlight behaviors',
        'Predictor/brusher concepts carried into later data-viz work',
        'Edge-case handling (sparse and dense value sets) became part of the chart spec',
      ],
      prototypes: [
        { label: 'Prototype 1: Tooltip Exploration', href: 'https://codepen.io/mhsenkow/full/dXRwqW' },
        { label: 'Prototype 2: Display of Specifics in Motion', href: 'https://codepen.io/mhsenkow/full/MjWGdP' },
        { label: 'Prototype 3: Neural network diagram highlight example', href: 'https://codepen.io/mhsenkow/full/apwZxz' }
      ],
      sections: [
        {
          title: 'Understanding the space',
          images: [
            { src: '/images/projects/ibm-spss-modeler/prototype-tooltip-exploration.jpg', alt: 'Prototype exploration showing tooltip interactions and key number emphasis' },
            { src: '/images/projects/ibm-spss-modeler/wireframe-chart-variations.jpg', alt: 'Wireframe variations for chart redesign with clearer data-input regions' }
          ]
        },
        {
          title: 'Wireframes and prototypes',
          images: [
            { src: '/images/projects/ibm-spss-modeler/finalized-chart-carbon-design.jpg', alt: 'Finalized chart design with Carbon Design System integration' },
            { src: '/images/projects/ibm-spss-modeler/chart-interactions-tooltips.jpg', alt: 'Chart interactions showing tooltips, help states, and clarity affordances' },
            { src: '/images/projects/ibm-spss-modeler/data-visualization-edge-cases.jpg', alt: 'Finalized data visualization with edge case handling for too few/too many values' }
          ]
        },
        {
          title: 'Finalization',
          images: [
            { src: '/images/projects/ibm-spss-modeler/neural-network-highlight.jpg', alt: 'Neural network diagram with highlight interactions' },
            { src: '/images/projects/ibm-spss-modeler/predictor-chart-patterns.jpg', alt: 'Advanced chart types showing predictor chart patterns' },
            { src: '/images/projects/ibm-spss-modeler/brusher-value-ranges.jpg', alt: 'Brusher concept exploring value ranges adjacent to data tables' }
          ]
        }
      ]
		},
	},
  
	{
		slug: 'meta-daiquery-bento-notebooks',
		title: 'Meta — Daiquery/Bento notebooks',
		description:
			'SQL cell notebooks that became Meta’s unified SQL + Python notebook direction — 10k+ MAU, AI-assisted analysis patterns.',
		year: 2022,
    featured: true,
				image: { src: '/images/projects/cards/meta-notebooks.png', alt: 'Notebooks and data workflows' },
		gallery: [
		
		],
		stack: ['Meta', 'Notebooks', 'AI'],
		details: {
      role: 'Product Designer',
      entity: 'Meta',
			years: '2020–2023',
      team: 'Collaborated with engineers, PMs, and other designers.',
			headerImage: { src: '/images/projects/meta-daiquery-bento-notebooks/daiquery-notebook-sql-cells.png', alt: 'Daiquery notebook interface showing SQL cells with file cell structure, query execution, and results visualization' },
      synopsis: [
        'I spearheaded the creation of Daiquery notebooks, a SQL cell-based system designed to help data scientists and engineers better connect, store, and understand complex queries. This work evolved into unifying SQL and Python notebooks across Meta.',
        'Team dynamics: Worked closely with engineers, PMs, and other designers. Presented and connected across the org to get concepts moving, and partnered to maintain consistency between product spaces.',
        'Initial creation: Work began with discovering everyday problems across the org — connecting for feedback, interviewing users, and understanding similar products in the field. Cells became a major focus, with new types added and visual treatments evolving to accommodate them.',
        'Discovery of common feature sets: As the product expanded, we discovered commonalities with Bento notebooks (Python-based). Daiquery had file cells while Bento had file panels, which shifted discussions about where functionality should live and how cells should be structured.',
        'Expansion into additional concepts: Cross-functional discussions explored areas missing from both products: expandable plug-in/app store, education, sharing, and more. These explorations evolved into prototypes and narratives arguing for a universal shared notebook direction.',
        'Company changes and focus shifts: Org shifts reduced scope; broader education/documentation goals were deferred. Focus returned to the technical audience while continuing to support users. Users also used notebooks for notes, which informed upgrading text cells toward a more doc-like cell type.',
        'AI integration: AI entered almost every discussion — surfacing join recommendations or related data objects. Explored whether users preferred in-situ recommendations vs. a helpful bot, and whether they wanted to compare results or have code produce results and move on. This included exploring concepts for AI-driven autocode completion, intelligent chart creation, and augmented data analysis workflows.',
        'Outcome: The notebook merging worked and was used by 10k+ monthly active users at Meta. Of the concepts laid out in the original story, about 40% were realized alongside work churn. Personally, I gained exposure to AI workflow concepts that are applicable across a range of spaces — invaluable experience that informed Meta AI image creation flows and established patterns for unified notebook experiences across SQL and Python workflows.'
      ],
      skills: ['UX design', 'Interaction design', 'Visual design', 'Prototyping', 'User research', 'SQL', 'Python'],
      goals: [
        'Stand up a SQL cell notebook that stores and visualizes complex warehouse queries in one place',
        'Unify Daiquery (SQL) and Bento (Python) into a shared cell architecture teams can extend',
        'Prove a universal notebook direction with prototypes — plugins, sharing, education — before org scope narrowed',
        'Explore AI assists (joins, related objects, prompt→viz) without forcing a single bot metaphor',
      ],
      results: [
        'Notebook merge shipped and reached 10k+ monthly active users at Meta',
        'About 40% of the original universal-notebook concepts landed alongside org churn',
        'Cell-based architecture became the foundation for subsequent notebook work',
        'AI workflow patterns from this effort informed Meta AI image-creation and recommendation flows',
      ],
      sections: [
        {
          title: 'Initial creation',
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/daiquery-notebook-sql-cells.png', alt: 'Daiquery notebook interface with SQL cells, file cell structure, query execution, and results display' }
          ]
        },
        {
          title: 'Discovery of common feature sets',
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/daiquery-bento-comparison.png', alt: 'Side-by-side comparison view showing cell interactions, panel differences, and feature parity between Daiquery SQL notebooks and Bento Python notebooks' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/cell-vs-panel-exploration.png', alt: 'Notebook structure exploration comparing cell-based architecture versus panel-based approaches, showing trade-offs and interaction patterns' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/cell-type-variations.png', alt: 'Cell type variations exploring different functionality placement options, including SQL cells, file cells, markdown cells, and visualization cells' }
          ]
        },
        {
          title: 'Expansion into additional concepts',
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/notebook-app-store-concept.png', alt: 'Concept exploration for notebook app store with expandable plugin system, showing extensibility and third-party integration opportunities' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/education-onboarding-concepts.png', alt: 'Education and onboarding concepts for notebook users, including tutorials, guided workflows, and learning resources' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/sharing-collaboration-patterns.png', alt: 'Sharing and collaboration patterns for notebook workflows, showing permissions, commenting, and team collaboration features' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/universal-notebook-vision-slide.png', alt: 'Story deck slide presenting the universal shared notebook direction and vision, outlining the unified SQL and Python notebook strategy' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/unified-notebooks-architecture.png', alt: 'Story deck showing user flows, component architecture, and system design for unified notebooks across SQL and Python workflows' }
          ]
        },
        {
          title: 'Company changes and focus shifts',
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/unified-notebooks-vision-slide.png', alt: 'Presentation slide showing unified notebooks vision and Daiquery concept overview, reflecting organizational priorities and scope adjustments' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/notebook-interface-exploration.png', alt: 'Notebook interface exploration with multiple SQL cell types and query results, showing continued refinement of core functionality' }
          ]
        },
         {
           title: 'AI integration',
           images: [
             { src: '/images/projects/meta-daiquery-bento-notebooks/native-analytics-flow.png', alt: 'Flow diagram showing Native Analytics existing flow for Data Explorer with dashboard states, analysis views, period selection, and view toggling interactions' },
             { src: '/images/projects/meta-daiquery-bento-notebooks/forecasting-dashboard.png', alt: 'Data visualization dashboard with AI-powered forecasting showing time series analysis, confidence bands, and forecast controls for Meaningful QAT metrics' },
             { src: '/images/projects/meta-daiquery-bento-notebooks/progressive-disclosure.png', alt: 'Progressive information disclosure showing componentization of data objects with three states: simple notification, action-enabled card, and expanded detail view with metadata and actions' },
             { src: '/images/projects/meta-daiquery-bento-notebooks/ai-workflow-concepts.png', alt: 'AI workflow concepts for data tools showing query interface, prompt-to-visualization workflows, query generation, and relationships between conversations, notebooks, and dashboards' }
           ]
         }
      ]
		},
	},
	{
		slug: 'contracts-2024-2025',
		title: 'Confidential AI Legal & Data Suite — 2024–2025',
		description:
			'Staff-level contract work: AI legal notebooks and recommendation bot, data-suite foundations, and Windows Cloud recovery flows — plus supporting startup systems.',
		year: 2025,
				image: { src: '/images/projects/cards/contracts-suite.png', alt: 'AI workflow and data-suite exploration' },
		stack: ['AI workflows', 'Data products', 'Prototyping', 'Design systems'],
		details: {
			role: 'Product Designer',
			entity: 'Confidential AI Legal · Confidential Data Suite · Microsoft Cloud',
			location: 'Seattle / remote / hybrid',
			years: '2024–2025',
			team: 'Founders, PMs, and engineers across AI legal, data-suite, and cloud surfaces — overlapping with short supporting engagements.',
			synopsis: [
				'Thesis: The same pattern kept showing up — secure, localized data wired into chat or diagram sessions — across Legal, Finance, Images, HR, and general Data. Enterprise habits (systems, provenance, recovery) transfer cleanly into startup velocity.',
				'Confidential AI Legal: Notebook + recommendation-bot work for legal workflows — helping teams query and reason over sealed corpora without turning the product into a generic chat wrapper.',
				'Confidential Data Suite: Brand, UX flows, and early component framing for a data-suite foundation — enough structure to ship, not a museum of unused tokens.',
				'Microsoft Cloud: Error and selection interstitials for peripheral updates — clarity and recovery over blame screens.',
				'Supporting engagements: Short system and prototype work (including coded UI proofs) to validate patterns before full builds.',
			],
			skills: ['AI product UX', 'Data-suite IA', 'Prototyping', 'Component systems', 'Error recovery'],
			goals: [
				'Ship AI legal surfaces that respect sealed data and still feel fast to use',
				'Establish a coherent visual and interaction basis for a growing data suite',
				'Make Windows Cloud update failures recoverable in one glance',
				'Validate interaction patterns with coded prototypes before locking inventory',
			],
			results: [
				'Delivered AI legal notebook / recommendation concepts used as product direction',
				'Handed off data-suite brand, flows, and starter components as the suite basis',
				'Shipped interstitial patterns emphasizing clear error state + recovery actions',
				'Left reusable Figma + coded prototypes teams could extend without restarting the system',
			],
			sections: [
				{
					title: 'Confidential AI Legal',
					body: [
						'Notebook and recommendation-bot explorations for legal teams working over localized corpora — chat/diagram sessions as the interaction model, not a thin LLM skin.',
					],
					images: [
						{
							src: '/images/projects/contracts-2024-2025/exploration-board-pattern-survey-1.png',
							alt: 'Pattern research board mapping secure data → chat/diagram sessions across Legal and adjacent domains',
						},
						{
							src: '/images/projects/contracts-2024-2025/exploration-board-pattern-survey-3.png',
							alt: 'Side-by-side comparison of chat and diagram session patterns with evaluation notes',
						},
					],
				},
				{
					title: 'Confidential Data Suite',
					body: [
						'Foundation work toward a data suite: brand language, core UX flows, and early components sized for growth — not a complete library up front.',
					],
					images: [
						{
							src: '/images/projects/contracts-2024-2025/exploration-board-pattern-survey-4.png',
							alt: 'Component and pattern survey for the data-suite visual system',
						},
						{
							src: '/images/projects/contracts-2024-2025/exploration-board-pattern-survey-5.png',
							alt: 'Narrowed design direction with selected UI patterns after stakeholder feedback',
						},
					],
				},
				{
					title: 'Microsoft Cloud — recovery interstitials',
					body: [
						'Error and selection update states for peripheral flows — prioritize what failed, what to do next, and how to resume.',
					],
					images: [
						{
							src: '/images/projects/contracts-2024-2025/windows-app-interstitial-error-state.png',
							alt: 'Windows Cloud error interstitial with clear message and recovery actions',
						},
						{
							src: '/images/projects/contracts-2024-2025/windows-app-interstitial-selection-update.png',
							alt: 'Selection-update interstitial with confirmation and state-change feedback',
						},
					],
				},
				{
					title: 'Exploration cadence',
					body: [
						'Stand up Figma, map the space, converge on frameworks — then prove seams with coded prototypes before inventory balloons.',
					],
					images: [
						{
							src: '/images/projects/contracts-2024-2025/exploration-board-pattern-survey-2.png',
							alt: 'Blue-sky exploration board with wireframes and concept variations under evaluation',
						},
					],
				},
			],
		},
	},
  {
    slug: 're-envisioning-my-primary-product',
    title: 'Microsoft — MyAnalytics / WPA design system',
    description: 'Shared design system across MyAnalytics and Workplace Analytics — components, layout, and leadership through team transitions.',
    year: 2018,
    featured: true,
        image: { src: '/images/projects/cards/redesign.png', alt: 'Re-envisioning core product' },
    stack: ['Microsoft', 'Design System', 'Product'],
    details: {
      role: 'Primary Designer for Interactions',
      entity: 'Microsoft',
      location: 'Redmond, WA (MyAnalytics – Workplace Analytics team)',
      years: '2018',
      team: 'Grew from IC beside a design lead to sole US FTE, leading contractors and remote designers in India while onboarding new leadership.',
      headerImage: { src: '/images/projects/re-envisioning-my-primary-product/design-system-update.png', alt: 'Design system update overview' },
      synopsis: [
        'Led the shared design system for MyAnalytics and Workplace Analytics — stakeholder interviews, visual foundations, and component inventory that both products could ship against.',
        'As the team changed, I held the system together: contractors, remote FTEs, and new managers inherited coherent files and patterns instead of a pile of one-offs.',
      ],
      skills: ['Stakeholder Interviews', 'Internal Research', 'Visual Design', 'Advocacy and Collaboration with PMs and Engineers', 'Team Leadership'],
      goals: [
        'One visual and interaction language across MyAnalytics and Workplace Analytics',
        'Cut design debt that was slowing engineering handoff',
        'Document components (buttons, dropdowns, toggles, layout) teams could reuse',
        'Keep the system usable as the design org grew and changed',
      ],
      results: [
        'System adopted across both sister products',
        'Faster design-to-code handoff via shared component specs',
        'Onboarding path for new designers and contractors against a single source of truth',
      ],
      sections: [
        {
          title: 'Understanding what existed',
          body: 'Documented the existing design patterns and identified inconsistencies across the product suite.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/prior-system.png', alt: 'Prior system documentation showing existing design patterns and inconsistencies across MyAnalytics and Workplace Analytics' },
            { src: '/images/projects/re-envisioning-my-primary-product/what-existed-here.png', alt: 'Component inventory documenting existing UI elements, patterns, and design debt that needed addressing' }
          ]
        },
        {
          title: 'Design system foundation',
          body: 'Established core design principles, color systems, and foundational components to ensure consistency.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/wpa-color-copy.png', alt: 'Workplace Analytics color system showing refined palette and usage guidelines for consistent brand application' },
            { src: '/images/projects/re-envisioning-my-primary-product/refined-palette.png', alt: 'Refined color palette with accessibility considerations and semantic color definitions' },
            { src: '/images/projects/re-envisioning-my-primary-product/text-usage.png', alt: 'Text usage guidelines establishing typography scale, hierarchy, and readability standards' }
          ]
        },
        {
          title: 'Component library development',
          body: 'Designed and documented reusable components including buttons, dropdowns, and toggles.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/buttons.png', alt: 'Button component specifications showing primary, secondary, and tertiary variants with states and usage guidelines' },
            { src: '/images/projects/re-envisioning-my-primary-product/buttons-copy.png', alt: 'Button component variations including sizes, states, and interaction patterns for consistent implementation' },
            { src: '/images/projects/re-envisioning-my-primary-product/drop-downs.png', alt: 'Dropdown component specifications with interaction states, accessibility considerations, and usage patterns' },
            { src: '/images/projects/re-envisioning-my-primary-product/toggles.png', alt: 'Toggle component specifications showing on/off states, accessibility features, and implementation details' }
          ]
        },
        {
          title: 'Layout system iterations',
          body: 'Developed flexible layout patterns and grid systems for consistent page structures across products.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-1.png', alt: 'Layout iteration exploring grid system options and spacing patterns for consistent page structures' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-2.png', alt: 'Layout iteration refining column structures and responsive breakpoints' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-3.png', alt: 'Layout iteration testing information density and content hierarchy approaches' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-4.png', alt: 'Layout iteration exploring flexible container patterns and content alignment' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-5.png', alt: 'Layout iteration refining spacing systems and visual rhythm' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-6.png', alt: 'Layout iteration testing card-based layouts and component arrangements' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-7.png', alt: 'Layout iteration exploring dashboard layouts and data visualization containers' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-iteration-grid-system-8.png', alt: 'Layout iteration finalizing responsive grid system and layout patterns' }
          ]
        },
        {
          title: 'Implementation and validation',
          body: 'Tested the design system in production contexts, gathered feedback, and refined patterns based on real-world usage.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/implementation-example-1.png', alt: 'Implementation example showing design system components applied in MyAnalytics dashboard interface' },
            { src: '/images/projects/re-envisioning-my-primary-product/implementation-example-2.png', alt: 'Implementation example displaying design system patterns in Workplace Analytics analytics views' },
            { src: '/images/projects/re-envisioning-my-primary-product/implementation-example-3.png', alt: 'Implementation example showing consistent component usage across different product areas' },
            { src: '/images/projects/re-envisioning-my-primary-product/experiment.png', alt: 'Experimental features exploring advanced design system capabilities and future enhancements' },
            { src: '/images/projects/re-envisioning-my-primary-product/final-implementation.png', alt: 'Final implementation showing completed design system in production with consistent visual language across products' }
          ]
        }
      ]
    }
  },
  {
    slug: 'windows-cloud-updating-peripherals',
    title: 'Windows Cloud — updating peripherals',
    description:
      'Concepts and flows for updating peripherals in Windows Cloud contexts; error states and recovery.',
    year: 2024,
        image: { src: '/images/projects/cards/windows-cloud.png', alt: 'Windows Cloud peripherals' },
    stack: ['Windows Cloud', 'Concepts'],
    details: {
      role: 'Product Designer',
      entity: 'Microsoft (contracts)',
      years: '2024–2025',
      synopsis: [
        'Concept work for updating peripherals in cloud-managed Windows environments — status, progress, and recovery when fleets and devices disagree.',
        'Emphasis on readable error states and next actions so admins and end users can tell what failed and how to continue.',
      ],
      skills: ['Systems UX', 'Error-state design', 'Cloud admin flows'],
      goals: [
        'Make peripheral update status unambiguous in cloud-managed contexts',
        'Design recovery paths that work when devices are offline or partially updated',
      ],
      results: [
        'Produced flow and UI concepts used to align stakeholders on status and recovery patterns',
      ],
    }
  },
  {
    slug: 'teams-admin-center',
    title: 'Teams admin center',
    description: 'Teams admin tooling concepts — a late-tenure sprint mapping operator workflows under transition.',
    year: 2019,
        image: { src: '/images/projects/cards/teams.png', alt: 'Teams admin center' },
    stack: ['Microsoft', 'Admin'],
    details: {
      role: 'Product Designer / Design lead',
      entity: 'Microsoft',
      location: 'Seattle, WA',
      years: '2019',
      synopsis: [
        'Wireframes and concepts for admin tooling behind Teams communications — the operator surface under the public product.',
        'A short, late-tenure sprint: rapid iteration while the org shifted, useful as a case study in shipping under transition.',
      ],
      skills: ['Wireframing', 'Prototyping', 'Admin UX'],
      goals: [
        'Map admin workflows for communications tooling clearly enough to debate with eng and PM',
        'Keep concepts light so they survive org transition without over-investment',
      ],
      results: [
        'Delivered wireframe packages that framed the admin-center problem space for the next owners',
      ],
    }
  },
  {
    slug: 'researching-silence',
    title: 'Microsoft — Silence Mode → Focus Time',
    description: 'Office silence-mode research in London and Paris that evolved into today’s Focus Time concepts.',
    year: 2018,
    featured: true,
        image: { src: '/images/projects/cards/silence-mode.png', alt: 'Silence mode research' },
    gallery: [
      { src: '/images/projects/researching-silence/early-silence-mode-concepts.png', alt: 'Early silence mode concepts showing initial UI explorations for blocking notifications and managing interruptions' },
      { src: '/images/projects/researching-silence/silence-mode-wireframes.png', alt: 'Silence mode wireframes exploring interface patterns for notification controls and time-based settings' },
      { src: '/images/projects/researching-silence/focus-time-interface.png', alt: 'Focus time interface proposal evolved from silence mode research with scheduling and notification management' },
      { src: '/images/projects/researching-silence/client-feedback-session.jpg', alt: 'Client feedback session documentation from in-person interviews in London or Paris' },
      { src: '/images/projects/researching-silence/iteration-during-trip.png', alt: 'Design iteration work during client visits showing updated concepts based on real-time feedback' },
      { src: '/images/projects/researching-silence/design-refinements.png', alt: 'Design refinements displaying improved silence mode interface with clearer controls and better visual hierarchy' },
      { src: '/images/projects/researching-silence/concept-explorations.png', alt: 'Concept explorations showing multiple variations of silence mode features and interaction patterns' },
      { src: '/images/projects/researching-silence/final-proposal-design.png', alt: 'Final proposal design presenting comprehensive silence mode concept with user flows and implementation recommendations' },
      { src: '/images/projects/researching-silence/focus.png', alt: 'Focus time final concept displaying the refined interface that evolved into current Office focus time feature' }
    ],
    stack: ['Microsoft', 'Research', 'UX'],
    details: {
      role: 'User Experience Designer/Researcher',
      entity: 'Microsoft — Office Suite',
      location: 'London, Paris, and Redmond, WA',
      years: '2018',
      team: 'Collaborated with a principal researcher, a senior designer, a fellow designer, multiple PMs, and engineers.',
      headerImage: { src: '/images/projects/researching-silence/focus-widget-interface.png', alt: 'Focus time widget interface showing the final design evolved from silence mode research, with scheduling controls and notification management for Office suite' },
      synopsis: [
        'In a collaborative study focused on developing a "Silence Mode" for the Office suite, I worked alongside a principal researcher, a senior designer, and a fellow designer. We visited 8 clients in London and Paris, iterating on designs based on real-time feedback and insights gathered during the trip. This hands-on approach allowed us to refine our concepts continuously.',
        'The project concluded with a comprehensive proposal, which has since evolved into the current focus time concepts within the Office suite. My role involved conducting in-person interviews, rapid design conception, and prototyping. Upon returning to the States, I also played a crucial role in aligning stakeholders and ensuring the project\'s objectives were met.'
      ],
      skills: ['In-Person Interviews', 'Quick Design Conception', 'Prototyping', 'Stakeholder Management', 'User Research'],
      goals: [
        'Learn how Office users want to protect focus without a blunt notification kill-switch',
        'Prototype Silence Mode concepts against live client feedback in London and Paris',
        'Return with a proposal stakeholders could evolve into Focus Time',
      ],
      results: [
        'In-person interviews with 8 clients across London and Paris',
        'Same-trip design iterations based on live reactions',
        'Proposal lineage that fed today’s Focus Time / Focus plan concepts in Office',
      ],
      sections: [
        {
          title: 'Client research and rapid iteration',
          body: 'Visited 8 clients across London and Paris, conducting in-person interviews and iterating on designs based on real-time feedback during the trip.',
          images: [
            { src: '/images/projects/researching-silence/silence-mode-wireframes.png', alt: 'Initial wireframes exploring silence mode interface patterns including notification controls, time-based settings, and user preference options' },
            { src: '/images/projects/researching-silence/client-feedback-session.jpg', alt: 'Client feedback session documentation showing in-person interview setup with Office users in London or Paris, capturing real-time reactions and insights' }
          ]
        },
        {
          title: 'Design iteration and refinement',
          body: 'Rapidly iterated on concepts during the research trip, refining the silence mode features based on user insights and needs.',
          images: [
            { src: '/images/projects/researching-silence/iteration-during-trip.png', alt: 'Design iteration work during client visits showing updated wireframes and concepts refined based on feedback from London and Paris interviews' },
            { src: '/images/projects/researching-silence/design-refinements.png', alt: 'Design refinements displaying improved silence mode interface with clearer controls, better visual hierarchy, and more intuitive interaction patterns' },
            { src: '/images/projects/researching-silence/concept-explorations.png', alt: 'Concept explorations showing multiple variations of silence mode features including different notification blocking approaches, scheduling interfaces, and user control options' }
          ]
        },
        {
          title: 'Final proposal and stakeholder alignment',
          body: 'Developed comprehensive proposal that evolved into current focus time concepts in Office. Led stakeholder alignment upon returning to the US.',
          images: [
            { src: '/images/projects/researching-silence/focus-time-interface.png', alt: 'Focus time interface proposal showing the evolved design from silence mode research, with scheduling controls, notification management, and user preference settings' },
            { src: '/images/projects/researching-silence/final-proposal-design.png', alt: 'Final proposal design presenting comprehensive silence mode concept with user flows, interface mockups, and implementation recommendations for Office suite integration' },
            { src: '/images/projects/researching-silence/focus.png', alt: 'Focus time final concept displaying the refined interface that evolved from silence mode research into the current focus time feature in Office applications' }
          ]
        }
      ]
    }
  },
  {
    slug: 'topic-keyword-analysis',
    title: 'Microsoft — Topic keyword analysis redesigns',
    description: 'Viva Insights/Workplace Analytics — topic/keyword analysis redesign; design system expansion, mentoring.',
    year: 2019,
        image: { src: '/images/projects/cards/topic-selection.png', alt: 'Topic selection' },
    stack: ['Microsoft', 'Analytics'],
    details: {
      role: 'Product Designer — expansion of design system, mentoring',
      entity: 'Microsoft',
      location: 'Redmond, WA',
			years: '2017–2020',
      team: 'With this area, one main PM and one main Engineer were involved. My role evolved from consulting with a contracting designer, to primary designer and expansion of my design system into this space.',
			headerImage: { src: '/images/projects/topic-keyword-analysis/topics_list_page.png', alt: 'Topics list page displaying available topics for keyword analysis with selection interface and navigation, showing the redesigned single-screen tool approach' },
      synopsis: [
        'Took over a struggling topic/keyword analysis initiative on Workplace Analytics — first as design lead for a contractor, then owning the redesign as scope shifted. Ran in parallel with expanding the design system I’d been building.',
        'Initial set of designs: Working as the design‑lead/consultant for first implementation — ensured the contractor’s work matched component system constraints, fit PM/Engineering needs, and addressed interaction issues found in research.',
        'Push for integration: Took preliminary designs and updated them for another section (Meeting exclusion keyword selection) in conjunction with PM/Engineering, pushing interaction implementation through.',
        'Learnings: Too many steps left users unsure of progress; users wanted to see all steps in one place without scrolling. Goal shifted toward a tool feel rather than a linear wizard.',
        'Multiple layout iterations and user testing to move to a more dense design: Provided options emphasizing a denser layout, table focus, and clearer placement of keyword selection; iterated based on feedback and sizing.',
        'Final flow and specifics for responsive layout: Consolidated steps into a single screen, reduced superfluous data‑viz, and documented responsive behavior across sections. Template selection aligned with broader application patterns for component reuse.',
        'Outcome: A mild visual redesign integrated into the larger design framework; patterns moved the app toward a cohesive tool experience and were adopted by the team after transition.'
      ],
      skills: ['UX design', 'Visual design', 'Mentoring', 'Analytics', 'Tool creation'],
      goals: [
        'Collapse a 13-step keyword wizard into a single-screen tool users can finish',
        'Carry patterns into Meeting Exclusions with PM/eng',
        'Use the redesign to expand the shared design system under real product pressure',
      ],
      results: [
        '13-step wizard → single-screen tool with responsive layout',
        'Patterns adopted in Meeting Exclusions',
        'Reusable components fed the broader Workplace Analytics design system',
      ],
      sections: [
        {
          title: 'Initial set of designs',
          body: 'Working as the design-lead/consultant for first implementation — ensured the contractor\'s work matched component system constraints, fit PM/Engineering needs, and addressed interaction issues found in research.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/first_wireframe.png', alt: 'Earliest wireframe of topic selection process showing initial concept for keyword analysis workflow' },
            { src: '/images/projects/topic-keyword-analysis/home-2x.png', alt: 'Initial design showing template home screen for keyword analysis with template selection interface' },
            { src: '/images/projects/topic-keyword-analysis/more-templates-2x.png', alt: 'Initial design displaying additional template options view for keyword analysis workflows' },
            { src: '/images/projects/topic-keyword-analysis/new-topics-2x.png', alt: 'Initial design showing new topics interface for creating custom topic configurations' },
            { src: '/images/projects/topic-keyword-analysis/start-1-2x.png', alt: 'Initial design showing start step interface with functionality visible' },
            { src: '/images/projects/topic-keyword-analysis/step-2-make-exception-2x.png', alt: 'Initial design showing make exception interface with keyword exclusion controls' },
            { src: '/images/projects/topic-keyword-analysis/keyword-details-table-2x.png', alt: 'Initial design displaying keyword details table with keyword information in tabular format' },
            { src: '/images/projects/topic-keyword-analysis/step-2-add-to-keyword-list-2x.png', alt: 'Initial design showing add to keyword list interface for adding keywords' },
            { src: '/images/projects/topic-keyword-analysis/step-4-enter-keyword-2x.png', alt: 'Initial design displaying enter keyword interface with keyword input controls' },
            { src: '/images/projects/topic-keyword-analysis/strat-2-keyword-hover-2x.png', alt: 'Initial design showing keyword hover interaction with tooltip and detail information' },
            { src: '/images/projects/topic-keyword-analysis/two-selected-2x.png', alt: 'Initial design displaying two selected keywords with multi-selection state and visual indicators' }
          ]
        },
        {
          title: 'Push for integration with Meeting Exclusions',
          body: 'Took preliminary designs and updated them for another section (Meeting exclusion keyword selection) in conjunction with PM/Engineering, pushing interaction implementation through.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/meeting-exclusion-overflow-2x.png', alt: 'Meeting exclusion overflow menu showing keyword selection interface with dropdown options and overflow handling' },
            { src: '/images/projects/topic-keyword-analysis/draft-saved-2x.png', alt: 'Save as draft interface showing saved state confirmation with visual feedback for draft keyword configurations' },
            { src: '/images/projects/topic-keyword-analysis/blank-filename-error-2x.png', alt: 'Error state displaying validation message when filename is left blank, showing inline error handling' },
            { src: '/images/projects/topic-keyword-analysis/exclusion-save-failure-2x.png', alt: 'Save failure warning showing error notification when exclusion configuration cannot be saved, with recovery options' }
          ]
        },
        {
          title: 'Learnings',
          body: 'Too many steps left users unsure of progress; users wanted to see all steps in one place without scrolling. Goal shifted toward a tool feel rather than a linear wizard.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/old-step-1.png', alt: 'Original step 1 showing topic selection interface in the multi-step wizard approach' },
            { src: '/images/projects/topic-keyword-analysis/old-step-2.png', alt: 'Original step 2 displaying configuration options in the linear wizard flow' },
            { src: '/images/projects/topic-keyword-analysis/old-step-3.png', alt: 'Original step 3 showing keyword addition interface, demonstrating the fragmented multi-step process' },
            { src: '/images/projects/topic-keyword-analysis/old-step-4.png', alt: 'Original step 4 with review interface, showing how users had to navigate through many separate screens' },
            { src: '/images/projects/topic-keyword-analysis/old-step-5.png', alt: 'Original step 5 displaying exclusions configuration, part of the lengthy wizard that confused users' },
            { src: '/images/projects/topic-keyword-analysis/old-step-6.png', alt: 'Original step 6 showing finalization screen, illustrating the excessive number of steps required' },
            { src: '/images/projects/topic-keyword-analysis/old-step-7.png', alt: 'Original step 7 with save interface, demonstrating the linear wizard approach that users found confusing' },
            { src: '/images/projects/topic-keyword-analysis/old-step-8.png', alt: 'Original step 8 showing additional options, highlighting the complexity of the original multi-step design' },
            { src: '/images/projects/topic-keyword-analysis/old-step-9.png', alt: 'Original step 9 displaying preview interface, part of the wizard that left users unsure of their progress' },
            { src: '/images/projects/topic-keyword-analysis/old-step-10.png', alt: 'Original step 10 with advanced settings, showing how the wizard approach fragmented the workflow' },
            { src: '/images/projects/topic-keyword-analysis/old-step-11.png', alt: 'Original step 11 displaying confirmation screen, demonstrating the excessive number of steps in the original design' },
            { src: '/images/projects/topic-keyword-analysis/old-step-12.png', alt: 'Original step 12 showing completion screen, illustrating the lengthy process that needed to be consolidated' },
            { src: '/images/projects/topic-keyword-analysis/old-step-13.png', alt: 'Original step 13 displaying summary view, the final step in a 13-step wizard that users found overwhelming' },
            { src: '/images/projects/topic-keyword-analysis/old-step-13-responsive.png', alt: 'Original step 13 responsive layout showing how the multi-step wizard appeared on different screen sizes' }
          ]
        },
        {
          title: 'Multiple layout iterations',
          body: 'Provided options emphasizing a denser layout, table focus, and clearer placement of keyword selection; iterated based on feedback and sizing.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5.png', alt: 'Iteration 1.5 showing initial dense layout approach consolidating multiple steps into a single screen' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-1.png', alt: 'Iteration 1.5-1 emphasizing table-focused layout with keyword data displayed in tabular format' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-2.png', alt: 'Iteration 1.5-2 exploring clearer placement of keyword selection controls within the consolidated interface' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-3.png', alt: 'Iteration 1.5-3 displaying refined layout with improved information density and visual hierarchy' },
            { src: '/images/projects/topic-keyword-analysis/option-1.png', alt: 'Layout option 1 exploring single-screen tool approach with all functionality visible at once' },
            { src: '/images/projects/topic-keyword-analysis/option-2.png', alt: 'Layout option 2 testing alternative arrangement of keyword selection and configuration controls' },
            { src: '/images/projects/topic-keyword-analysis/option-2.1.png', alt: 'Layout option 2.1 variant showing refined version of option 2 with adjusted spacing and component placement' },
            { src: '/images/projects/topic-keyword-analysis/option-3.png', alt: 'Layout option 3 exploring different visual treatment and information architecture for keyword management' },
            { src: '/images/projects/topic-keyword-analysis/option-4.png', alt: 'Layout option 4 testing table-centric design with enhanced keyword visibility and selection' },
            { src: '/images/projects/topic-keyword-analysis/option-4.1.png', alt: 'Layout option 4.1 variant refining the table-focused approach based on user feedback' },
            { src: '/images/projects/topic-keyword-analysis/option-5.png', alt: 'Layout option 5 exploring alternative component arrangements and interaction patterns' },
            { src: '/images/projects/topic-keyword-analysis/option-5.1.png', alt: 'Layout option 5.1 variant showing final refinements to the consolidated single-screen tool interface' }
          ]
        },
        {
          title: 'Final flow and specifics for responsive layout',
          body: 'Consolidated steps into a single screen, reduced superfluous data-viz, and documented responsive behavior across sections. Template selection aligned with broader application patterns for component reuse.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/topics_list_page.png', alt: 'Final topics list page displaying available topics for keyword analysis with selection interface and navigation, showing the consolidated responsive layout' },
            { src: '/images/projects/topic-keyword-analysis/topics-list-page-1.png', alt: 'Final topics list page variant 1 showing the refined layout approach for topic selection and organization in the consolidated design' },
            { src: '/images/projects/topic-keyword-analysis/topics-list-page-2.png', alt: 'Final topics list page variant 2 displaying the refined visual treatment and information hierarchy for topic management in the final responsive layout' }
          ]
        }
      ]
    },
  },
  {
    slug: 'navigation-update-component-system',
    title: 'Microsoft — Navigation & component system',
    description: 'Nav consistency push that hardened the shared component system — comparison analysis, wireframes, coded proofs.',
    year: 2019,
        image: { src: '/images/projects/cards/redesign.png', alt: 'Navigation/component redesign' },
    gallery: [],
    stack: ['Microsoft', 'Design System'],
    details: {
      role: 'Product Designer, prototypes for specifics',
      entity: 'Microsoft',
      location: 'Seattle, WA',
      years: '2019',
      team: 'Sole designer for this project; collaborated with one primary PM and multiple developers.',
      headerImage: { src: '/images/projects/navigation-update-component-system/final-form.png', alt: 'Final navigation form' },
      synopsis: [
        'Led comparison analysis, UX wireframes, and coded prototypes to fix navigation inconsistency — the work that tightened the shared component system.',
        'Sole designer with one PM and multiple developers; produced concrete coded examples so engineering could validate edge cases.',
      ],
      skills: [
        'UX Design',
        'Visual Design',
        'Wireframing',
        'Coded & Figma Prototyping',
        'Component Systems'
      ],
      goals: [
        'Resolve navigation inconsistency that was creating system debt',
        'Codify nav decisions into components engineering could trust',
        'Prove edge cases with coded prototypes, not slides alone',
      ],
      results: [
        'Navigation update informed a tighter, more cohesive component system',
        'Faster implementation via clearer starting points and guidelines',
      ],
      prototypes: [
        { label: 'Tooltip Exploration', href: 'https://codepen.io/mhsenkow/full/KYrNZP' }
      ],
      sections: [
        {
          title: 'Comparison analysis',
          body: [
            'Audited existing navigation patterns and adjacent products to identify inconsistencies and opportunities.',
            'Framed options that balanced clarity, density, and reuse across the application.'
          ],
          images: [
            { src: '/images/projects/navigation-update-component-system/old.png', alt: 'Old navigation pattern' },
            { src: '/images/projects/navigation-update-component-system/comparison-image.png', alt: 'Navigation comparison analysis' },
            { src: '/images/projects/navigation-update-component-system/navigation-comparison-options.png', alt: 'Comparison of navigation options' }
          ]
        },
        {
          title: 'Navigation iterations',
          body: [
            'Explored multiple navigation approaches balancing information density, hierarchy, and user familiarity.',
            'Developed variations to test different interaction patterns and visual treatments.'
          ],
          images: [
            { src: '/images/projects/navigation-update-component-system/nav1.png', alt: 'Navigation option 1' },
            { src: '/images/projects/navigation-update-component-system/nav2.png', alt: 'Navigation option 2' },
            { src: '/images/projects/navigation-update-component-system/nav3.png', alt: 'Navigation option 3' },
            { src: '/images/projects/navigation-update-component-system/nav4.png', alt: 'Navigation option 4' },
            { src: '/images/projects/navigation-update-component-system/nav5.png', alt: 'Navigation option 5' },
            { src: '/images/projects/navigation-update-component-system/nav6.png', alt: 'Navigation option 6' },
            { src: '/images/projects/navigation-update-component-system/nav7.png', alt: 'Navigation option 7' }
          ]
        },
        {
          title: 'Wireframes and prototypes',
          body: [
            'Produced wireframes that explored layout density, information hierarchy, and interaction seams.',
            'Built small coded prototypes to validate behavior and clarify implementation details with engineers.'
          ],
          images: [
            { src: '/images/projects/navigation-update-component-system/wireframe-explorations.png', alt: 'Wireframe explorations' },
            { src: '/images/projects/navigation-update-component-system/prototype-iterations.png', alt: 'Prototype iterations' },
            { src: '/images/projects/navigation-update-component-system/interactive-prototype-1.png', alt: 'Interactive prototype 1' },
            { src: '/images/projects/navigation-update-component-system/interactive-prototype-2.png', alt: 'Interactive prototype 2' }
          ]
        },
        {
          title: 'System outcomes',
          body: [
            'Codified navigation decisions into clearer component guidelines and starting points.',
            'Improved cohesion and speed to implement through a tighter component system.'
          ],
          images: [
            { src: '/images/projects/navigation-update-component-system/text-hierarchy-change.png', alt: 'Text hierarchy improvements' },
            { src: '/images/projects/navigation-update-component-system/final-form.png', alt: 'Final navigation form' }
          ]
        }
      ]
    }
  },
  {
    slug: 'workplace-analytics-programs',
    title: 'Microsoft — Workplace Analytics programs & nudges',
    description: 'Programs as the bridge between Workplace Analytics and MyAnalytics — dashboards, nudges, and multi-year design leadership.',
    year: 2018,
        image: { src: '/images/projects/workplace-analytics-programs/card.png', alt: 'Workplace Analytics Programs' },
    gallery: [],
    stack: ['Microsoft', 'Workplace Analytics', 'MyAnalytics', 'Behavioral Design', 'UX Design'],
    details: {
      role: 'Product Designer / Design Lead',
      entity: 'Microsoft — Workplace Analytics team',
      location: 'Redmond, WA',
      years: '2017–2019',
      team: 'Grew into de-facto design lead across a transitional period — contractors, remote FTEs, and new managers shipping against one programs system.',
      headerImage: { src: '/images/projects/workplace-analytics-programs/programs-dashboard.png', alt: 'Programs dashboard interface' },
      synopsis: [
        'Primary focus for ~2.5 years: programs as the bridge tying Workplace Analytics (org insights) to MyAnalytics (personal productivity) — wireframes through visual, content, and coded motion.',
        'Programs dashboard: Entry point to discover, enroll, and manage programs that change work habits — not a second analytics silo.',
        'Nudges & focus: Gentle behavioral prompts and Workplace Focus surfaces that stay useful without becoming noise.',
        'Admin & refinement: Configuration for different org contexts, plus iterative polish from wireframe to production based on feedback.',
      ],
      skills: ['Wireframing', 'Research', 'Visual design', 'Data visualization', 'Behavioral design', 'Team leadership', 'Design systems'],
      goals: [
        'Make programs the coherent bridge between org analytics and personal insight',
        'Ship nudges that change habits without nagging',
        'Keep privacy and admin controls first-class in the experience',
        'Hold design quality steady while the team scaled and changed',
      ],
      results: [
        'Programs system became the connective tissue between Workplace Analytics and MyAnalytics',
        'Dashboard, nudges, and focus patterns shipped with coded motion prototypes',
        'Design leadership through contractor/remote onboarding kept the system coherent',
      ],
      prototypes: [
        { label: 'Top Four Redesign and Animations', href: 'https://codepen.io/mhsenkow/full/eRYzoW/' },
        { label: 'Email Usage Redesign and Animations', href: 'https://codepen.io/mhsenkow/full/XgVYyj/' },
        { label: 'Sharing Button Concept', href: 'https://codepen.io/mhsenkow/pen/PmbJRz' },
        { label: 'Motion Concept', href: 'https://codepen.io/mhsenkow/full/QQGBOX/' }
      ],
      sections: [
        {
          title: 'Early Concepts & Wireframes',
          body: 'Initial design exploration and wireframing to establish the foundation for the programs system. Early concepts focused on understanding how to bridge Workplace Analytics and MyAnalytics through a unified programs experience.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/project-evolution-early.png', alt: 'Early wireframes and concept exploration for programs dashboard and integration points' },
            { src: '/images/projects/workplace-analytics-programs/project-evolution-mid.png', alt: 'Mid-fidelity wireframes showing refined program structure and user flows' }
          ]
        },
        {
          title: 'Programs Dashboard Overview',
          body: 'The central hub that connected Workplace Analytics and MyAnalytics, providing users with a unified view of their workplace insights and productivity programs.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/programs-dashboard.png', alt: 'Programs dashboard main interface showing overview of available programs and analytics' },
            { src: '/images/projects/workplace-analytics-programs/programs-dashboard-detail.jpg', alt: 'Programs dashboard detailed view with program cards and enrollment options' },
            { src: '/images/projects/workplace-analytics-programs/program-management-interface.jpg', alt: 'Program management interface for creating and configuring workplace programs' }
          ]
        },
        {
          title: 'Bridge Integration & Data Flow',
          body: 'Created the bridge between Workplace Analytics and MyAnalytics through a programs system that enabled seamless data flow and user experience continuity across both platforms.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/bridge-integration.png', alt: 'Bridge integration diagram showing connection between Workplace Analytics and MyAnalytics' },
            { src: '/images/projects/workplace-analytics-programs/bridge-integration-interface-1.jpg', alt: 'Bridge integration interface screen 1 connecting Workplace Analytics and MyAnalytics' },
            { src: '/images/projects/workplace-analytics-programs/bridge-integration-interface-2.jpg', alt: 'Bridge integration interface screen 2 showing data flow and synchronization' },
            { src: '/images/projects/workplace-analytics-programs/bridge-integration-interface-3.jpg', alt: 'Bridge integration interface screen 3 with program configuration options' },
            { src: '/images/projects/workplace-analytics-programs/bridge-integration-interface-4.png', alt: 'Bridge integration interface screen 4 displaying unified user experience' },
            { src: '/images/projects/workplace-analytics-programs/bridge-integration-interface-5.png', alt: 'Bridge integration interface screen 5 with cross-platform navigation' }
          ]
        },
        {
          title: 'Workplace Analytics Integration',
          body: 'Comprehensive analytics dashboards that provided meaningful insights to users while maintaining privacy and security standards. These interfaces show the evolution of data visualization and user experience design.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/analytics-overview.png', alt: 'Workplace Analytics overview dashboard with navigation and key metrics' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-email-usage.jpg', alt: 'Email usage analytics dashboard with charts showing email patterns, volume, and response times' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-meeting-patterns.jpg', alt: 'Meeting patterns analytics dashboard displaying meeting frequency, duration, and time allocation' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-collaboration.jpg', alt: 'Collaboration analytics dashboard with network visualization and collaboration metrics' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-time-allocation.jpg', alt: 'Time allocation analytics dashboard showing breakdown of time spent across different work activities' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-network-insights.jpg', alt: 'Network insights analytics dashboard with relationship mapping and connection visualization' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-productivity-metrics.jpg', alt: 'Productivity metrics analytics dashboard displaying productivity scores and trend indicators' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-trends.jpg', alt: 'Trends analytics dashboard showing historical comparisons and trend analysis over time' },
            { src: '/images/projects/workplace-analytics-programs/analytics-dashboard-summary.jpg', alt: 'Analytics summary dashboard with overview of key metrics and quick insights' }
          ]
        },
        {
          title: 'Workplace Focus & Nudges System',
          body: 'Designed and implemented a nudges system that provided gentle behavioral prompts to help users improve their work habits and productivity without being intrusive. The Workplace Focus component integrated seamlessly with the analytics platform.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/nudges-system.png', alt: 'Nudges system interface showing behavioral prompts and productivity suggestions' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-1.jpg', alt: 'Workplace Focus interface screen 1 showing nudge system and behavioral prompts' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-2.jpg', alt: 'Workplace Focus interface screen 2 with productivity insights and recommendations' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-3.jpg', alt: 'Workplace Focus interface screen 3 displaying focus time tracking and goals' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-4.jpg', alt: 'Workplace Focus interface screen 4 showing work-life balance metrics' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-5.jpg', alt: 'Workplace Focus interface screen 5 with personalized insights and tips' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-6.jpg', alt: 'Workplace Focus interface screen 6 displaying weekly summary and progress' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-7.jpg', alt: 'Workplace Focus interface screen 7 with notification settings and preferences' },
            { src: '/images/projects/workplace-analytics-programs/workplace-focus-interface-8.jpg', alt: 'Workplace Focus interface screen 8 showing detailed analytics and breakdowns' }
          ]
        },
        {
          title: 'Advanced Analytics & Insights',
          body: 'Continued development of sophisticated analytics interfaces that provided deeper insights into workplace patterns and productivity metrics.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/advanced-analytics-insights-1.jpg', alt: 'Advanced analytics insights screen 1 showing deep insights into work patterns and behaviors' },
            { src: '/images/projects/workplace-analytics-programs/advanced-analytics-insights-2.jpg', alt: 'Advanced analytics insights screen 2 with predictive insights and trend forecasting' },
            { src: '/images/projects/workplace-analytics-programs/advanced-analytics-insights-3.jpg', alt: 'Advanced analytics insights screen 3 displaying comparative analysis and benchmarking' },
            { src: '/images/projects/workplace-analytics-programs/advanced-analytics-insights-4.png', alt: 'Advanced analytics insights screen 4 with custom report generation and export options' },
            { src: '/images/projects/workplace-analytics-programs/advanced-analytics-insights-5.png', alt: 'Advanced analytics insights screen 5 showing organizational-level insights and aggregations' },
            { src: '/images/projects/workplace-analytics-programs/focus-analytics-insights-1.png', alt: 'Focus analytics insights screen 1 displaying personal productivity insights and recommendations' },
            { src: '/images/projects/workplace-analytics-programs/focus-analytics-insights-2.jpg', alt: 'Focus analytics insights screen 2 with goal tracking and achievement metrics' },
            { src: '/images/projects/workplace-analytics-programs/focus-analytics-insights-3.jpg', alt: 'Focus analytics insights screen 3 showing time management insights and optimization suggestions' }
          ]
        },
        {
          title: 'Management & Interface Controls',
          body: 'Interface management tools that allowed administrators to configure and customize the analytics experience for different user groups and organizational needs.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/admin-identify-interface.jpg', alt: 'Admin identify interface for identifying and configuring user groups and permissions' },
            { src: '/images/projects/workplace-analytics-programs/admin-manage-page-interface.jpg', alt: 'Admin management page interface for program configuration and settings' },
            { src: '/images/projects/workplace-analytics-programs/admin-manage-panel-interface.jpg', alt: 'Admin management panel interface with detailed control options' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-1.jpg', alt: 'Management interface configuration screen 1 for configuring analytics visibility and access controls' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-2.jpg', alt: 'Management interface configuration screen 2 showing program assignment and user management' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-3.jpg', alt: 'Management interface configuration screen 3 with reporting and data export configuration' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-4.jpg', alt: 'Management interface configuration screen 4 displaying notification and nudge settings' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-5.jpg', alt: 'Management interface configuration screen 5 with privacy and compliance controls' },
            { src: '/images/projects/workplace-analytics-programs/management-interface-config-6.jpg', alt: 'Management interface configuration screen 6 showing integration settings and API configuration' }
          ]
        },
        {
          title: 'Design Refinement & Final Implementation',
          body: 'Screenshots documenting the refinement process and final implementation, showing how designs evolved from wireframes to polished interfaces based on user feedback and testing.',
          images: [
            { src: '/images/projects/workplace-analytics-programs/project-evolution-late.png', alt: 'Late-stage design refinement showing near-final interfaces and implementation progress' }
          ]
        }
      ]
    }
  },
  {
    slug: 'improving-work-life-balance',
    title: 'Microsoft — MyAnalytics metrics & self-help',
    description: 'Evolving MyAnalytics from raw analytics into actionable self-help — top-four metrics, motion, sharing, and onboarding.',
    year: 2018,
        image: { src: '/images/projects/cards/data-viz.png', alt: 'MyAnalytics top four metrics' },
    stack: ['Microsoft', 'Product', 'Animation'],
    details: {
      role: 'Designer 2 (UX with prototyping and Front-End collaboration)',
      entity: 'Microsoft — MyAnalytics',
      years: 'Early 2017 – 2018',
      headerImage: { src: '/images/projects/improving-work-life-balance/top-four.png', alt: 'Top four metrics redesign' },
      synopsis: [
        'MyAnalytics turns Office 365 signals (meetings, email, focus) into personal insight. I pushed it from a readout toward a self-help product — clearer metrics, motion that teaches, sharing, and onboarding.',
        'Worked with front-end to ship motion prototypes; iterated with PMs until the top-four metrics and sharing affordances were something people could act on.',
      ],
      skills: ['UX design', 'Prototyping', 'Front-end collaboration', 'Animation design'],
      goals: [
        'Make the top-four metrics scannable and actionable in one view',
        'Use motion to teach work patterns without decoration for its own sake',
        'Add sharing and onboarding that help people start — and return',
      ],
      results: [
        'Top-four metrics redesign shipped with coded animation prototypes',
        'Sharing and onboarding concepts validated through iterative stakeholder review',
        'Established the self-help framing that later Focus Time work could build on',
      ],
      prototypes: [
        { label: 'Top Four Redesign and Animations', href: 'https://codepen.io/mhsenkow/pen/PmbJRz' },
        { label: 'Sharing Button Concept', href: 'https://codepen.io/mhsenkow/full/QQGBOX/' },
        { label: 'Motion Concept', href: 'https://codepen.io/mhsenkow/full/eRYzoW/' }
      ],
      sections: [
        {
          title: 'Redesign of top four metrics',
          body: 'Revamped the core metrics to make data more accessible and actionable for users. Developed animations to guide users through the metrics and help them understand their work patterns.',
          images: [
            { src: '/images/projects/improving-work-life-balance/top-four.png', alt: 'Top four metrics — initial concepts' },
            { src: '/images/projects/improving-work-life-balance/iterations.png', alt: 'Metric iterations and refinements' },
            { src: '/images/projects/improving-work-life-balance/ideal-version.png', alt: 'Ideal version of metrics display' }
          ]
        },
        {
          title: 'Initial sharing experience',
          body: 'Designed an intuitive sharing feature to enhance user engagement and collaboration, allowing users to share their work-life balance insights with colleagues.',
          images: [
            { src: '/images/projects/improving-work-life-balance/final-design.png', alt: 'Final sharing experience design' }
          ]
        },
        {
          title: 'Onboarding experience',
          body: 'Created a comprehensive onboarding process to educate users about the source of their data and how to utilize it effectively. This included multiple iterations from the initial design through PM alterations to the final coded design.',
          images: [
            { src: '/images/projects/improving-work-life-balance/final-code.png', alt: 'Final coded onboarding implementation' }
          ]
        }
      ]
    }
  },
  {
    slug: 'trusted-news-chrome-extension',
    title: 'Trusted News — AI Chrome extension',
    description: '2019 FHL hackathon: rapid UX/visual iterations and front-end prototyping with data scientists and engineers.',
    year: 2019,
    links: [
      { label: 'Final prototype', href: 'https://codepen.io/mhsenkow/full/xvVGWj' },
    ],
    image: { src: '/images/projects/cards/trusted-news.png', alt: 'Trusted News' },
    gallery: [
      { src: '/images/projects/trusted-news-chrome-extension/final-layout.png', alt: 'Final layout, displaying the regions of the extension' },
      { src: '/images/projects/trusted-news-chrome-extension/extension-interface-1.png', alt: 'Extension interface showing news source verification' },
      { src: '/images/projects/trusted-news-chrome-extension/extension-interface-2.png', alt: 'Extension interface displaying trust indicators' },
      { src: '/images/projects/trusted-news-chrome-extension/extension-ui-detail.png', alt: 'Extension UI detail showing interface components' },
      { src: '/images/projects/trusted-news-chrome-extension/extension-interface-3.png', alt: 'Extension interface with news analysis features' }
    ],
    stack: ['Hackathon', 'Prototype', 'Chrome Extension'],
    details: {
      role: 'User Experience Designer/Researcher',
      entity: 'Microsoft',
      location: '2019 Hackathon (FHL)',
      years: '2019',
      team: 'Sole designer working with multiple data scientists, PMs, and engineers.',
      headerImage: { src: '/images/projects/trusted-news-chrome-extension/final-layout.png', alt: 'Final layout of the Trusted News extension' },
      synopsis: [
        'During the 2019 Microsoft FHL hackathon, I served as the sole designer on a fast-paced project. My responsibilities included quick visual experimentation, front-end coding, and both UX and visual design. Collaborating closely with data scientists, PMs, and engineers, we rapidly developed and refined our project.',
        'I played a key role in transforming initial concepts into a functional prototype, which involved iterative design processes and agile development practices. My contributions culminated in a final set of designs and front-end code, effectively demonstrating the project\'s potential and usability.'
      ],
      skills: ['Quick visual experimentation', 'Front-end coding', 'UX design', 'Visual design'],
      prototypes: [
        { label: 'Final set of design and front-end code', href: 'https://codepen.io/mhsenkow/full/xvVGWj' }
      ]
    }
  },
  {
    slug: 'data-viz-framework-meta',
    title: 'Meta Infra — Vega data viz framework & AI infographics',
    description:
      'Chart grammar, coded Vega examples, and documentation for Meta Infra — plus AI-imagen storytelling explorations.',
    year: 2022,
    featured: true,
        image: { src: '/images/projects/cards/contracts-suite.png', alt: 'Data viz framework' },
    gallery: [
      { src: '/images/projects/data-viz-framework-meta/Axis_and_Legend.png', alt: 'Axis and Legend' },
      { src: '/images/projects/data-viz-framework-meta/Line_Chart.png', alt: 'Line Chart' },
      { src: '/images/projects/data-viz-framework-meta/Slope_Chart.png', alt: 'Slope Chart' },
      { src: '/images/projects/data-viz-framework-meta/Barbell_Chart.png', alt: 'Barbell Chart' },
      { src: '/images/projects/data-viz-framework-meta/Funnel_Chart.png', alt: 'Funnel Chart' },
      { src: '/images/projects/data-viz-framework-meta/Bullet_Chart.png', alt: 'Bullet Chart' },
      { src: '/images/projects/data-viz-framework-meta/Box_Plot.png', alt: 'Box Plot' },
      { src: '/images/projects/data-viz-framework-meta/Parallel_Coordinates.png', alt: 'Parallel Coordinates' },
      { src: '/images/projects/data-viz-framework-meta/Scatter_Plot.png', alt: 'Scatter Plot' },
      { src: '/images/projects/data-viz-framework-meta/Colors.png', alt: 'Color palette' },
      { src: '/images/projects/data-viz-framework-meta/All_Palettes.png', alt: 'All color palettes' },
      { src: '/images/projects/data-viz-framework-meta/Presentation.png', alt: 'Presentation' },
      { src: '/images/projects/data-viz-framework-meta/Concept.png', alt: 'Concept design' }
    ],
    stack: ['Meta', 'Vega', 'Data Viz'],
    details: {
      role: 'Product Designer',
      entity: 'Meta',
      location: 'Seattle · talks in MPK, London, Tel Aviv',
      years: '2022–2023',
      team: 'Paired with a lead front-end engineer and PM; 5–8 engineers on training/integration; researcher validating results.',
      headerEmbed: { 
        html: '<iframe src="https://www.slideshare.net/slideshow/embed_code/key/q3WcAhjVafouPW" width="610" height="515" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border: var(--border-1) solid #CCC; border-width:1px; margin-bottom:5px; max-width:100%;" allowfullscreen></iframe>',
        title: 'AI-Imagen for Data Storytelling Infographics',
        link: 'https://www.slideshare.net/slideshow/ai-imagen-for-data-storytelling-infographics-pdf/268972473'
      },
      synopsis: [
        'Led Meta Infra’s data-visualization framework: chart grammar, visual guidance, and Vega prototypes that made “what can we draw?” an engineering-ready answer — not a slide deck of aspirations.',
        'Coded Vega examples alongside engineering so axis, legend, and chart-type decisions survived handoff. Work ran next to the wider infra design system for consistency across Analysis tools.',
        'AI-imagen storytelling: explored prompt → infographic paths for data narratives, presented across Meta sites (MPK, London, Tel Aviv).',
      ],
      skills: ['UX design', 'Visual design', 'Prototyping (Vega)', 'Documentation', 'PM and engineering collaboration', 'Research validation'],
      goals: [
        'Give Infra a shared chart vocabulary engineers could implement without one-off art',
        'Ship coded Vega references for core chart types, axes, legends, and palettes',
        'Validate the framework with research — not only design preference',
        'Explore AI-assisted data storytelling without abandoning chart rigor',
      ],
      results: [
        'Framework guidance and Vega prototypes adopted as the Infra viz reference alongside the design system',
        'Chart library coverage across line, slope, barbell, funnel, bullet, box, parallel coordinates, scatter, and more',
        'AI-imagen storytelling deck used to socialize prompt → infographic patterns across Meta Infra',
      ],
    }
  },
  {
    slug: 'design-guide-thousands-users',
    title: 'IBM — Watson Data Platform design guide',
    description: 'Coded component guide with the dev lead — shipped into products used across thousands of users.',
    year: 2017,
        image: { src: '/images/projects/design-guide-thousands-users/card.png', alt: 'Design guide' },
    gallery: [
      // Key overview images
      { src: '/images/projects/design-guide-thousands-users/design-guide-overview-navigation.png', alt: 'Design guide overview' },
      { src: '/images/projects/design-guide-thousands-users/component-library-showcase.png', alt: 'Component library showcase' }
    ],
    stack: ['IBM', 'Design System', 'Component Library', 'UX Design', 'Frontend Development'],
    details: {
      role: 'UX Designer / Design Developer',
      entity: 'IBM Design, Watson Data Platform (formerly Analytics Platform)',
      years: '2016–2017',
      team: 'Very healthy leadership combo of design, dev and management with PM. For direct work I was doing a mix of UX concepts and coding to see how these components played out.',
      headerImage: { src: '/images/projects/design-guide-thousands-users/design-guide-overview-navigation.png', alt: 'IBM Watson Data Platform design guide' },
      synopsis: [
        'On Watson Data Platform I worked as designer-developer: the guide’s components were built and coded with my dev lead, while UX landed with visual designers and the Design Lead.',
        'Seeing those components land in products — and hearing feedback from real usage — was the point. The system had to work for teams shipping, not only for the guide itself.',
      ],
      skills: ['Design system architecture', 'Component library development', 'Frontend development', 'UX design', 'Technical documentation', 'Design-to-code implementation'],
      goals: [
        'Ship a coded component guide products could adopt without reinterpretation',
        'Keep design and implementation in one loop with the dev lead',
        'Cover usage guidelines so integration didn’t invent new variants',
      ],
      results: [
        'Guide components integrated across Watson Data Platform products',
        'Thousands of users experienced the shared patterns in production',
        'Design-to-code partnership became the delivery model for the system',
      ],
      sections: [
        {
          title: 'Design Guide Foundation',
          body: 'The comprehensive design guide served as the foundation for consistent user experiences across the Watson Data Platform. This system enabled thousands of users to have a cohesive experience while working across multiple products.',
          images: [
            { src: '/images/projects/design-guide-thousands-users/design-guide-overview-navigation.png', alt: 'Design guide overview and navigation' },
            { src: '/images/projects/design-guide-thousands-users/component-documentation-structure.png', alt: 'Component documentation structure' },
            { src: '/images/projects/design-guide-thousands-users/visual-design-system-principles.png', alt: 'Visual design system principles' }
          ]
        },
        {
          title: 'Component Library Development',
          body: 'Working closely with the dev lead, I coded and designed comprehensive component libraries that could be easily implemented across different products. Each component included detailed specifications and usage guidelines.',
          images: [
            { src: '/images/projects/design-guide-thousands-users/component-specifications-properties.png', alt: 'Component specifications and properties' },
            { src: '/images/projects/design-guide-thousands-users/design-patterns-variations.png', alt: 'Design patterns and variations' },
            { src: '/images/projects/design-guide-thousands-users/component-library-showcase.png', alt: 'Comprehensive component library showcase' },
            { src: '/images/projects/design-guide-thousands-users/implementation-examples-code-snippets.png', alt: 'Implementation examples and code snippets' }
          ]
        },
        {
          title: 'Interactive Components & Patterns',
          body: 'The guide included detailed documentation of interactive components, showing different states, variations, and usage patterns that designers and developers could reference when building new features.',
          images: [
            { src: '/images/projects/design-guide-thousands-users/component-variations-states.png', alt: 'Component variations and states' },
            { src: '/images/projects/design-guide-thousands-users/design-guide-navigation-structure.png', alt: 'Design guide navigation and structure' },
            { src: '/images/projects/design-guide-thousands-users/system-architecture-relationships.png', alt: 'System architecture and relationships' }
          ]
        },
        {
          title: 'Implementation & Usage Guidelines',
          body: 'The final sections of the guide provided clear usage guidelines, implementation details, and real-world examples that helped teams successfully integrate the design system into their products.',
          images: [
            { src: '/images/projects/design-guide-thousands-users/usage-guidelines-best-practices.png', alt: 'Usage guidelines and best practices' },
            { src: '/images/projects/design-guide-thousands-users/detailed-component-specifications.png', alt: 'Detailed component specifications' },
            { src: '/images/projects/design-guide-thousands-users/final-implementation-showcase.png', alt: 'Final implementation showcase' }
          ]
        }
      ]
    }
  },
  {
    slug: 'watson-analytics-early-work',
    title: 'IBM — Watson Analytics early research',
    description: 'Foundational research and prototypes that fed Watson Analytics — social analytics proofs and AI dashboard concepts.',
    year: 2014,
    featured: false,
        image: { src: '/images/projects/cards/watson.png', alt: 'Watson Analytics' },
    gallery: [],
    stack: ['IBM', 'Analytics'],
    details: {
      role: 'UX Designer / Researcher / Prototyper',
      entity: 'IBM Design, Watson Analytics',
      years: '2013–2014',
      team: 'Collaborated with researchers, designers, developers, and PMs.',
      headerImage: { src: '/images/projects/watson-analytics-early-work/overview.png', alt: 'Watson Analytics early work overview' },
      synopsis: [
        'During my tenure at IBM, I initially focused on conducting research for what would eventually grow into Watson Analytics. This foundational work set the stage for the development of powerful analytics tools.',
        'In the same group, my role evolved to include creating numerous prototypes to help sell the concept of social media analytics, demonstrating the potential and value of these tools to stakeholders and clients.',
        'In addition to these practical applications, I also developed blue-sky concepts for the future of AI-powered dashboards. These visionary designs aimed to showcase the potential of AI to transform data visualization and user interaction, pushing the boundaries of what analytics platforms could achieve.'
      ],
      skills: ['Research', 'Prototyping', 'UX design', 'Concept development', 'Stakeholder engagement'],
      sections: [
        {
          title: 'Initial Research',
          body: 'Conducted extensive research to lay the groundwork for Watson Analytics.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-1.png', alt: 'Research visualization showing data patterns and insights for Watson Analytics foundation' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-2.png', alt: 'Research visualization displaying analytical frameworks and data relationships' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-3.png', alt: 'Research visualization with statistical analysis and pattern recognition' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-4.png', alt: 'Research visualization showing user behavior patterns and analytics insights' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-5.png', alt: 'Research visualization displaying data correlation and trend analysis' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-6.png', alt: 'Research visualization with comparative analysis and benchmarking' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-7.png', alt: 'Research visualization showing predictive modeling and forecasting' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-8.png', alt: 'Research visualization displaying network analysis and relationship mapping' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-9.png', alt: 'Research visualization with time series analysis and temporal patterns' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-10.png', alt: 'Research visualization showing clustering and segmentation analysis' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-11.png', alt: 'Research visualization displaying dimensional analysis and data exploration' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-12.png', alt: 'Research visualization with interactive data exploration and drill-down capabilities' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-13.png', alt: 'Research visualization showing advanced statistical models and algorithms' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-14.png', alt: 'Research visualization displaying machine learning insights and predictions' },
            { src: '/images/projects/watson-analytics-early-work/research-visualization-data-patterns-15.png', alt: 'Research visualization with comprehensive analytics dashboard concepts' }
          ]
        },
        {
          title: 'Prototyping Social Media Analytics',
          body: 'Created a series of prototypes to demonstrate and sell the concept of social media analytics.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/social-media-analytics-prototype-1.png', alt: 'Social media analytics prototype showing sentiment analysis and engagement metrics' },
            { src: '/images/projects/watson-analytics-early-work/social-media-analytics-prototype-2.png', alt: 'Social media analytics prototype displaying trend tracking and influencer analysis' },
            { src: '/images/projects/watson-analytics-early-work/social-media-analytics-prototype-3.png', alt: 'Social media analytics prototype with content performance and reach analytics' },
            { src: '/images/projects/watson-analytics-early-work/social-media-analytics-prototype-4.png', alt: 'Social media analytics prototype showing audience insights and demographic analysis' }
          ]
        },
        {
          title: 'AI-Powered Dashboards',
          body: 'Developed innovative blue-sky concepts for future AI-powered dashboards, highlighting the potential for advanced data visualization and user interaction.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-1.png', alt: 'AI-powered dashboard concept showing intelligent data visualization and insights' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-2.png', alt: 'AI-powered dashboard concept with natural language query interface' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-3.png', alt: 'AI-powered dashboard concept displaying predictive analytics and forecasting' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-4.png', alt: 'AI-powered dashboard concept with automated insight generation' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-5.png', alt: 'AI-powered dashboard concept showing contextual recommendations and suggestions' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-6.png', alt: 'AI-powered dashboard concept with interactive data exploration and discovery' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-7.png', alt: 'AI-powered dashboard concept displaying anomaly detection and alerts' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-8.png', alt: 'AI-powered dashboard concept with conversational analytics interface' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-9.png', alt: 'AI-powered dashboard concept showing adaptive visualization and personalization' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-10.png', alt: 'AI-powered dashboard concept with multi-dimensional data analysis' },
            { src: '/images/projects/watson-analytics-early-work/ai-dashboard-concept-12.png', alt: 'AI-powered dashboard concept displaying advanced machine learning insights' }
          ]
        },
        {
          title: 'Analytics Explorations',
          body: 'Additional explorations and concepts for analytics visualization.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-3.png', alt: 'Analytics exploration showing alternative visualization approaches and design patterns' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-4.png', alt: 'Analytics exploration displaying experimental chart types and data representations' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-5.png', alt: 'Analytics exploration with interactive filtering and dynamic querying' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-6.png', alt: 'Analytics exploration showing comparative views and multi-dataset analysis' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-7.png', alt: 'Analytics exploration displaying temporal analysis and time-based insights' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-8.png', alt: 'Analytics exploration with spatial data visualization and geographic insights' },
            { src: '/images/projects/watson-analytics-early-work/analytics-exploration-visualization-9.png', alt: 'Analytics exploration showing hierarchical data structures and tree visualizations' }
          ]
        }
      ]
    }
  },
  {
    slug: 'vaporize-art-installation',
    title: 'Vaporize — product design art installation',
    description: 'Glow Workshop installation in Flint, MI; early physical interaction explorations.',
    year: 2013,
        image: { src: '/images/projects/vaporize-art-installation/card.png', alt: 'Vaporize installation' },
    gallery: [
      { src: '/images/projects/vaporize-art-installation/vaporized-01.png', alt: 'Vaporize installation overview' },
      { src: '/images/projects/vaporize-art-installation/vaporized-06.png', alt: 'Installation detail view' },
      { src: '/images/projects/vaporize-art-installation/vaporized-21.png', alt: 'Project documentation' }
    ],
    category: 'creative',
    stack: ['Physical Interaction Design', 'Art Installation', 'LED Design', 'CNC Machining', 'Thermoforming'],
    details: {
      role: 'Machining, Electrical work, Product Conception (Design)',
      entity: 'Glow Workshop, installation in an open storefront',
      location: 'Flint, MI',
      synopsis: [
        "Designed as part of the Glow Workshop led by Cathlyn Newell the workshop took a shop space in downtown Flint and designed projects based upon the concept of 'Glow'. I worked alongside Beatrice Lau and William Liow and created the final project you can see below. This was one of my first projects that started to toe the line of physical interaction design, looking into how objects can directly shape users connection to a space.",
        "The core concept was that the hanging pendants developed used a combination of CNC framework, thermoforming, LED-lighting, and creative set-ups with dry-ice and a water pump to create objects that dramatically altered the atmosphere of the space. A step-by-step process of the work that led up the final piece is viewable in the connected images.",
        "I keep this project around (2012 creation now) as I love this space. This was more of an art installation but it really pushed me to think about space and place in relation to interactive mediums."
      ],
      skills: ['3D modeling', 'LED wiring', 'CNC machining', 'Thermoforming', 'Dry-ice', 'Physical Interaction Design', 'Product Conception', 'Electrical Work', 'Machining'],
      prototypes: [
        { label: 'Video 1', href: 'https://vimeo.com/25918570' },
        { label: 'Video 2', href: 'https://vimeo.com/21954111' }
      ],
      headerEmbed: {
        html: '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--radius-md); box-shadow: var(--shadow-1);"><iframe src="https://player.vimeo.com/video/25918570?title=0&byline=0&portrait=0&responsive=1" style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>',
        title: 'Vaporize Installation Video',
        link: 'https://vimeo.com/25918570'
      },
      sections: [
        {
          title: 'Installation Overview',
          body: 'The Vaporize installation explored the concept of "Glow" through physical interaction design, creating an immersive experience that connected users to the space through interactive elements.',
          images: [
            { src: '/images/projects/vaporize-art-installation/vaporized-01.png', alt: 'Installation overview' },
            { src: '/images/projects/vaporize-art-installation/vaporized-02.png', alt: 'Installation detail 1' },
            { src: '/images/projects/vaporize-art-installation/vaporized-03.png', alt: 'Installation detail 2' },
            { src: '/images/projects/vaporize-art-installation/vaporized-04.png', alt: 'Installation detail 3' },
            { src: '/images/projects/vaporize-art-installation/vaporized-05.png', alt: 'Installation detail 4' }
          ]
        },
        {
          title: 'Technical Implementation',
          body: 'The project involved sophisticated technical implementation including LED wiring, CNC machining, thermoforming, and dry-ice effects to create the desired atmospheric and interactive experience.',
          images: [
            { src: '/images/projects/vaporize-art-installation/vaporized-06.png', alt: 'Technical detail 1' },
            { src: '/images/projects/vaporize-art-installation/vaporized-07.png', alt: 'Technical detail 2' },
            { src: '/images/projects/vaporize-art-installation/vaporized-08.png', alt: 'Technical detail 3' },
            { src: '/images/projects/vaporize-art-installation/vaporized-09.png', alt: 'Technical detail 4' },
            { src: '/images/projects/vaporize-art-installation/vaporized-10.png', alt: 'Technical detail 5' }
          ]
        },
        {
          title: 'Physical Interaction Design',
          body: 'The installation explored how physical objects could directly shape users\' connection to a space, representing early work in physical interaction design and environmental experience.',
          images: [
            { src: '/images/projects/vaporize-art-installation/vaporized-11.png', alt: 'Interaction design 1' },
            { src: '/images/projects/vaporize-art-installation/vaporized-12.png', alt: 'Interaction design 2' },
            { src: '/images/projects/vaporize-art-installation/vaporized-13.png', alt: 'Interaction design 3' },
            { src: '/images/projects/vaporize-art-installation/vaporized-14.png', alt: 'Interaction design 4' },
            { src: '/images/projects/vaporize-art-installation/vaporized-15.png', alt: 'Interaction design 5' }
          ]
        },
        {
          title: 'Final Installation & Documentation',
          body: 'The completed installation in the downtown Flint storefront space, showcasing the final implementation and documenting the collaborative process with Beatrice Lau and William Liow.',
          images: [
            { src: '/images/projects/vaporize-art-installation/vaporized-16.png', alt: 'Final installation 1' },
            { src: '/images/projects/vaporize-art-installation/vaporized-17.png', alt: 'Final installation 2' },
            { src: '/images/projects/vaporize-art-installation/vaporized-18.png', alt: 'Final installation 3' },
            { src: '/images/projects/vaporize-art-installation/vaporized-19.png', alt: 'Final installation 4' },
            { src: '/images/projects/vaporize-art-installation/vaporized-20.png', alt: 'Final installation 5' },
            { src: '/images/projects/vaporize-art-installation/vaporized-21.png', alt: 'Project documentation screenshot' }
          ]
        }
      ]
    }
  },
  {
    slug: 'grad-school-data-viz',
    title: 'Grad school data visualization work',
    description: 'Early Processing/D3 visualization experiments during University of Michigan grad school.',
    year: 2013,
    links: [
      { label: 'First project Video', href: 'https://youtu.be/cNAjJkotTjo' },
    ],
    image: { src: '/images/projects/cards/data-viz.png', alt: 'Grad school data viz' },
    gallery: [
      { src: '/images/projects/grad-school-data-viz/viz.png', alt: 'Visualization experiment 1' },
      { src: '/images/projects/grad-school-data-viz/viz1.png', alt: 'Visualization experiment 2' },
      { src: '/images/projects/grad-school-data-viz/viz2.png', alt: 'Visualization experiment 3' },
      { src: '/images/projects/grad-school-data-viz/vizb.png', alt: 'Visualization experiment 4' },
      { src: '/images/projects/grad-school-data-viz/final1.png', alt: 'Final visualization 1' },
      { src: '/images/projects/grad-school-data-viz/final2.png', alt: 'Final visualization 2' },
      { src: '/images/projects/grad-school-data-viz/final3.png', alt: 'Final visualization 3' },
      { src: '/images/projects/grad-school-data-viz/final3-alt.png', alt: 'Final visualization 3 variant' },
      { src: '/images/projects/grad-school-data-viz/final4.png', alt: 'Final visualization 4' },
      { src: '/images/projects/grad-school-data-viz/final5.png', alt: 'Final visualization 5' },
      { src: '/images/projects/grad-school-data-viz/final6.png', alt: 'Final visualization 6' },
      { src: '/images/projects/grad-school-data-viz/final7.png', alt: 'Final visualization 7' },
      { src: '/images/projects/grad-school-data-viz/final8.png', alt: 'Final visualization 8' },
      { src: '/images/projects/grad-school-data-viz/final9.png', alt: 'Final visualization 9' },
      { src: '/images/projects/grad-school-data-viz/final10.png', alt: 'Final visualization 10' },
      { src: '/images/projects/grad-school-data-viz/screenshot-12.36.59-pm.png', alt: 'Processing sketch 1' },
      { src: '/images/projects/grad-school-data-viz/screenshot2-12.36.59-pm.png', alt: 'Processing sketch 2' },
      { src: '/images/projects/grad-school-data-viz/screenshot-12.46.15-pm.png', alt: 'D3 visualization 1' },
      { src: '/images/projects/grad-school-data-viz/screenshot-12.46.22-pm.png', alt: 'D3 visualization 2' },
      { src: '/images/projects/grad-school-data-viz/screenshot-12.46.30-pm.png', alt: 'D3 visualization 3' },
      { src: '/images/projects/grad-school-data-viz/screenshot-12.46.36-pm.png', alt: 'D3 visualization 4' }
    ],
    category: 'creative',
    stack: ['Processing', 'D3.js', 'Data Viz'],
    details: {
      role: 'User Experience Designer / Visual Designer / Programmer',
      entity: 'University of Michigan Graduate School',
      location: 'Ann Arbor, MI',
      years: '2013',
      team: 'Collaborated with 3 UX peers',
      synopsis: [
        'This represents my earliest portfolio-kept work on data-visualization projects, undertaken during my time at the University of Michigan. These experimental classwork projects were among the initial sparks that ignited my interest in the field of data visualization and I like to keep around as comparison.',
        'As a UX Designer, Visual Designer, and Programmer, I engaged in creating innovative visualizations using tools such as Processing and D3.js. This work involved combining information visualization techniques with graphic design principles and scripting to produce compelling and insightful visual representations of data.',
        'Various experiments were made, and the final piece allows a user to look through pay scales of different departments and quickly compare them, changing scale when departments have too many people or too few to work with the current view. I enjoy looking back on this project just in that it started my interest in really trying to finesse the details of a project.'
      ],
      skills: ['Information Visualization', 'Graphic Design', 'Processing Programming', 'D3.js', 'Scripting'],
      prototypes: [
        { label: 'First project Video', href: 'https://www.youtube.com/watch?v=cNAjJkotTjo' }
      ]
    }
  },
  {
    slug: 'guide-to-the-galaxy',
    title: 'Guide to the galaxy — mobile app concept',
    description: 'Adler Planetarium “walk the solar system” Android concept; quick 2‑day volunteer project.',
    year: 2012,
        image: { src: '/images/projects/cards/adler.png', alt: 'Adler mobile concept' },
    gallery: [
      { src: '/images/projects/cards/adler.png', alt: 'Guide to the Galaxy concept' }
    ],
    category: 'creative',
    stack: ['Android', 'UX'],
    details: {
      role: 'User Experience Designer/Researcher',
      entity: 'Adler Spatial Visualization Lab',
      location: 'Chicago, IL',
      years: '2012',
      synopsis:
        'Two‑day Android MVP letting users “walk” the solar system around the planetarium with info bubbles.',
      skills: ['Graphic Design', 'Processing', 'Android', 'Interaction Design']
    }
  },
  {
    slug: 'morphfaux-kuka-plaster-research',
    title: 'Morphfaux — KUKA robot plaster research',
    description: 'Robotic plaster deposition experiments; scripting, motion control, and presentation assets.',
    year: 2012,
        image: { src: '/images/projects/cards/morphfaux.png', alt: 'Morphfaux' },
    gallery: [
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-1.jpg', alt: 'Morphfaux — 3D model rendering' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-2.jpg', alt: 'Morphfaux — detail study' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-3.jpg', alt: 'Morphfaux — plaster pattern 1' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-4.jpg', alt: 'Morphfaux — plaster pattern 2' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-5.png', alt: 'Morphfaux — technical diagram' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-6.jpg', alt: 'Morphfaux — KUKA robot setup' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-7.jpg', alt: 'Morphfaux — plaster deposition test' },
      { src: '/images/projects/morphfaux-kuka-plaster-research/morphfaux-8.jpg', alt: 'Morphfaux — fabrication result' }
    ],
    category: 'creative',
    stack: ['KUKA', 'Rhino', 'Arduino', 'Grasshopper'],
    details: {
      role: 'Design Research Assistant',
      entity: 'Taubman Architecture — University of Michigan',
      location: 'Ann Arbor, MI',
      years: '2011–2012 (off and on)',
      synopsis: [
        'Off and on in 2011 and 2012 I aided Joshua Bard, a professor within the University of Michigan\'s Architecture school, currently a professor at Carnegie Mellon. The Morphfaux titled project was meant to explore methods in which plaster could be enhanced through modern fabrication techniques.',
        'My primary input was through attempted scripting and then machine control of a moving head for the KUKA robot, for laying plaster, alongside creating presentation materials (see the 3D models and 2D illustrations) for this work. This project combined computational design with physical fabrication, exploring the intersection of digital control and material behavior.'
      ],
      skills: ['Design Research', 'Rhinoscripting', 'Grasshopper (3D modeling Software)', 'Arduino Control of Stepper Motors', 'KUKA Robot Programming', 'Fabrication']
    }
  },
  {
    slug: 'architecture-graduate-projects',
    title: 'Architecture graduate projects',
    description: 'Selected architecture course projects: advanced graphics, modeling, rendering.',
    year: 2012,
        image: { src: '/images/projects/cards/architecture.png', alt: 'Architecture projects' },
    gallery: [
      { src: '/images/projects/architecture-graduate-projects/menil-1.png', alt: 'Menil Collection — exterior perspective' },
      { src: '/images/projects/architecture-graduate-projects/menil-2.png', alt: 'Menil Collection — interior space' },
      { src: '/images/projects/architecture-graduate-projects/menil-3.png', alt: 'Menil Collection — detail view 1' },
      { src: '/images/projects/architecture-graduate-projects/menil-4.png', alt: 'Menil Collection — detail view 2' },
      { src: '/images/projects/architecture-graduate-projects/menil-5.png', alt: 'Menil Collection — structural detail' },
      { src: '/images/projects/architecture-graduate-projects/menil-6.png', alt: 'Menil Collection — site plan' },
      { src: '/images/projects/architecture-graduate-projects/menil-7.png', alt: 'Menil Collection — section drawing' },
      { src: '/images/projects/architecture-graduate-projects/menil-8.png', alt: 'Menil Collection — rendering study' },
      { src: '/images/projects/architecture-graduate-projects/menil-9.png', alt: 'Menil Collection — materiality study' },
      { src: '/images/projects/architecture-graduate-projects/menil-10.png', alt: 'Menil Collection — final rendering' }
    ],
    category: 'creative',
    stack: ['Architecture', '3D Modeling', 'Rendering'],
    details: {
      entity: 'Taubman College of Architecture',
      location: 'Ann Arbor, MI',
      years: '2011–2013',
      synopsis: [
        'Generally lumping a number of architecture course projects here. This represents work across advanced graphic design, 3D modeling, rendering, and various modeling explorations during my time at the University of Michigan\'s Taubman College.',
        'These projects showcase the foundational visual craft and spatial thinking that continues to influence my design work today — from understanding structure and hierarchy to communicating complex ideas through visual representation.'
      ],
      skills: ['Advanced Graphic Design', '3D Modeling', 'Rendering', 'Spatial Design', 'Visual Communication']
    }
	},
	// Additional creative sections mirrored from Other Creative Work
	{
		slug: 'icon-creation',
		title: 'Icon creation',
		description: 'Vector icon explorations and logo concepts; experiments with AI-assisted vectorization.',
		year: 2024,
		category: 'creative',
		links: [
			{ label: 'Noun Project Profile', href: 'https://thenounproject.com/creator/mhsenkow/' }
		],
		image: { src: '/images/projects/icon-creation/ai-vectorize-example-2.png', alt: 'Icon creation - AI vectorization example' },
		gallery: [
			{ src: '/images/projects/icon-creation/icons-screenshot-2.png', alt: 'Icon collection showcase 1' },
			{ src: '/images/projects/icon-creation/icons-screenshot-1.png', alt: 'Icon collection showcase 2' },
			{ src: '/images/projects/icon-creation/icons-screenshot-3.png', alt: 'Icon collection showcase 3' },
			{ src: '/images/projects/icon-creation/icons-screenshot-4.png', alt: 'Icon collection showcase 4' },
			{ src: '/images/projects/icon-creation/icons-screenshot-5.png', alt: 'Icon collection showcase 5' },
			{ src: '/images/projects/icon-creation/ai-vectorize-example-1.png', alt: 'AI-assisted vectorization example 1' },
			{ src: '/images/projects/icon-creation/ai-vectorize-example-2.png', alt: 'AI-assisted vectorization example 2' }
		],
		details: {
			synopsis: [
				"I'll make vector icons for the noun project every so often as a way to stretch those visual / exploration skills. I've tried a few recently around the 'quickly get an image with ai-vectorize it' route to see how that pathway goes.",
				"For UX and product design, it is often helpful to ponder a new icon or have a logo to represent a concept.",
				"Somehow my wood finish one is the most downloaded at about 5000."
			]
		}
	},
	{
		slug: 'scripted-axidraw-work',
		title: 'Scripted Axidraw work',
		description: 'Plotter art using code-driven paths; exploring digital craft and fabrication.',
		year: 2021,
		category: 'creative',
		image: { src: '/images/projects/scripted-axidraw-work/card.jpg', alt: 'Scripted Axidraw plotter work' },
		details: {
			synopsis: [
				"Code-generated paths plotted with Axidraw as part of fabrication explorations.",
				"Imagery mixes procedural scripting, 3D modeling outputs, and AI imagery refined post-generation."
			]
		}
	},
	{
		slug: 'generative-web-code-art',
		title: 'Generative web-code art',
		description: 'Small coded pieces — headers, backgrounds, loaders — and purely artistic experiments.',
		year: 2023,
		category: 'creative',
		image: { src: '/images/projects/generative-web-code-art/card.png', alt: 'Generative web-code art' },
		gallery: [
			{ src: '/images/projects/generative-web-code-art/isovox-aquarium.png', alt: 'Isovox Aquarium - 3D voxel aquarium ecosystem' },
			{ src: '/images/projects/generative-web-code-art/music-sound-experiment.png', alt: 'Music Sound experiment 2' },
			{ src: '/images/projects/generative-web-code-art/header-concept.png', alt: 'Piece 1: Header concept for cards' },
			{ src: '/images/projects/generative-web-code-art/artistic-loader-1.png', alt: 'Piece 2: Artistic loader concept' },
			{ src: '/images/projects/generative-web-code-art/artistic-loader-2.png', alt: 'Piece 3: Artistic loader concept' },
			{ src: '/images/projects/generative-web-code-art/chaotic-circle-generator.png', alt: 'Piece 4: Random chaotic circle generator' },
			{ src: '/images/projects/generative-web-code-art/slow-moving-background.png', alt: 'Piece 5: Slow moving background art' },
			{ src: '/images/projects/generative-web-code-art/background-concept.png', alt: 'Piece 7: Background concept' }
		],
		details: {
			synopsis: [
				"I'm not fully sure how to group these. In relation to direct work, these experiments could inform smart headers, backgrounds, loaders, etc. In relation to artwork elsewhere…I'm always game for a challenge.",
				"A collection of browser-based generative sketches. Pieces range from UI-adjacent concepts (headers/loaders) to purely artistic explorations.",
				"The Isovox Aquarium sketch grew into walstad loom — the full Godot game on Steam. See that case study for the shipped version."
			],
			prototypes: [
				{ label: 'walstad loom (Steam)', href: '/projects/walstad-loom' },
				{ label: 'Isovox Aquarium', href: 'https://isovox-aquarium.vercel.app/' },
				{ label: 'Voice Visualizer', href: 'https://mhsenkow.org/experiments/AliceSong/' },
				{ label: 'Music Sound experiment 2', href: 'https://mhsenkow.org/experiments/CAL/' },
				{ label: 'Piece 1: Header concept for cards', href: 'https://codepen.io/mhsenkow/full/YpjGBp' },
				{ label: 'Piece 2: Artistic loader concept', href: 'https://codepen.io/mhsenkow/full/yJkEqR' },
				{ label: 'Piece 3: Artistic loader concept', href: 'https://codepen.io/mhsenkow/full/RWQZRY' },
				{ label: 'Piece 4: Random chaotic circle generator', href: 'https://codepen.io/mhsenkow/full/avqLQr' },
				{ label: 'Piece 5: Slow moving background art', href: 'https://codepen.io/mhsenkow/full/EKEObd' },
				{ label: 'Piece 6: Purely artistic', href: 'https://codepen.io/mhsenkow/full/aZBgWd' },
				{ label: 'Piece 7: Background concept', href: 'https://codepen.io/mhsenkow/full/RWRKjB' }
			]
		}
	},
	{
		slug: 'graphic-design-work',
		title: 'Graphic design work',
		description: 'Selected graphic design examples from various roles.',
		year: 2015,
		category: 'creative',
		image: { src: '/images/projects/graphic-design-work/card.PNG', alt: 'Graphic design work' },
		gallery: [
			{ src: '/images/projects/graphic-design-work/marcom10.png', alt: 'Marketing communications design 1' },
			{ src: '/images/projects/graphic-design-work/marcom11.png', alt: 'Marketing communications design 2' },
			{ src: '/images/projects/graphic-design-work/marcom12.png', alt: 'Marketing communications design 3' },
			{ src: '/images/projects/graphic-design-work/marcom13.png', alt: 'Marketing communications design 4' }
		],
		details: {
			synopsis: "Providing some examples of the more purely graphic design work from old roles. A sampling of graphics and visual compositions created alongside product design work."
		}
	},
	{
		slug: '3d-printer-experimentation',
		title: '3D printer experimentation',
		description: 'Explorations across Rhino/Grasshopper and node-based modeling; printed studies.',
		category: 'creative',
				image: { src: '/images/projects/3d-printer-experimentation/card.png', alt: '3D printer experimentation' },
		stack: ['Rhino', 'Grasshopper', 'Blender', '3D Printing', 'Parametric Design'],
		gallery: [
			{ src: '/images/projects/3d-printer-experimentation/print.png', alt: '3D print example 1' },
			{ src: '/images/projects/3d-printer-experimentation/print1.png', alt: '3D print example 2' },
			{ src: '/images/projects/3d-printer-experimentation/print2.png', alt: '3D print example 3' },
			{ src: '/images/projects/3d-printer-experimentation/print3.png', alt: '3D print example 4' },
			{ src: '/images/projects/3d-printer-experimentation/print4.png', alt: '3D print example 5' },
			{ src: '/images/projects/3d-printer-experimentation/print5.png', alt: '3D print example 6' },
			{ src: '/images/projects/3d-printer-experimentation/print7.png', alt: '3D print example 7' },
			{ src: '/images/projects/3d-printer-experimentation/print8.png', alt: '3D print example 8' },
			{ src: '/images/projects/3d-printer-experimentation/print9.png', alt: '3D print example 9' },
			{ src: '/images/projects/3d-printer-experimentation/print10.png', alt: '3D print example 10' },
			{ src: '/images/projects/3d-printer-experimentation/print11.png', alt: '3D print example 11' },
			{ src: '/images/projects/3d-printer-experimentation/print12.png', alt: '3D print example 12' },
			{ src: '/images/projects/3d-printer-experimentation/print13.png', alt: '3D print example 13' },
			{ src: '/images/projects/3d-printer-experimentation/print14.png', alt: '3D print example 14' },
			{ src: '/images/projects/3d-printer-experimentation/print15.png', alt: '3D print example 15' },
			{ src: '/images/projects/3d-printer-experimentation/print16.png', alt: '3D print example 16' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-1.jpg', alt: '3D printed object photo 1' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-2.jpg', alt: '3D printed object photo 2' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-3.jpg', alt: '3D printed object photo 3' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-4.jpg', alt: '3D printed object photo 4' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-5.jpg', alt: '3D printed object photo 5' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-6.jpg', alt: '3D printed object photo 6' },
			{ src: '/images/projects/3d-printer-experimentation/3d-print-photo-7.jpg', alt: '3D printed object photo 7' }
		],
		details: {
			role: 'Digital Fabrication Researcher',
			entity: 'Personal Project',
			years: '2019 – Present',
			synopsis: [
				"Mechanical engineering and architecture provided me with a pretty extensive background across a number of 3d modeling tools. IDEAS, Solidworks, Sketchup, Shapelab, I've used a range.",
				"Rhino and grasshopper or blenders node based modeling systems are my favorite areas to explore in and I look at a how those system enable a number of complex 3d modeling results."
			],
			skills: ['3D Modeling', 'Parametric Design', 'Digital Fabrication', 'Rhino/Grasshopper', 'Blender', '3D Printing', 'Prototyping']
		}
	},
	{
		slug: 'prototype-sketches',
		title: 'Prototype sketches',
		description: 'Wireframes, prototypes, and sketches illustrating iterative design across companies.',
		year: 2019,
		category: 'creative',
		image: { src: '/images/projects/prototype-sketches/card.PNG', alt: 'Prototype sketches' },
		details: {
			synopsis: [
				"A curated set of wireframes, sketches, and mid-fidelity prototypes.",
				"Covers early flows through refined designs with rationale captured along the way."
			]
		}
	},
	{
		slug: 'ai-generated-video-art',
		title: 'AI generated video art',
		description: 'Video-based art experiments created with AI tooling and post-processing.',
		year: 2023,
		category: 'creative',
		image: { src: '/images/projects/ai-generated-video-art/card.PNG', alt: 'AI generated video art' },
		details: {
			synopsis: [
				"A set of AI-generated video explorations: motion, texture, and emergent composition.",
				"Heavily edited after initial generation to push toward desired aesthetic and rhythm."
			]
		}
	},
];

/** Resolve a project by canonical slug or legacy alias. */
export function findProject(slug: string): Project | undefined {
	return projects.find(
		(p) => p.slug === slug || p.aliases?.includes(slug)
	);
}

/** Media folder under public/images/projects for auto-gallery / asset discovery. */
export function projectMediaDir(project: Project): string {
	return project.mediaDir ?? project.slug;
}
