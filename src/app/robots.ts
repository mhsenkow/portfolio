import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: '*', allow: '/' },
		],
		sitemap: 'https://www.mhsenkow.work/sitemap.xml',
		host: 'https://www.mhsenkow.work',
	};
}


