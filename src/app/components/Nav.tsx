"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

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
        <ul className="nav">
            {items.map((i, idx) => (
                <li key={i.href} style={idx === 0 ? { marginRight: 'auto' } : undefined}>
                    <Link href={i.href} aria-current={pathname === i.href ? 'page' : undefined}>
                        <span suppressHydrationWarning>{i.label}</span>
                    </Link>
                </li>
            ))}
            <li>
                <a href="https://drive.google.com/file/d/1IdDaH5JjNUhu-zDPeUTS1hXH8_w2CpRs/view?usp=sharing" target="_blank" rel="noreferrer noopener">resume</a>
            </li>
            <li>
                <ThemeToggle />
            </li>
        </ul>
    );
}


