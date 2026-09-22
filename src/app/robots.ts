import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/'],
			},
			// Allow major AI crawlers that respect robots (discoverability for GEO)
			{ userAgent: 'GPTBot', allow: '/' },
			{ userAgent: 'ChatGPT-User', allow: '/' },
			{ userAgent: 'ClaudeBot', allow: '/' },
			{ userAgent: 'PerplexityBot', allow: '/' },
			{ userAgent: 'Google-Extended', allow: '/' },
			{ userAgent: 'Applebot-Extended', allow: '/' },
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
