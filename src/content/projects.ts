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
    image: { src: '/images/projects/ibm-spss-modeler/SPSS.png', alt: 'SPSS Modeler redesign' },
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
    slug: 'teams-admin-center-2019-hackathon',
    title: 'Following — Microsoft Design (2019 hackathon)',
    description: 'Quick visual experimentation and front‑end prototyping with data scientists, PMs, and engineers during FHL.',
    year: 2019,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences' },
    ],
    image: { src: '/images/projects/ae/TrustedNews (1).png', alt: 'Hackathon prototypes' },
    stack: ['Hackathon', 'Prototype'],
    details: {
      role: 'Sole designer',
      entity: 'Microsoft',
      years: '2019',
      synopsis:
        'Fast project to explore concepts and produce a functional prototype; iterative design with agile practices.',
      skills: ['Visual exploration', 'Front‑end', 'Agile iteration']
    }
  },
  {
    slug: 're-envisioning-my-primary-product',
    title: 'Re‑envisioning my primary product',
    description: 'Design system improvements and interaction ownership for MyAnalytics/Workplace Analytics; led across team shifts.',
    year: 2018,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences' },
    ],
    image: { src: '/images/projects/ae/Redsign.png', alt: 'Re‑envisioning core product' },
    stack: ['Microsoft', 'Design System', 'Product'],
    details: {
      role: 'Primary Designer for Interactions',
      entity: 'Microsoft — MyAnalytics / Workplace Analytics',
      location: 'Redmond, WA',
      years: '2018',
      team:
        'Began with a design lead and another FTE; later became sole US FTE designer leading 4 contractors and remote FTEs; onboarded new manager and designers.',
      synopsis:
        'Spearheaded an improved design system adopted by sister products. Conducted stakeholder interviews and internal research, delivered extensive visual design, and partnered with PM/engineering to drive adoption through org changes.',
      skills: ['Stakeholder interviews', 'Internal research', 'Visual design', 'Systemization']
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
    description: 'Study for “Silence Mode” across Office; London and Paris client visits, rapid iteration into today’s focus time concepts.',
    year: 2018,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/researching-silence/' },
    ],
    image: { src: '/images/projects/ae/Silence Mode.png', alt: 'Silence mode research' },
    gallery: [
      { src: '/images/projects/ae/Silence Mode.png', alt: 'Researching Silence visuals' }
    ],
    stack: ['Microsoft', 'Research'],
    details: {
      role: 'User Experience Designer/Researcher',
      entity: 'Microsoft',
      location: 'London, Paris, and Redmond, WA',
      years: '2018',
      team:
        'Collaborated with a principal researcher, a senior designer, a fellow designer, multiple PMs, and engineers.',
      synopsis:
        'Visited 8 clients in London and Paris, iterating on designs in‑situ. Culminated in a proposal that evolved into current focus time concepts in Office. Led in‑person interviews, rapid design and prototyping, and stakeholder alignment back in the US.',
      skills: ['In‑person interviews', 'Rapid prototyping', 'Stakeholder management']
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
          images: [
            { src: '/images/projects/topic-keyword-analysis/first_wireframe.png', alt: 'Earliest wireframe of topic selection process' },
            { src: '/images/projects/topic-keyword-analysis/topics_list_page.png', alt: 'Topics list page' }
          ]
        },
        {
          title: 'Final flow and specifics for responsive layout',
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
    gallery: [
      { src: '/images/projects/ae/Redsign.png', alt: 'Navigation and components' }
    ],
    stack: ['Microsoft', 'Design System'],
    details: {
      role: 'Product Designer, prototypes for specifics',
      entity: 'Microsoft',
      location: 'Seattle, WA',
      years: '2019',
      team: 'Sole designer with one PM and multiple developers.',
      synopsis:
        'Became de‑facto design lead during transition. Delivered comparison studies, wireframes, and coded prototypes to drive a better component system.',
      skills: ['Wireframing', 'Prototyping', 'Component systems']
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
    title: 'Improving work life balance within Office 365',
    description: 'Evolving MyAnalytics with actionable insights and improved visuals; metrics redesign and animations.',
    year: 2018,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/improving-your-work-life-balance-within-office-365/' },
    ],
    image: { src: '/images/projects/ae/Adler.png', alt: 'Work-life balance concepts' },
    gallery: [
      { src: '/images/projects/ae/Adler.png', alt: 'MyAnalytics visuals' }
    ],
    stack: ['Microsoft', 'Product'],
    details: {
      role: 'Designer 2 (UX with prototyping and FE collaboration)',
      entity: 'Microsoft',
      years: '2017–2018',
      synopsis:
        'Evolved MyAnalytics from analytics to self‑help; redesigned top metrics with animation and sharing experiences.',
      skills: ['Motion guidelines', 'Metrics redesign']
    }
  },
  {
    slug: 'trusted-news-chrome-extension',
    title: 'Trusted News — Chrome extension',
    description: '2019 FHL hackathon: rapid UX/visual iterations and front-end prototyping with data scientists and engineers.',
    year: 2019,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/trusted-news-ai-chrome-extension/' },
    ],
    image: { src: '/images/projects/ae/TrustedNews%20(1).png', alt: 'Trusted News' },
    gallery: [
      { src: '/images/projects/ae/TrustedNews (1).png', alt: 'Trusted News chrome extension' }
    ],
    stack: ['Hackathon', 'Prototype'],
    details: {
      role: 'Sole designer',
      entity: 'Microsoft',
      years: '2019',
      synopsis:
        'Fast‑paced hackathon; quick visual exploration, front‑end coding, UX and visual design with data scientists, PMs and engineers.',
      skills: ['Rapid prototyping', 'Front‑end', 'Data']
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
    image: { src: '/images/projects/ae/Data-Viz.png', alt: 'Data viz framework' },
    gallery: [
      { src: '/images/projects/ae/Data-Viz.png', alt: 'Meta Infra data viz framework' }
    ],
    stack: ['Meta', 'Vega', 'Data Viz'],
    details: {
      role: 'Product Designer',
      entity: 'Meta',
      location: 'Seattle; talks in MPK, London, Tel‑Aviv',
      years: '2022–2023',
      team:
        'Myself, a main FE dev, a PM, 5–8 engineers in training, additional engineers for related work, and a researcher.',
      synopsis:
        'Created a data visualization framework for Meta Infra. Coded Vega examples, set guidance and documentation, collaborated across roles, and validated with research. Included AI‑infographic explorations.',
      skills: ['Vega', 'Data visualization', 'Documentation', 'Research validation']
    }
  },
  {
    slug: 'design-guide-thousands-users',
    title: 'Design guide used across thousands of users',
    description: 'IBM Watson Data Platform guide; coded components with dev lead, integrated across products.',
    year: 2017,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/the-creation-of-a-design-guide-used-across-thousands-of-users/' },
    ],
    image: { src: '/images/projects/ae/DesignGuide.png', alt: 'Design guide' },
    gallery: [
      { src: '/images/projects/ae/DesignGuide.png', alt: 'Design guide components' }
    ],
    stack: ['IBM', 'Design System'],
    details: {
      role: 'UX Designer / Design Developer',
      entity: 'IBM Design, Watson Data Platform',
      years: '2016–2017',
      team:
        'Highly collaborative team with design, dev, and PM; partnered closely with a dev lead to build components.',
      synopsis:
        'Built and coded a comprehensive guide used across products; integrated components and gathered feedback from real usage.',
      skills: ['Design systems', 'Component engineering']
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
    gallery: [
      { src: '/images/projects/ae/WatsonAnalytics.png', alt: 'Watson Analytics early work' }
    ],
    stack: ['IBM', 'Analytics'],
    details: {
      role: 'UX Designer / Researcher / Prototyper',
      entity: 'IBM Design, Watson Analytics',
      years: '2013–2014',
      synopsis:
        'Initial research that grew into Watson Analytics. Prototyped social media analytics to sell the concept. Explored blue‑sky AI‑powered dashboards.',
      skills: ['Research', 'Prototyping', 'Concept development']
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
    ],
    image: { src: '/images/projects/ae/Adler.png', alt: 'Grad school data viz' },
    gallery: [
      { src: '/images/projects/ae/Adler.png', alt: 'Data viz experiments' }
    ],
    category: 'creative',
    stack: ['Processing', 'D3'],
    details: {
      role: 'UX Designer / Visual Designer / Programmer',
      entity: 'University of Michigan',
      location: 'Ann Arbor, MI',
      years: '2013',
      synopsis:
        'Experimental visualization projects combining information visualization, graphic design, and scripting (Processing, D3).',
      skills: ['Information Visualization', 'Processing', 'D3']
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
      { src: '/images/projects/ae/Morphfaux.png', alt: 'Morphfaux research' }
    ],
    category: 'creative',
    stack: ['KUKA', 'Rhino', 'Arduino'],
    details: {
      role: 'Design Research Assistant',
      entity: 'Taubman Architecture',
      location: 'Ann Arbor, MI',
      synopsis:
        'Explored plaster enhancements via modern fabrication. Attempted scripting and machine control of a moving head for KUKA; produced models and illustrations.',
      skills: ['Rhinoscripting', 'Grasshopper', 'Arduino', 'Machine control']
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
      { src: '/images/projects/ae/Architecture.png', alt: 'Architecture work' }
    ],
    category: 'creative',
    stack: ['Architecture'],
    details: {
      synopsis: 'A selection of architecture course work across modeling and rendering; early foundations of visual craft.'
    }
	},
	// Additional creative sections mirrored from Other Creative Work
	{
		slug: 'icon-creation',
		title: 'Icon creation',
		description: 'Vector icon explorations and logo concepts; experiments with AI-assisted vectorization.',
		category: 'creative',
		image: { src: '/images/projects/icon-creation/card.jpg', alt: 'Icon creation thumbnail' },
		details: {
			synopsis: [
				"I periodically create icons as a way to stretch visual craft and explore metaphor.",
				"Recent work includes tests of AI-assisted raster-to-vector workflows and refinements by hand."
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
		details: {
			synopsis: [
				"A collection of browser-based generative sketches.",
				"Pieces range from UI-adjacent concepts (headers/loaders) to purely artistic explorations."
			]
		}
	},
	{
		slug: 'graphic-design-work',
		title: 'Graphic design work',
		description: 'Selected graphic design examples from various roles.',
		category: 'creative',
		image: { src: '/images/projects/graphic-design-work/card.PNG', alt: 'Graphic design work' },
		details: {
			synopsis: "A sampling of graphics and visual compositions created alongside product design work."
		}
	},
	{
		slug: '3d-printer-experimentation',
		title: '3D printer experimentation',
		description: 'Explorations across Rhino/Grasshopper and node-based modeling; printed studies.',
		category: 'creative',
		image: { src: '/images/projects/3d-printer-experimentation/card.png', alt: '3D printer experimentation' },
		details: {
			synopsis: [
				"Mechanical engineering and architecture background applied to 3D printing.",
				"Focus on parametric modeling and process to produce repeatable, tunable results."
			]
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
