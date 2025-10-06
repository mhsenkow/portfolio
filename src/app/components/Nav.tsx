"use client";

import * as NavMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Nav() {
	const pathname = usePathname();
	const items = [
		{ href: '/', label: 'home' },
		{ href: '/about', label: 'about' },
		{ href: '/projects', label: 'key projects' },
		{ href: '/all-experiences', label: 'grid view' },
		{ href: '/other-design-work', label: 'other creative work' },
		{ href: '/list-view', label: 'full list' },
		{ href: '/contact', label: 'contact' },
	];

	return (
		<NavMenu.Root>
			<NavMenu.List className="nav">
				{items.map((i, idx) => (
					<NavMenu.Item key={i.href} style={idx === 0 ? { marginRight: 'auto' } : undefined}>
						<Link href={i.href} aria-current={pathname === i.href ? 'page' : undefined}>
							<span suppressHydrationWarning>{i.label}</span>
						</Link>
					</NavMenu.Item>
				))}
				<NavMenu.Item>
					<a href="https://drive.google.com/file/d/1IdDaH5JjNUhu-zDPeUTS1hXH8_w2CpRs/view?usp=sharing" target="_blank" rel="noreferrer noopener">resume</a>
				</NavMenu.Item>
			</NavMenu.List>
		</NavMenu.Root>
	);
}


