/**
 * Sparse career / era markers for the archive edge rail.
 * Years should exist on the project timeline (2012–present).
 */
export type ArchiveMilestone = {
  year: number;
  /** Short label shown on hover / focus. */
  label: string;
  /** Optional one-line context. */
  detail?: string;
};

export const ARCHIVE_MILESTONES: ArchiveMilestone[] = [
  {
    year: 2012,
    label: "Apple IS&T",
    detail: "Accessibility internship — early systems craft.",
  },
  {
    year: 2013,
    label: "Vaporize",
    detail: "Glow Workshop installation; physical interaction research.",
  },
  {
    year: 2014,
    label: "Watson era",
    detail: "IBM Watson Analytics — early AI product research.",
  },
  {
    year: 2016,
    label: "Carbon + SPSS",
    detail: "Design-system integration into enterprise analytics.",
  },
  {
    year: 2018,
    label: "Focus Time",
    detail: "MyAnalytics / Silence Mode → workplace wellbeing.",
  },
  {
    year: 2020,
    label: "Meta Infra",
    detail: "Remote shift — notebooks, viz systems, analysis UX.",
  },
  {
    year: 2022,
    label: "Bento notebooks",
    detail: "Daiquery / Bento — notebook workflows at scale.",
  },
  {
    year: 2024,
    label: "AI contracts",
    detail: "Legal & data suite work in the generative wave.",
  },
  {
    year: 2026,
    label: "Local-first",
    detail: "i2Systems + independent AI machines shipping.",
  },
];
