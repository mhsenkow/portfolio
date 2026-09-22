const RESUME_FALLBACK_URL =
	'https://drive.google.com/file/d/1AOqIET8BF5kRcZuXYrEYPFMxweFE4GPZ/view?usp=sharing';

export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? RESUME_FALLBACK_URL;
