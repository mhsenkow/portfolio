export type Project = {
	slug: string;
	title: string;
	description: string;
	year?: number;
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
  };
};

export const projects: Project[] = [
	{
		slug: 'apple-accessibility',
		title: 'Apple — Accessibility and internal tooling',
		description:
			'Product Designer in IS&T focusing on accessibility; login system, app bundle concepts, UX recommendations, prototyping and research.',
		year: 2012,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/apple/' },
		],
		image: { src: '/images/projects/ae/apple.png', alt: 'Apple' },
		gallery: [
			{ src: '/images/projects/ae/apple.png', alt: 'Apple IS&T accessibility work' }
		],
		stack: ['Accessibility', 'UX', 'Prototyping'],
		details: {
			role: 'Product Designer (intern)',
			entity: 'Apple — IS&T UX (internal software)',
			years: '2012; summer',
			synopsis: [
				"Team make-up: Group of designers situated in a heavy eng‑pm area of Apple, guidance from a manager but mostly me wrangling projects on my own with minimal guidance",
				"My first professional experience in UX was with Apple’s IS&T (Information Systems & Technology) UX group, where I focused on developing internal software. During this internship, I engaged in multiple projects, with a primary focus on Accessibility—a passion that continues to influence my design work today.",
				"Working at Apple in Cupertino provided invaluable insights into the professional User Experience environment. Apple's design philosophy, characterized by meticulous attention to detail and a seamless user experience, stood out as unique compared to my later experiences at Microsoft, IBM, and Meta. I also participated in a marketing team challenge centered around app bundles, where my team ranked in the top three.",
				"Early work in the internship was focused around some quick, direct asks that needed wireframe concepts… log‑in system concept that needed an MVP version of its UI. This followed the early broad pattern most of my work follows—connect with stakeholders, find available resources, iterate on a range of variations, and connect with development early to ensure concepts can be created."
			],
			skills: ['Accessibility', 'UX/UI', 'Documentation', 'Prototyping', 'User research']
		},
	},
	{
		slug: 'ibm-spss-modeler',
		title: 'IBM — SPSS Modeler redesign',
		description:
			'Product Designer/Front‑end across Watson Analytics and Data Platform; SPSS Modeler redesign, AP design system, early Watson Analytics.',
		year: 2016,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/redesign-of-spss-modeler/' },
		],
		image: { src: '/images/projects/ae/SPSS.png', alt: 'SPSS Modeler redesign' },
		gallery: [
			{ src: '/images/projects/ae/SPSS.png', alt: 'SPSS Modeler redesign' }
		],
		stack: ['IBM Design', 'Data Tools'],
		details: {
			role: 'Product Designer / Front‑end',
			entity: 'IBM Design',
			years: '2016–2017',
			synopsis:
				'Redesign of SPSS Modeler; collaborative work across Watson Analytics and Watson Data Platform, brand connection, modernization and interaction improvements. Contributions to AP/Analytics Platform design system.',
			skills: ['UX', 'Front‑end', 'Design systems', 'Data viz']
		},
	},
	{
		slug: 'watson-keyword-analysis',
		title: 'Watson Analytics — Keyword analysis',
		description:
			'Exploration and redesign of topic/keyword analysis flows as part of analytics experiences.',
		year: 2016,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/keyword-analysis-redesign/' },
		],
    image: { src: '/images/projects/ae/Topic Selection (1).png', alt: 'Topic keyword analysis' },
		stack: ['Analytics', 'Data Viz'],
	},
	{
		slug: 'meta-daiquery-bento-notebooks',
		title: 'Meta — Daiquery/Bento notebooks',
		description:
			'SQL and Python notebook creation and consolidation; data‑viz framework work; AI‑infographic hack project and augmented data workflows.',
		year: 2022,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/daiquery-notebooks-creation-then-merging-with-bento-notebooks/' },
		],
		image: { src: '/images/projects/ae/notebooks.png', alt: 'Notebooks and data workflows' },
		gallery: [
			{ src: '/images/projects/ae/notebooks.png', alt: 'Daiquery/Bento notebooks' }
		],
		stack: ['Meta', 'Notebooks', 'AI'],
		details: {
			role: 'Product Designer IC5',
			entity: 'Meta',
			years: '2020–2023',
			synopsis:
				'Led initial creation of Daiquery SQL notebooks (grouped/merged SQL cells) and later consolidation with Python Bento notebooks; worked closely with eng and PMs to marry functionality and UX. Included data‑viz framework work, an AI‑infographic hack project, and next‑step AI‑augmented data workflows on Metamate.',
			skills: ['UX', 'Interaction Design', 'Visual Design', 'Prototyping', 'User Research', 'SQL', 'Python']
		},
	},
	{
		slug: 'contracts-2024-2025',
		title: 'Contracts — 2024–2025',
		description:
			'AI Law notebooks and recommendation bot, Finance recommendation notebook, Imagen‑node app work, Data Suite concepts, Windows Cloud errors.',
		year: 2025,
		links: [
			{ label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/contracts-across-roles/' },
		],
    image: { src: '/images/projects/ae/Pie chart.png', alt: 'AI infographic pie chart' },
		stack: ['AI', 'Prototyping'],
		details: {
			role: 'Product Designer',
			entity: 'Start‑ups / Windows Cloud / Mars Data Suite',
			location: 'Seattle — in person/remote/hybrid',
			years: '2023–2025',
			synopsis:
				'AI Law notebooks and recommendation bot, Finance recommendation notebook, Imagen‑node app, Data Suite concepts, Windows Cloud error flows and concepts.',
			skills: ['Brand', 'UX', 'Wireframing', 'Prototyping', 'Components', 'AI workflows']
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
    title: 'Topic keyword analysis redesigns',
    description: 'Redesign of keyword/topic analysis as part of Workplace Analytics; design system expansion and mentoring.',
    year: 2019,
    links: [
      { label: 'Original', href: 'https://www.mhsenkow.work/all-experiences#/keyword-analysis-redesign/' },
    ],
    image: { src: '/images/projects/ae/Topic Selection (1).png', alt: 'Topic selection' },
    stack: ['Microsoft', 'Analytics'],
    details: {
      role: 'Product Designer, design system expansion, mentoring',
      entity: 'Microsoft',
      location: 'Redmond, WA',
      synopsis:
        'Took over a struggling initiative for topic keyword analysis and transformed it alongside expansion of a design system used in the space. Shifted from consulting to primary designer role as scope evolved.',
      skills: ['UX Design', 'Visual Design', 'Mentoring', 'Analytics']
    }
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
];
