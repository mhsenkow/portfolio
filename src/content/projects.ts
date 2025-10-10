export type Project = {
	slug: string;
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
    sections?: {
      title: string;
      body?: string | string[];
      images?: { src: string; alt: string }[];
    }[];
  };
};

export const projects: Project[] = [
	{
		slug: 'apple-accessibility',
		title: 'Apple — Accessibility and internal tooling',
		description:
			'Product Designer in IS&T focusing on accessibility; login system, app bundle concepts, UX recommendations, prototyping and research.',
		year: 2012,
    featured: true,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/apple/' },
			{ label: 'App bundles', href: 'https://developer.apple.com/app-store/app-bundles/' },
		],
		image: { src: '/images/projects/ae/apple.png', alt: 'Apple' },
		stack: ['Accessibility', 'UX', 'Prototyping'],
		details: {
			role: 'Product Designer (intern)',
			entity: 'Apple — IS&T UX (internal software)',
			years: '2012; summer',
			headerImage: { src: '/images/projects/apple-accessibility/ipad_login_concept.png', alt: 'iPad login concept — flow map' },
			synopsis: [
				"Team make‑up: Group of designers situated in a heavy eng‑pm area of Apple; guidance from a manager but mostly me wrangling projects on my own with minimal guidance.",
				"My first professional experience in UX was with Apple’s IS&T (Information Systems & Technology) UX group, focusing on internal software. I worked across multiple efforts, with a primary focus on Accessibility — a passion that continues to influence my design work today.",
				"Apple’s design philosophy — meticulous attention to detail and a seamless user experience — stood out compared to later experiences at Microsoft, IBM, and Meta. I also joined a marketing team challenge around app bundles; our team ranked in the top three.",
				"Wireframes: Early work centered on quick, direct asks that needed concepts. One was an iPad login concept that needed an MVP UI. I followed my typical pattern: connect with stakeholders, locate available resources (at the time PDF-based design language assets), iterate on variations and states (including motion examples), and partner with engineering early to ensure feasibility.",
				"Accessibility: The internship’s main thrust became a deep focus on Accessibility in internal tooling. I audited existing software, leveled up on accessibility standards, and partnered with leads to recenter discussion around Universal Access — fixes that improve both edge cases and the in‑between states. This included prototypes to explore improved interactions and research with customers using assistive tech.",
				"End results: A set of thorough documentation artifacts left with IS&T — immediate recommendations across tools, coded interaction examples for accessibility, guidance for designers moving forward, and a touch of blue‑sky (e.g., making the login experience more enjoyable).",
				"Side contests: I also took part in two small concept projects (including app bundles) by interviewing across the company, finding missing interaction points, and producing visuals to sell the story. The ‘bushel’ concept presaged the App Store’s eventual App Bundle feature."
			],
			skills: ['Accessibility', 'UX/UI', 'Documentation', 'Prototyping', 'User research'],
			prototypes: [
				{ label: 'Login concept video', href: 'https://www.youtube.com/watch?v=Q4RT9MrK3F0&feature=youtu.be' }
			],
			sections: [
				{
					title: 'Wireframes',
					images: [
						{ src: '/images/projects/apple-accessibility/ipad_login_concept.png', alt: 'iPad login concept — flow map' }
					]
				},
				{
					title: 'Side contests',
					images: [
						{ src: '/images/projects/apple-accessibility/apple5.png', alt: 'Prototypes and interaction examples' },
						{ src: '/images/projects/apple-accessibility/apple7.png', alt: 'Accessibility field research — devices and setups' }
					]
				}
			]
		},
	},
	{
		slug: 'ibm-spss-modeler',
		title: 'IBM — Watson Analytics, Carbon System, and SPSS Modeler redesign',
		description:
			'Product Designer/Front‑end across Watson Analytics and Data Platform; SPSS Modeler redesign, AP design system, early Watson Analytics.',
		year: 2016,
    featured: true,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/redesign-of-spss-modeler/' },
      { label: 'Prototype 1 — Tooltip Exploration', href: 'https://codepen.io/mhsenkow/full/dXRwqW' },
      { label: 'Prototype 2 — Display of Specifics', href: 'https://codepen.io/mhsenkow/full/MjWGdP' },
      { label: 'Prototype 3 — NN highlight', href: 'https://codepen.io/mhsenkow/full/apwZxz' },
		],
		image: { src: '/images/projects/ae/SPSS.png', alt: 'SPSS Modeler redesign' },
    gallery: [],
		stack: ['IBM Design', 'Data Tools'],
		details: {
			role: 'Product Designer / Front‑end',
			entity: 'IBM Design',
      location: 'Austin, TX',
			years: '2016–2017',
			headerImage: { src: '/images/projects/ibm-spss-modeler/SPSS_Modeler.png', alt: 'SPSS Modeler overview' },
      synopsis: [
        'Team make-up: Collaborative work with engineers, PMs, and data scientists at IBM. Main design lead for this area of work. Management/leadership work w/ newer designers and cross-org communication.',
        'Overview: This set of work focused on the interaction and visual redesign of SPSS Modeler — data scientists can create flows to discover, prepare and blend data, develop and manage models, and visualize the results. No coding is required.',
        'Approach: Initial discovery and research; connect with stakeholders and cross-collaborators as visuals were made; confirm throughout and at the end with research and feedback mechanisms.',
        'Understanding the space: Determined the full corpus of charts to overhaul, cataloged usage, and interviewed users to uncover edge cases.',
        'Competitive audit: Looked across the field for must‑haves and “nice to haves”; discoveries included mini‑maps, deeper drill‑ins, and motion helping comprehension.',
        'Wireframes and prototypes: Shared wireframes with stakeholders and built coded prototypes to explore responsive behavior. Visual experimentation surfaced that users primarily sought the key number; later designs emphasized a clearer data‑input region.',
        'Finalization: Iterations converged to match and connect with the Analytics Platform design language. Built coded prototypes of specific interactions; worked closely with dev on edge cases (too few/too many values), tooltips, help states, and clarity affordances.',
        'Advanced work: Progressed to more advanced chart types (e.g., neural networks) and deeper interaction patterns. Predictor chart learnings informed brusher concepts to expose full value ranges adjacent to tables.',
        'Outcome: Patterns from this redesign still appear in product checks years later.'
      ],
      skills: ['UX', 'Front‑end', 'Design systems', 'Data viz'],
      prototypes: [
        { label: 'Prototype 1: Tooltip Exploration', href: 'https://codepen.io/mhsenkow/full/dXRwqW' },
        { label: 'Prototype 2: Display of Specifics in Motion', href: 'https://codepen.io/mhsenkow/full/MjWGdP' },
        { label: 'Prototype 3: Neural network diagram highlight example', href: 'https://codepen.io/mhsenkow/full/apwZxz' }
      ],
      sections: [
        {
          title: 'Wireframes and prototypes',
          images: [
            { src: '/images/projects/ibm-spss-modeler/SPSS1.jpg', alt: 'Wireframes and prototypes' },
            { src: '/images/projects/ibm-spss-modeler/SPSS6.jpg', alt: 'Wireframes and prototypes' },
            { src: '/images/projects/ibm-spss-modeler/SPSS13.jpg', alt: 'Wireframes and prototypes' }
          ]
        },
        {
          title: 'Finalization',
          images: [
            { src: '/images/projects/ibm-spss-modeler/SPSS15.jpg', alt: 'Finalization visuals' },
            { src: '/images/projects/ibm-spss-modeler/SPSS16.jpg', alt: 'Finalization visuals' },
            { src: '/images/projects/ibm-spss-modeler/SPSS24.jpg', alt: 'Finalization visuals' }
          ]
        },
        {
          title: 'Advanced work',
          images: [
            { src: '/images/projects/ibm-spss-modeler/SPSS18.jpg', alt: 'Advanced work visuals' },
            { src: '/images/projects/ibm-spss-modeler/SPSS27.jpg', alt: 'Advanced work visuals' },
            { src: '/images/projects/ibm-spss-modeler/SPSS28.jpg', alt: 'Advanced work visuals' },
            { src: '/images/projects/ibm-spss-modeler/02.png', alt: 'Advanced work visuals' }
          ]
        }
      ]
		},
	},
  
	{
		slug: 'meta-daiquery-bento-notebooks',
		title: 'Meta — Daiquery/Bento notebooks',
		description:
			'SQL and Python notebook creation and consolidation; data‑viz framework work; AI‑infographic hack project and augmented data workflows.',
		year: 2022,
    featured: true,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/daiquery-notebooks-creation-then-merging-with-bento-notebooks/' },
		],
		image: { src: '/images/projects/ae/notebooks.png', alt: 'Notebooks and data workflows' },
		gallery: [
		
		],
		stack: ['Meta', 'Notebooks', 'AI'],
		details: {
      role: 'Product Designer',
			entity: 'Meta',
			years: '2020–2023',
      team: 'Collaborated with engineers, PMs, and other designers.',
			headerImage: { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-12-00.png', alt: 'Da(i)query notebook — SQL cells' },
      synopsis: [
        'Focus: SQL notebooks work with outcomes that informed Meta AI image creation flows.',
        'I spearheaded the initial creation and development of Daiquery notebooks, a concept involving a series of merged SQL query cells designed to enhance data analysis workflows. This approach allowed users to run and visualize SQL queries within a single interface, improving efficiency and usability.',
        'This work laid the foundation for integrating these features with Bento notebooks, creating a cohesive and powerful data analysis tool. The merger involved extensive collaboration with engineers and PMs to harmonize functionality and provide a seamless user experience.',
        'Throughout the project, I focused on both the interaction and visual design aspects, ensuring the notebooks were not only functional but also intuitive and visually appealing. Contributions included designing prototypes, conducting user research, and iterating on feedback to refine the final product.',
        'Team dynamics: Worked closely with engineers to determine and implement the initial functionality around grouped cells. Presented and connected across the org to get the concept moving, and partnered with other designers to maintain consistency and enhance the user interface between this product space and others.'
      ],
      skills: ['UX Design', 'Interaction Design', 'Visual Design', 'Prototyping', 'User Research', 'SQL', 'Python'],
      sections: [
        {
          title: 'Initial creation of daiquery notebooks, a collection of SQL cells for various reasons',
          body: [
            'The initial goals were focused around the creation of a SQL cell‑based notebook as a way to better connect complex queries for storage and understanding by Data Scientist / Data Eng / Software Eng users.',
            'Work began with discovering everyday problems across the org: connecting for feedback over workplace groups, interviewing users around their issues, and understanding the product and similar ones in the field.',
            "‘Cells’ became a major focus for the next few years, with new types added, visual treatment shifting to accommodate additions, and comparisons with analogous notebooks outside the company."
          ],
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2025-05-01-08-33-40.png', alt: 'Deck slide — unified notebooks story' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2025-09-09-11-59-40.png', alt: 'Notebook exploration overview' }
          ]
        },
        {
          title: 'discovery of common feature sets with nearby applications',
          body: [
            'As the product expanded, we discovered commonalities with other infra product spaces. We were an SQL notebook, but there was already a Python‑based notebook with similar features (Bento).',
            'Daiquery came with a file cell while Bento had a file panel; this shifted discussions across the product: structure of cells, interactions around them, and where functionality should live (panel vs. cell).'
          ],
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-12-00.png', alt: 'SQL cells exploration 1' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-13-50.png', alt: 'SQL cells exploration 2' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-13-58.png', alt: 'SQL cells exploration 3' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-14-12.png', alt: 'SQL cells exploration 4' }
          ]
        },
        {
          title: 'expansion into additional application concepts',
          body: [
            'Early cross‑functional discussions (PM/ENG/DS) explored areas missing from both products that could benefit the workflow: an expandable plug‑in/app store, education, sharing, and more.'
          ],
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-15-59.png', alt: 'Exploration — app store and extensions' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-16-10.png', alt: 'Exploration — education concepts' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-16-40.png', alt: 'Exploration — sharing patterns' }
          ]
        },
        {
          title: 'crafting and selling the org on a universal shared notebook',
          body: [
            'These explorations evolved into final prototypes and a narrative that connected groups and planning for the next half, arguing for a universal shared notebook direction.'
          ],
          images: [
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-30-16-22-42.png', alt: 'Story deck — shared notebook direction' },
            { src: '/images/projects/meta-daiquery-bento-notebooks/screenshot-2024-05-31-11-08-38.png', alt: 'Story deck — flows and components' }
          ]
        },
        {
          title: 'company changes, shift of focus while continuing to support users',
          body: [
            'Org shifts reduced scope; broader education/documentation goals were deferred. Focus returned to the technical audience while continuing to support users.',
            'Users also used notebooks for notes, which informed a workflow to upgrade text cells toward a more doc‑like cell type.'
          ]
        },
        {
          title: 'ai as a chatbot vs ai as a static cell type',
          body: [
            'AI entered almost every discussion: surfacing join recommendations or related data objects for SQL/Python users.',
            'Explored whether users preferred in‑situ recommendations vs. a helpful bot, and whether they wanted to compare results or have code produce results and move on.'
          ]
        }
      ]
		},
	},
	{
		slug: 'contracts-2024-2025',
		title: 'Contracts — 2024–2025',
		description:
			'AI Law notebooks and recommendation bot, Finance recommendation notebook, Imagen‑node app work, Data Suite concepts, Windows Cloud errors.',
		year: 2025,
    featured: true,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/contracts-across-roles/' },
		],
    image: { src: '/images/projects/ae/Pie chart.png', alt: 'AI infographic pie chart' },
		stack: ['AI', 'Prototyping'],
		details: {
			role: 'Product Designer',
				entity: 'Supio, Microsoft Cloud, Mars Data Suite; supporting ComfyUI / Pincites / Zeplyn / Peopled',
				location: 'Seattle / remote / in person',
				years: '2024–2025',
				team: 'Mixture across places; similar set‑ups as prior roles. Preference for GitHub/Google ecosystems when relevant.',
				synopsis: [
					"Team make‑up: Mixture across places; similar set‑ups to what I’ve done before. Learned I prefer GitHub / Google land when it matters.",
					"Similar patterns: Many start‑ups with secure localized data sources connecting to chat or ‘diagram’ sessions — Legal, Finance, Images, HR, and general Data.",
					"Processes: Helped teams get set up in Figma, explored blue‑sky directions, and aligned on broader framework choices.",
					"Patterns for Peopled: Built a coded prototype alongside a wider Figma system to validate patterns quickly.",
					"Windows App Interstitials: Error flows and selection updates; studied interstitial states and recovery patterns.",
					"Board sample: A snapshot of exploration — part of the effort was surveying the space to see what existed and what resonated.",
					"Mars Data Suite work: Foundation explorations toward a data suite — brand, UX flows, early component framing."
				],
				skills: ['Brand', 'UX', 'Wireframing', 'Prototyping', 'Components', 'AI workflows'],
				sections: [
					{
						title: 'Similar patterns',
						body: [
							'Secure, localized data → chat/diagram sessions.',
							'Domains: Legal, Finance, Images, HR, general Data.'
						]
					},
					{
						title: 'Processes',
						body: [
							'Stand up Figma, establish exploration cadence.',
							'Blue‑sky map, converge on frameworks and reusable patterns.'
						]
					},
					{
						title: 'Patterns for Peopled',
						body: [
							'Coded prototype to complement the Figma system.',
							'Validated interaction details and component seams early.'
						]
					},
					{
						title: 'Windows App Interstitials',
						body: [
							'Error and selection interstitials; emphasis on clarity and recovery.',
							'Samples from interstitials work and option evaluation.'
						],
						images: [
							{ src: '/images/projects/contracts-2024-2025/windows-interstitial-1.png', alt: 'Windows app interstitial — error state' },
							{ src: '/images/projects/contracts-2024-2025/windows-interstitial-2.png', alt: 'Windows app interstitial — selection update' }
						]
					},
					{
						title: 'Board sample',
						body: [
							'Exploration board used to survey patterns and options before narrowing.'
						],
						images: [
							{ src: '/images/projects/contracts-2024-2025/board-1.png', alt: 'Exploration board sample 1' },
							{ src: '/images/projects/contracts-2024-2025/board-2.png', alt: 'Exploration board sample 2' },
							{ src: '/images/projects/contracts-2024-2025/board-3.png', alt: 'Exploration board sample 3' },
							{ src: '/images/projects/contracts-2024-2025/board-4.png', alt: 'Exploration board sample 4' },
							{ src: '/images/projects/contracts-2024-2025/board-5.png', alt: 'Exploration board sample 5' }
						]
					},
					{
						title: 'Mars Data Suite work',
						body: [
							'Explorations toward a data suite basis: brand, UX flows, early components.'
						]
					}
				]
		},
	},
  {
    slug: 'mars-inc-data-suite',
    title: 'Mars Inc — building a data suite basis',
    description:
      'Product design and prototyping toward a data suite foundation; brand, UX, component system and workflows.',
    year: 2024,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences' },
    ],
    image: { src: '/images/projects/ae/Supio.png', alt: 'Mars Inc data suite basis' },
    stack: ['Product design', 'Data suite', 'Components'],
    details: {
      role: 'Product Designer',
      entity: 'Mars Inc (contracts)',
      years: '2024–2025',
      synopsis:
        'Explorations and foundation work for a data suite: brand, UX flows, early component system and prototypes.'
    }
  },
  {
    slug: 're-envisioning-my-primary-product',
    title: 'Re-envisioning my primary product',
    description: 'Design system improvements and interaction ownership for MyAnalytics/Workplace Analytics; led across team shifts.',
    year: 2018,
    featured: true,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/re-envisioning-my-primary-product/' },
    ],
    image: { src: '/images/projects/ae/Redsign.png', alt: 'Re-envisioning core product' },
    stack: ['Microsoft', 'Design System', 'Product'],
    details: {
      role: 'Primary Designer for Interactions',
      entity: 'Microsoft',
      location: 'Redmond, WA (MyAnalytics – Workplace Analytics team)',
      years: '2018',
      team: 'Initially worked with a design lead and another FTE designer. Later became the sole FTE designer in the US, leading 4 contractors and remote FTE designers in India. Eventually helped onboard and support a new manager and additional FTE designers.',
      headerImage: { src: '/images/projects/re-envisioning-my-primary-product/design-system-update.png', alt: 'Design system update overview' },
      synopsis: [
        'Alongside other IC work, I spearheaded the design and implementation of an improved design system now utilized by the sister products MyAnalytics and Workplace Analytics. This initiative involved conducting stakeholder interviews, performing internal research, and extensive visual design work. Engaging in numerous discussions with PMs and engineers, I emphasized the importance of this process and ensured its successful adoption.',
        'Starting with a small team, I led the design efforts through various team changes, becoming the de-facto design lead. My role evolved to manage multiple contractors and remote designers, culminating in onboarding a new manager and additional FTE designers. I ensured they were well-integrated and organized with the existing design files and systems.'
      ],
      skills: ['Stakeholder Interviews', 'Internal Research', 'Visual Design', 'Advocacy and Collaboration with PMs and Engineers', 'Team Leadership'],
      sections: [
        {
          title: 'Understanding what existed',
          body: 'Documented the existing design patterns and identified inconsistencies across the product suite.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/prior-system.png', alt: 'Prior system documentation' },
            { src: '/images/projects/re-envisioning-my-primary-product/what-existed-here.png', alt: 'What existed — component inventory' }
          ]
        },
        {
          title: 'Design system foundation',
          body: 'Established core design principles, color systems, and foundational components to ensure consistency.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/wpa-color-copy.png', alt: 'Workplace Analytics color system' },
            { src: '/images/projects/re-envisioning-my-primary-product/refined-palette.png', alt: 'Refined color palette' },
            { src: '/images/projects/re-envisioning-my-primary-product/text-usage.png', alt: 'Text usage guidelines' }
          ]
        },
        {
          title: 'Component library development',
          body: 'Designed and documented reusable components including buttons, dropdowns, and toggles.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/buttons.png', alt: 'Button component specifications' },
            { src: '/images/projects/re-envisioning-my-primary-product/buttons-copy.png', alt: 'Button variants and states' },
            { src: '/images/projects/re-envisioning-my-primary-product/drop-downs.png', alt: 'Dropdown component specs' },
            { src: '/images/projects/re-envisioning-my-primary-product/toggles.png', alt: 'Toggle component specifications' }
          ]
        },
        {
          title: 'Layout system iterations',
          body: 'Developed flexible layout patterns and grid systems for consistent page structures across products.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.5.png', alt: 'Layout iteration 4.5' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.13.png', alt: 'Layout iteration 4.13' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.14.png', alt: 'Layout iteration 4.14' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.16.png', alt: 'Layout iteration 4.16' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.17.png', alt: 'Layout iteration 4.17' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.18.png', alt: 'Layout iteration 4.18' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.27.png', alt: 'Layout iteration 4.27' },
            { src: '/images/projects/re-envisioning-my-primary-product/layout-4.29.png', alt: 'Layout iteration 4.29' }
          ]
        },
        {
          title: 'Implementation and validation',
          body: 'Tested the design system in production contexts, gathered feedback, and refined patterns based on real-world usage.',
          images: [
            { src: '/images/projects/re-envisioning-my-primary-product/screenshot-4.45.20-pm.png', alt: 'Implementation example 1' },
            { src: '/images/projects/re-envisioning-my-primary-product/screenshot-4.45.31-pm.png', alt: 'Implementation example 2' },
            { src: '/images/projects/re-envisioning-my-primary-product/screenshot-4.45.40-pm.png', alt: 'Implementation example 3' },
            { src: '/images/projects/re-envisioning-my-primary-product/experiment.png', alt: 'Experimental features' },
            { src: '/images/projects/re-envisioning-my-primary-product/screenshot-5.06.55-pm.png', alt: 'Final implementation' }
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
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences' },
    ],
    image: { src: '/images/projects/ae/Infographic.png', alt: 'Windows Cloud peripherals' },
    stack: ['Windows Cloud', 'Concepts'],
    details: {
      role: 'Product Designer',
      entity: 'Microsoft (contracts)',
      years: '2024–2025',
      synopsis:
        'Flows and UI concepts around updating peripherals in cloud‑managed environments; focused on clarity of status and recovery.'
    }
  },
  {
    slug: 'teams-admin-center',
    title: 'Teams admin center',
    description: 'Wireframes and concepts around backend tooling for communications; quick iterations near end of Microsoft tenure.',
    year: 2019,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/teams-admin-center/' },
    ],
    image: { src: '/images/projects/ae/Teams.png', alt: 'Teams admin center' },
    stack: ['Microsoft', 'Admin'],
    details: {
      role: 'Product Designer / Design lead',
      entity: 'Microsoft',
      location: 'Seattle, WA',
      years: '2019',
      synopsis:
        'Quick wireframes and concepts for the back‑end tooling behind public communications tools; lesson in org transitions.',
      skills: ['Wireframing', 'Prototyping', 'Admin UX']
    }
  },
  {
    slug: 'researching-silence',
    title: 'Researching silence',
    description: 'Study for "Silence Mode" across Office; London and Paris client visits, rapid iteration into today\'s focus time concepts.',
    year: 2018,
    featured: true,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/researching-silence/' },
    ],
    image: { src: '/images/projects/ae/Silence Mode.png', alt: 'Silence mode research' },
    gallery: [
      { src: '/images/projects/researching-silence/screenshot-11.36.21-am.png', alt: 'Early silence mode concepts' },
      { src: '/images/projects/researching-silence/screenshot2-11.36.21-am.png', alt: 'Silence mode wireframes' },
      { src: '/images/projects/researching-silence/screenshot-12.15.11-pm.png', alt: 'Focus time interface' },
      { src: '/images/projects/researching-silence/screenshot-12.31.18-pm.jpg', alt: 'Client feedback session' },
      { src: '/images/projects/researching-silence/screenshot-12.32.35-pm.png', alt: 'Iteration during trip' },
      { src: '/images/projects/researching-silence/screenshot-1.04.30-pm.png', alt: 'Design refinements' },
      { src: '/images/projects/researching-silence/screenshot-2.55.22-pm.png', alt: 'Concept explorations' },
      { src: '/images/projects/researching-silence/screenshot-3.14.04-pm.png', alt: 'Final proposal design' },
      { src: '/images/projects/researching-silence/focus.png', alt: 'Focus time final concept' }
    ],
    stack: ['Microsoft', 'Research', 'UX'],
    details: {
      role: 'User Experience Designer/Researcher',
      entity: 'Microsoft — Office Suite',
      location: 'London, Paris, and Redmond, WA',
      years: '2018',
      team: 'Collaborated with a principal researcher, a senior designer, a fellow designer, multiple PMs, and engineers.',
      headerImage: { src: '/images/projects/researching-silence/focus-widget-interface.png', alt: 'Focus time widget interface' },
      synopsis: [
        'In a collaborative study focused on developing a "Silence Mode" for the Office suite, I worked alongside a principal researcher, a senior designer, and a fellow designer. We visited 8 clients in London and Paris, iterating on designs based on real-time feedback and insights gathered during the trip. This hands-on approach allowed us to refine our concepts continuously.',
        'The project concluded with a comprehensive proposal, which has since evolved into the current focus time concepts within the Office suite. My role involved conducting in-person interviews, rapid design conception, and prototyping. Upon returning to the States, I also played a crucial role in aligning stakeholders and ensuring the project\'s objectives were met.'
      ],
      skills: ['In-Person Interviews', 'Quick Design Conception', 'Prototyping', 'Stakeholder Management', 'User Research'],
      sections: [
        {
          title: 'Client research and rapid iteration',
          body: 'Visited 8 clients across London and Paris, conducting in-person interviews and iterating on designs based on real-time feedback during the trip.',
          images: [
            { src: '/images/projects/researching-silence/screenshot-11.36.21-am.png', alt: 'Early silence mode concepts' },
            { src: '/images/projects/researching-silence/screenshot2-11.36.21-am.png', alt: 'Initial wireframes' },
            { src: '/images/projects/researching-silence/screenshot-12.31.18-pm.jpg', alt: 'Client feedback session documentation' }
          ]
        },
        {
          title: 'Design iteration and refinement',
          body: 'Rapidly iterated on concepts during the research trip, refining the silence mode features based on user insights and needs.',
          images: [
            { src: '/images/projects/researching-silence/screenshot-12.32.35-pm.png', alt: 'Iteration during client visits' },
            { src: '/images/projects/researching-silence/screenshot-1.04.30-pm.png', alt: 'Design refinements' },
            { src: '/images/projects/researching-silence/screenshot-2.55.22-pm.png', alt: 'Concept explorations' }
          ]
        },
        {
          title: 'Final proposal and stakeholder alignment',
          body: 'Developed comprehensive proposal that evolved into current focus time concepts in Office. Led stakeholder alignment upon returning to the US.',
          images: [
            { src: '/images/projects/researching-silence/screenshot-12.15.11-pm.png', alt: 'Focus time interface proposal' },
            { src: '/images/projects/researching-silence/screenshot-3.14.04-pm.png', alt: 'Final proposal design' },
            { src: '/images/projects/researching-silence/focus.png', alt: 'Focus time final concept' }
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
    featured: true,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/keyword-analysis-redesign/' },
    ],
    image: { src: '/images/projects/ae/Topic Selection (1).png', alt: 'Topic selection' },
    stack: ['Microsoft', 'Analytics'],
    details: {
      role: 'Product Designer — expansion of design system, mentoring',
      entity: 'Microsoft',
      location: 'Redmond, WA',
			years: '2017–2020',
      team: 'With this area, one main PM and one main Engineer were involved. My role evolved from consulting with a contracting designer, to primary designer and expansion of my design system into this space.',
			headerImage: { src: '/images/projects/topic-keyword-analysis/topics_list_page.png', alt: 'Topics list page' },
      synopsis: [
        'Synopsis: Many of the projects I worked on for Workplace Analytics were extensive and ongoing. For this particular project, which focused on the topic keyword analysis section of the app, I took over a struggling initiative and transformed it into a success. Initially joining as a design lead, I provided direction to a contractor and then took over the redesign efforts as the project parameters changed. This study took place at the same time as expansion of the design system I’d been fleshing out and provided a good space to view this in.',
        'Initial set of designs: Working as the design‑lead/consultant for first implementation — ensured the contractor’s work matched component system constraints, fit PM/Engineering needs, and addressed interaction issues found in research.',
        'Push for integration: Took preliminary designs and updated them for another section (Meeting exclusion keyword selection) in conjunction with PM/Engineering, pushing interaction implementation through.',
        'Learnings: Too many steps left users unsure of progress; users wanted to see all steps in one place without scrolling. Goal shifted toward a tool feel rather than a linear wizard.',
        'Multiple layout iterations and user testing to move to a more dense design: Provided options emphasizing a denser layout, table focus, and clearer placement of keyword selection; iterated based on feedback and sizing.',
        'Final flow and specifics for responsive layout: Consolidated steps into a single screen, reduced superfluous data‑viz, and documented responsive behavior across sections. Template selection aligned with broader application patterns for component reuse.',
        'Outcome: A mild visual redesign integrated into the larger design framework; patterns moved the app toward a cohesive tool experience and were adopted by the team after transition.'
      ],
      skills: ['UX Design', 'Visual Design', 'Mentoring', 'Background in Analytics', 'Tool Creation'],
      sections: [
        {
          title: 'Initial set of designs',
          body: 'Working as the design-lead/consultant for first implementation — ensured the contractor\'s work matched component system constraints, fit PM/Engineering needs, and addressed interaction issues found in research.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/first_wireframe.png', alt: 'Earliest wireframe of topic selection process' },
            { src: '/images/projects/topic-keyword-analysis/topics_list_page.png', alt: 'Topics list page' },
            { src: '/images/projects/topic-keyword-analysis/topics-list-page-1.png', alt: 'Topics list page variant 1' },
            { src: '/images/projects/topic-keyword-analysis/topics-list-page-2.png', alt: 'Topics list page variant 2' }
          ]
        },
        {
          title: 'Push for integration with Meeting Exclusions',
          body: 'Took preliminary designs and updated them for another section (Meeting exclusion keyword selection) in conjunction with PM/Engineering, pushing interaction implementation through.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/meeting-exclusion-overflow-2x.png', alt: 'Meeting exclusion overflow menu' },
            { src: '/images/projects/topic-keyword-analysis/draft-saved-2x.png', alt: 'Save as draft — saved state' },
            { src: '/images/projects/topic-keyword-analysis/blank-filename-error-2x.png', alt: 'Blank file name error state' },
            { src: '/images/projects/topic-keyword-analysis/exclusion-save-failure-2x.png', alt: 'Save failure warning' }
          ]
        },
        {
          title: 'Learnings from initial implementation',
          body: 'Too many steps left users unsure of progress; users wanted to see all steps in one place without scrolling. Goal shifted toward a tool feel rather than a linear wizard.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/old-step-1.png', alt: 'Original step 1 — select topic' },
            { src: '/images/projects/topic-keyword-analysis/old-step-2.png', alt: 'Original step 2 — configure' },
            { src: '/images/projects/topic-keyword-analysis/old-step-3.png', alt: 'Original step 3 — add keywords' },
            { src: '/images/projects/topic-keyword-analysis/old-step-4.png', alt: 'Original step 4 — review' },
            { src: '/images/projects/topic-keyword-analysis/old-step-5.png', alt: 'Original step 5 — exclusions' },
            { src: '/images/projects/topic-keyword-analysis/old-step-6.png', alt: 'Original step 6 — finalize' },
            { src: '/images/projects/topic-keyword-analysis/old-step-7.png', alt: 'Original step 7 — save' },
            { src: '/images/projects/topic-keyword-analysis/old-step-8.png', alt: 'Original step 8 — additional options' },
            { src: '/images/projects/topic-keyword-analysis/old-step-9.png', alt: 'Original step 9 — preview' },
            { src: '/images/projects/topic-keyword-analysis/old-step-10.png', alt: 'Original step 10 — advanced settings' },
            { src: '/images/projects/topic-keyword-analysis/old-step-11.png', alt: 'Original step 11 — confirmation' },
            { src: '/images/projects/topic-keyword-analysis/old-step-12.png', alt: 'Original step 12 — complete' },
            { src: '/images/projects/topic-keyword-analysis/old-step-13.png', alt: 'Original step 13 — summary' },
            { src: '/images/projects/topic-keyword-analysis/old-step-13-responsive.png', alt: 'Original step 13 — responsive layout' }
          ]
        },
        {
          title: 'Multiple layout iterations',
          body: 'Provided options emphasizing a denser layout, table focus, and clearer placement of keyword selection; iterated based on feedback and sizing.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5.png', alt: 'Iteration 1.5 — initial dense layout' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-1.png', alt: 'Iteration 1.5-1 — table focus' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-2.png', alt: 'Iteration 1.5-2 — keyword placement' },
            { src: '/images/projects/topic-keyword-analysis/iteration-1.5-3.png', alt: 'Iteration 1.5-3 — refined layout' },
            { src: '/images/projects/topic-keyword-analysis/option-1.png', alt: 'Layout option 1' },
            { src: '/images/projects/topic-keyword-analysis/option-2.png', alt: 'Layout option 2' },
            { src: '/images/projects/topic-keyword-analysis/option-2.1.png', alt: 'Layout option 2.1 — variant' },
            { src: '/images/projects/topic-keyword-analysis/option-3.png', alt: 'Layout option 3' },
            { src: '/images/projects/topic-keyword-analysis/option-4.png', alt: 'Layout option 4' },
            { src: '/images/projects/topic-keyword-analysis/option-4.1.png', alt: 'Layout option 4.1 — variant' },
            { src: '/images/projects/topic-keyword-analysis/option-5.png', alt: 'Layout option 5' },
            { src: '/images/projects/topic-keyword-analysis/option-5.1.png', alt: 'Layout option 5.1 — variant' }
          ]
        },
        {
          title: 'Final flow and specifics for responsive layout',
          body: 'Consolidated steps into a single screen, reduced superfluous data-viz, and documented responsive behavior across sections. Template selection aligned with broader application patterns for component reuse.',
          images: [
            { src: '/images/projects/topic-keyword-analysis/home-2x.png', alt: 'Template home' },
            { src: '/images/projects/topic-keyword-analysis/more-templates-2x.png', alt: 'More templates' },
            { src: '/images/projects/topic-keyword-analysis/new-topics-2x.png', alt: 'New topics' },
            { src: '/images/projects/topic-keyword-analysis/start-1-2x.png', alt: 'Start step' },
            { src: '/images/projects/topic-keyword-analysis/step-2-make-exception-2x.png', alt: 'Step 2 — make an exception' },
            { src: '/images/projects/topic-keyword-analysis/keyword-details-table-2x.png', alt: 'Keyword details table' },
            { src: '/images/projects/topic-keyword-analysis/step-2-add-to-keyword-list-2x.png', alt: 'Step 2 — add to keyword list' },
            { src: '/images/projects/topic-keyword-analysis/step-4-enter-keyword-2x.png', alt: 'Step 4 — enter a keyword' },
            { src: '/images/projects/topic-keyword-analysis/strat-2-keyword-hover-2x.png', alt: 'Strategy 2 — keyword hover' },
            { src: '/images/projects/topic-keyword-analysis/two-selected-2x.png', alt: 'Two selected keywords' }
          ]
        }
      ]
    },
  },
  {
    slug: 'navigation-update-component-system',
    title: 'Navigation update → better component system',
    description: 'Comparison analysis, UX wireframes, and coded prototypes leading to improved component system.',
    year: 2019,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/navigation-update-leads-to-better-component-system/' },
    ],
    image: { src: '/images/projects/ae/Redsign.png', alt: 'Navigation/component redesign' },
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
        'During a transition period, I became the de-facto Design Lead for our Seattle group after the main design lead left. I managed contractors and remote designers while keeping work aligned.',
        'For this project I led comparison analysis, UX wireframing, and coded prototypes to push the navigation update that ultimately informed a better component system.',
        'Work centered on bringing consistency, simplifying choices, and producing concrete, coded examples that helped engineering validate edge cases and implementation details.'
      ],
      skills: [
        'UX Design',
        'Visual Design',
        'Wireframing',
        'Coded & Figma Prototyping',
        'Stakeholder Interviews',
        'User Research',
        'Component Systems'
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
            { src: '/images/projects/navigation-update-component-system/screenshot-2.29.58-pm.png', alt: 'Comparison of navigation options' }
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
            { src: '/images/projects/navigation-update-component-system/screenshot-3.00.28-pm.png', alt: 'Wireframe explorations' },
            { src: '/images/projects/navigation-update-component-system/screenshot-3.27.04-pm.png', alt: 'Prototype iterations' },
            { src: '/images/projects/navigation-update-component-system/screenshot-3.35.56-pm.png', alt: 'Interactive prototype 1' },
            { src: '/images/projects/navigation-update-component-system/screenshot-3.36.27-pm.png', alt: 'Interactive prototype 2' }
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
    title: 'Workplace Analytics — programs & nudges',
    description: 'Bridge between Workplace Analytics and MyAnalytics via programs; multi‑year design leadership and systemization.',
    year: 2018,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/programs-bridge-between-products/' },
    ],
    image: { src: '/images/projects/ae/Redsign (1).png', alt: 'Programs' },
    gallery: [
      { src: '/images/projects/ae/Redsign (1).png', alt: 'Programs visuals' }
    ],
    stack: ['Microsoft', 'Behavioral'],
    details: {
      role: 'Product Designer / Design Lead',
      entity: 'Microsoft',
      years: '2017–2019',
      synopsis:
        'Integrated Workplace Analytics and MyAnalytics via programs. Managed contractors and remote designers; later onboarded new manager and FTEs while systemizing design work.',
      skills: ['Design leadership', 'Systemization']
    }
  },
  {
    slug: 'improving-work-life-balance',
    title: 'Improving your work life balance within Office 365',
    description: 'Evolving MyAnalytics from analytics tool to self-help platform; metrics redesign, animations, and sharing.',
    year: 2018,
    featured: true,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/improving-your-work-life-balance-within-office-365/' },
    ],
    image: { src: '/images/projects/ae/Data-Viz.png', alt: 'MyAnalytics top four metrics' },
    stack: ['Microsoft', 'Product', 'Animation'],
    details: {
      role: 'Designer 2 (UX with prototyping and Front-End collaboration)',
      entity: 'Microsoft — MyAnalytics',
      years: 'Early 2017 – 2018',
      headerImage: { src: '/images/projects/improving-work-life-balance/top-four.png', alt: 'Top four metrics redesign' },
      synopsis: [
        'MyAnalytics leverages the analytics of Office365 to provide users with insights into how they spend their time across meetings, emails, and focus time. The goal is to help users better navigate and manage their schedules. Since joining the team, I\'ve been instrumental in evolving MyAnalytics from a straightforward analytics tool into a self-help tool.',
        'My contributions focused on making data more accessible and actionable through intuitive design, animations, and comprehensive onboarding experiences. I worked closely with front-end developers to bring these designs to life, while diplomatically navigating through multiple iterations with PMs and stakeholders.'
      ],
      skills: ['UX Design', 'Prototyping', 'Front-End Development', 'Animation Design', 'Diplomacy in Design Iterations', 'Process Improvement'],
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
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/trusted-news-ai-chrome-extension/' },
      { label: 'Final prototype', href: 'https://codepen.io/mhsenkow/full/xvVGWj' },
    ],
    image: { src: '/images/projects/ae/TrustedNews (1).png', alt: 'Trusted News' },
    gallery: [
      { src: '/images/projects/trusted-news-chrome-extension/final-layout.png', alt: 'Final layout, displaying the regions of the extension' },
      { src: '/images/projects/trusted-news-chrome-extension/screenshot-1.png', alt: 'Extension screenshot 1' },
      { src: '/images/projects/trusted-news-chrome-extension/screenshot-2.png', alt: 'Extension screenshot 2' },
      { src: '/images/projects/trusted-news-chrome-extension/image-asset.png', alt: 'Extension UI detail' },
      { src: '/images/projects/trusted-news-chrome-extension/screenshot-3.png', alt: 'Extension screenshot 3' }
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
      skills: ['Quick Visual Experimentation', 'Front-End Coding', 'UX Design', 'Visual Design'],
      prototypes: [
        { label: 'Final set of design and front-end code', href: 'https://codepen.io/mhsenkow/full/xvVGWj' }
      ]
    }
  },
  {
    slug: 'data-viz-framework-meta',
    title: 'Meta infra — data viz framework & AI‑infographics',
    description: 'Data visualization framework efforts in Vega; guidance, examples, and AI‑infographic explorations.',
    year: 2022,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/meta-infra-data-viz-framework-and-ai-infographics/' },
    ],
    image: { src: '/images/projects/ae/Pie chart.png', alt: 'Data viz framework' },
    gallery: [
      { src: '/images/projects/data-viz-framework-meta/Axis_and_Legend.png', alt: 'Axis and Legend' },
      { src: '/images/projects/data-viz-framework-meta/Line_Chart.png', alt: 'Line Chart' },
      { src: '/images/projects/data-viz-framework-meta/Line_Chart_(1).png', alt: 'Line Chart variant' },
      { src: '/images/projects/data-viz-framework-meta/Slope_Chart.png', alt: 'Slope Chart' },
      { src: '/images/projects/data-viz-framework-meta/Barbell_Chart.png', alt: 'Barbell Chart' },
      { src: '/images/projects/data-viz-framework-meta/Funnel_Chart.png', alt: 'Funnel Chart' },
      { src: '/images/projects/data-viz-framework-meta/Bullet_Chart.png', alt: 'Bullet Chart' },
      { src: '/images/projects/data-viz-framework-meta/Box_Plot.png', alt: 'Box Plot' },
      { src: '/images/projects/data-viz-framework-meta/Parallel_Coordinates.png', alt: 'Parallel Coordinates' },
      { src: '/images/projects/data-viz-framework-meta/Scatter_Plot.png', alt: 'Scatter Plot' },
      { src: '/images/projects/data-viz-framework-meta/Axis_and_Legend_(1).png', alt: 'Axis and Legend variant' },
      { src: '/images/projects/data-viz-framework-meta/image_115.png', alt: 'Data visualization example' },
      { src: '/images/projects/data-viz-framework-meta/Group_625888.png', alt: 'Chart group' },
      { src: '/images/projects/data-viz-framework-meta/Colors.png', alt: 'Color palette' },
      { src: '/images/projects/data-viz-framework-meta/All_Palettes.png', alt: 'All color palettes' },
      { src: '/images/projects/data-viz-framework-meta/Presentation.png', alt: 'Presentation' },
      { src: '/images/projects/data-viz-framework-meta/Concept.png', alt: 'Concept design' }
    ],
    stack: ['Meta', 'Vega', 'Data Viz'],
    details: {
      role: 'Product Designer',
      entity: 'Meta',
      location: 'Seattle but with talks in MPK, London and Tel-aviv',
      years: '2022–2023',
      team: 'The team consisted of myself, a main front-end developer, a main PM, 5-8 engineers involved in training, additional engineers brought in for related work, and a researcher helping confirm the results.',
      headerEmbed: { 
        html: '<iframe src="https://www.slideshare.net/slideshow/embed_code/key/q3WcAhjVafouPW" width="610" height="515" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border: var(--border-1) solid #CCC; border-width:1px; margin-bottom:5px; max-width:100%;" allowfullscreen></iframe>',
        title: 'AI-Imagen for Data Storytelling Infographics',
        link: 'https://www.slideshare.net/slideshow/ai-imagen-for-data-storytelling-infographics-pdf/268972473'
      },
      synopsis: [
        'Over the past two years, I led a significant project at Meta focused on creating a Data Visualization framework for Meta Infra. As a Product Designer, I was instrumental in also coding prototypes using Vega, an open-source visualization grammar, to flesh out what our visual capabilities and options were.',
        'I championed the need for structured guidance in this area, overseeing the visuals, documentation, and prototypes. My responsibilities included working closely with engineering in Vega to develop coded examples of various chart types and ensure their implementation met our high standards.',
        'Collaborating with a front-end developer, the main PM, and a team of engineers, I pushed for innovative and intuitive solutions that elevated our data visualization capabilities. Additionally, I worked with a researcher to validate our results, ensuring the framework was both effective and user-friendly.',
        'This work was integrated alongside the design system I was building out, ensuring consistency and coherence across the platform.'
      ],
      skills: ['UX Design', 'Visual Design', 'Prototyping (Vega)', 'Documentation', 'Collaboration with PMs and Engineers', 'Research Validation']
    }
  },
  {
    slug: 'design-guide-thousands-users',
    title: 'The creation of a design guide used across thousands of users',
    description: 'IBM Watson Data Platform guide; coded components with dev lead, integrated across products.',
    year: 2017,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/the-creation-of-a-design-guide-used-across-thousands-of-users/' },
    ],
    image: { src: '/images/projects/ae/DesignGuide.png', alt: 'Design guide' },
    gallery: [
      { src: '/images/projects/design-guide-thousands-users/screenshot-01.png', alt: 'Design guide component examples' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-02.png', alt: 'Component documentation' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-03.png', alt: 'Visual design system' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-04.png', alt: 'Component specifications' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-05.png', alt: 'Design patterns' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-06.png', alt: 'Component library' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-07.png', alt: 'Implementation examples' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-08.png', alt: 'Component variations' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-09.png', alt: 'Design guide overview' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-10.png', alt: 'Component interactions' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-11.png', alt: 'System architecture' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-12.png', alt: 'Usage guidelines' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-13.png', alt: 'Component details' },
      { src: '/images/projects/design-guide-thousands-users/screenshot-14.png', alt: 'Final implementation' }
    ],
    stack: ['IBM', 'Design System'],
    details: {
      role: 'UX Designer / Design Developer',
      entity: 'IBM Design, Watson Data Platform (formerly Analytics Platform)',
      years: '2016–2017',
      team: 'Very healthy leadership combo of design, dev and management with PM. For direct work I was doing a mix of UX concepts and coding to see how these components played out.',
      headerImage: { src: '/images/projects/design-guide-thousands-users/screenshot-01.png', alt: 'IBM Watson Data Platform design guide' },
      synopsis: [
        'My last main group at IBM was the Watson Data Platform team, a position that was incredibly hard to leave. My role blended design, development, and asset and product management in the creation of a comprehensive guide used across multiple products. Although it was a team effort, we worked highly collaboratively to achieve our goals.',
        'I was deeply involved in both the coding and UX aspects of the guide. Everything in the guide was built and coded between myself and my dev lead, while I also engaged in UX work with our visual designers and Design Lead. The final implementation of the guide into products was incredibly gratifying, and it was rewarding to gather feedback on the components as they were used in real-world applications.'
      ],
      skills: ['Design', 'Development', 'Asset and Product Management', 'UX Design', 'Collaboration with Visual Designers and Design Lead']
    }
  },
  {
    slug: 'watson-analytics-early-work',
    title: 'Watson Analytics — early work',
    description: 'Foundational research and prototypes for Watson Analytics; blue‑sky AI‑powered dashboards.',
    year: 2014,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/watson-analytics-early-work/' },
    ],
    image: { src: '/images/projects/ae/WatsonAnalytics.png', alt: 'Watson Analytics' },
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
      skills: ['Research', 'Prototyping', 'UX Design', 'Concept Development', 'Stakeholder Engagement'],
      sections: [
        {
          title: 'Initial Research',
          body: 'Conducted extensive research to lay the groundwork for Watson Analytics.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/gem-01.png', alt: 'Research visualization 1' },
            { src: '/images/projects/watson-analytics-early-work/gem-02.png', alt: 'Research visualization 2' },
            { src: '/images/projects/watson-analytics-early-work/gem-03.png', alt: 'Research visualization 3' },
            { src: '/images/projects/watson-analytics-early-work/gem-04.png', alt: 'Research visualization 4' },
            { src: '/images/projects/watson-analytics-early-work/gem-05.png', alt: 'Research visualization 5' },
            { src: '/images/projects/watson-analytics-early-work/gem-06.png', alt: 'Research visualization 6' },
            { src: '/images/projects/watson-analytics-early-work/gem-07.png', alt: 'Research visualization 7' },
            { src: '/images/projects/watson-analytics-early-work/gem-08.png', alt: 'Research visualization 8' },
            { src: '/images/projects/watson-analytics-early-work/gem-09.png', alt: 'Research visualization 9' },
            { src: '/images/projects/watson-analytics-early-work/gem-10.png', alt: 'Research visualization 10' },
            { src: '/images/projects/watson-analytics-early-work/gem-11.png', alt: 'Research visualization 11' },
            { src: '/images/projects/watson-analytics-early-work/gem-12.png', alt: 'Research visualization 12' },
            { src: '/images/projects/watson-analytics-early-work/gem-13.png', alt: 'Research visualization 13' },
            { src: '/images/projects/watson-analytics-early-work/gem-14.png', alt: 'Research visualization 14' },
            { src: '/images/projects/watson-analytics-early-work/gem-15.png', alt: 'Research visualization 15' }
          ]
        },
        {
          title: 'Prototyping Social Media Analytics',
          body: 'Created a series of prototypes to demonstrate and sell the concept of social media analytics.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/sm-01.png', alt: 'Social media analytics prototype 1' },
            { src: '/images/projects/watson-analytics-early-work/sm-02.png', alt: 'Social media analytics prototype 2' },
            { src: '/images/projects/watson-analytics-early-work/sm-03.png', alt: 'Social media analytics prototype 3' },
            { src: '/images/projects/watson-analytics-early-work/sm-04.png', alt: 'Social media analytics prototype 4' }
          ]
        },
        {
          title: 'AI-Powered Dashboards',
          body: 'Developed innovative blue-sky concepts for future AI-powered dashboards, highlighting the potential for advanced data visualization and user interaction.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/wa-01.png', alt: 'AI dashboard concept 1' },
            { src: '/images/projects/watson-analytics-early-work/wa-02.png', alt: 'AI dashboard concept 2' },
            { src: '/images/projects/watson-analytics-early-work/wa-03.png', alt: 'AI dashboard concept 3' },
            { src: '/images/projects/watson-analytics-early-work/wa-04.png', alt: 'AI dashboard concept 4' },
            { src: '/images/projects/watson-analytics-early-work/wa-05.png', alt: 'AI dashboard concept 5' },
            { src: '/images/projects/watson-analytics-early-work/wa-06.png', alt: 'AI dashboard concept 6' },
            { src: '/images/projects/watson-analytics-early-work/wa-07.png', alt: 'AI dashboard concept 7' },
            { src: '/images/projects/watson-analytics-early-work/wa-08.png', alt: 'AI dashboard concept 8' },
            { src: '/images/projects/watson-analytics-early-work/wa-09.png', alt: 'AI dashboard concept 9' },
            { src: '/images/projects/watson-analytics-early-work/wa-10.png', alt: 'AI dashboard concept 10' },
            { src: '/images/projects/watson-analytics-early-work/wa-12.png', alt: 'AI dashboard concept 12' }
          ]
        },
        {
          title: 'Analytics Explorations',
          body: 'Additional explorations and concepts for analytics visualization.',
          images: [
            { src: '/images/projects/watson-analytics-early-work/az-03.png', alt: 'Analytics exploration 3' },
            { src: '/images/projects/watson-analytics-early-work/az-04.png', alt: 'Analytics exploration 4' },
            { src: '/images/projects/watson-analytics-early-work/az-05.png', alt: 'Analytics exploration 5' },
            { src: '/images/projects/watson-analytics-early-work/az-06.png', alt: 'Analytics exploration 6' },
            { src: '/images/projects/watson-analytics-early-work/az-07.png', alt: 'Analytics exploration 7' },
            { src: '/images/projects/watson-analytics-early-work/az-08.png', alt: 'Analytics exploration 8' },
            { src: '/images/projects/watson-analytics-early-work/az-09.png', alt: 'Analytics exploration 9' }
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
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/vaporize-product-design-art-installation/' },
    ],
    image: { src: '/images/projects/ae/Vaporize.png', alt: 'Vaporize installation' },
    gallery: [
      { src: '/images/projects/ae/Vaporize.png', alt: 'Vaporize installation overview' }
    ],
    category: 'creative',
    stack: ['Installation'],
    details: {
      role: 'Machining, Electrical, Product conception',
      entity: 'Glow Workshop',
      location: 'Flint, MI',
      synopsis:
        "Designed as part of the Glow Workshop led by Cathlyn Newell. The workshop took a shop space in downtown Flint and designed projects based on the concept of 'Glow'. I worked alongside Beatrice Lau and William Liow and created the final project you can see below. This was one of my first projects that started to toe the line of physical interaction design, looking into how objects can directly shape users' connection to a space.",
      skills: ['3D modeling', 'LED wiring', 'CNC machining', 'Thermoforming', 'dry-ice'],
      prototypes: [
        { label: 'Video 1', href: '#' },
        { label: 'Video 2', href: '#' }
      ]
    }
  },
  {
    slug: 'grad-school-data-viz',
    title: 'Grad school data visualization work',
    description: 'Early Processing/D3 visualization experiments during University of Michigan grad school.',
    year: 2013,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/grad-school-data-visualization-work/' },
      { label: 'First project Video', href: 'https://youtu.be/cNAjJkotTjo' },
    ],
    image: { src: '/images/projects/ae/Data-Viz.png', alt: 'Grad school data viz' },
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
      { src: '/images/projects/grad-school-data-viz/example-video.png', alt: 'Video example screenshot' },
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
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/guide-to-the-galaxy-a-mobile-app-concept/' },
    ],
    image: { src: '/images/projects/ae/Adler.png', alt: 'Adler mobile concept' },
    gallery: [
      { src: '/images/projects/ae/Adler.png', alt: 'Guide to the Galaxy concept' }
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
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/morphfaux-kuka-robot-plaster-research/' },
    ],
    image: { src: '/images/projects/ae/Morphfaux.png', alt: 'Morphfaux' },
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
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/architecture-graduate-projects/' },
    ],
    image: { src: '/images/projects/ae/Architecture.png', alt: 'Architecture projects' },
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
		category: 'creative',
		image: { src: '/images/projects/generative-web-code-art/card.png', alt: 'Generative web-code art' },
		gallery: [
			{ src: '/images/projects/generative-web-code-art/voice-visualizer.png', alt: 'Voice Visualizer' },
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
				"A collection of browser-based generative sketches. Pieces range from UI-adjacent concepts (headers/loaders) to purely artistic explorations."
			],
			prototypes: [
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
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/other-design-work#/3d-printer-experimentation/' }
		],
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
