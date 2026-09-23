/**
 * Through-line essay — short sentences; project tokens resolve at render time.
 * Keep labels short so chips read as nouns inside the prose.
 */
export type StoryToken = {
	slug: string;
	/** Inline chip label (defaults to project title if omitted). */
	label: string;
};

export type StoryPart = string | StoryToken;

export function isStoryToken(part: StoryPart): part is StoryToken {
	return typeof part === "object" && part !== null && "slug" in part;
}

/**
 * Arc: systems → products → AI at work, then the same instinct
 * in digital fabrication and permaculture games off-hours.
 */
export const STORY_SENTENCES: StoryPart[][] = [
	[
		"I started at ",
		{ slug: "apple-accessibility", label: "Apple" },
		" treating accessibility as craft, then at ",
		{ slug: "ibm-spss-modeler", label: "IBM" },
		" watched design studios grow around systems products could ship against, and at ",
		{ slug: "re-envisioning-my-primary-product", label: "Microsoft" },
		" kept sharpening that same instinct.",
	],
	[
		"At Meta the system became the daily product — ",
		{ slug: "meta-daiquery-bento-notebooks", label: "notebooks" },
		" with scheduled runs, a data ecosystem of extensions and hosting, AI assistance in the loop, and the early precursor for later complexity.",
	],
	[
		"Lately I’ve been bopping around startups making whatever they need — Figma, design, code, you name it — including joyful little machines like ",
		{ slug: "judge", label: "Judge" },
		", re-lensing that design-studio sense remotely.",
	],
	[
		"Off-hours the same systems itch shows up as local-first data machines — ",
		{ slug: "throughline", label: "throughline" },
		", ",
		{ slug: "wordcounter", label: "wordcounter" },
		", ",
		{ slug: "starship-vega", label: "Starship Vega" },
		", ",
		{ slug: "imdb-loom", label: "IMDb Loom" },
		" — grad-school digital fabrication like ",
		{ slug: "morphfaux-kuka-plaster-research", label: "Morphfaux" },
		", and habitat games — ",
		{ slug: "orrery", label: "ORRERY" },
		", ",
		{ slug: "ramen", label: "RAMEN" },
		", and the permaculture tank ",
		{ slug: "walstad-loom", label: "walstad loom" },
		".",
	],
];

export const STORY_BLURB =
	"How design systems, products, and AI grew across companies — plus local-first data tools, digital fabrication, and habitat games.";
