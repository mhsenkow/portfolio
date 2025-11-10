"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import UtilityMenu from './UtilityMenu';

const RESUME_FALLBACK_URL = 'https://drive.google.com/file/d/1AOqIET8BF5kRcZuXYrEYPFMxweFE4GPZ/view?usp=sharing';
const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? RESUME_FALLBACK_URL;

export function Nav() {
    const pathname = usePathname();
    const items = [
        { href: '/', label: 'home', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M12 3.3 3.5 10a1 1 0 0 0-.38.78V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h4.88a1 1 0 0 0 1-1v-9.22a1 1 0 0 0-.38-.78L12 3.3Z"/></svg>
        ) },
        { href: '/about', label: 'about', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2-8 4.5V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5C20 16 16.42 14 12 14Z"/></svg>
        ) },
        { href: '/projects', label: 'key projects', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M4 4h7v7H4Zm9 0h7v7h-7ZM4 13h7v7H4Zm9 7v-7h7v7Z"/></svg>
        ) },
        { href: '/all-experiences', label: 'grid view', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M4 4h7v7H4Zm9 0h7v7h-7ZM4 13h7v7H4Zm9 0h7v7h-7Z"/></svg>
        ) },
        { href: '/other-design-work', label: 'other creative work', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M6 14c3.5-1.5 6.5-4.5 8-8 1 3.5 3.5 6 7 7-3.5 1-6 3.5-7 7-1.5-3.5-4.5-6.5-8-8Z"/></svg>
        ) },
        { href: '/list-view', label: 'full list', icon: (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true"><path fill="currentColor" d="M4 6h16v2H4Zm0 5h16v2H4Zm0 5h16v2H4Z"/></svg>
        ) },
    ];

    return (
        <>
        <ul className="nav" style={{ backdropFilter: 'var(--glass-blur-1)' }}>
            {items.map((i, idx) => (
                <li key={i.href} style={idx === 0 ? { marginRight: 'auto' } : undefined}>
                    <Link href={i.href} aria-current={pathname === i.href ? 'page' : undefined} aria-label={i.label} className="nav-link">
                        {i.icon && <span className="nav-icon">{i.icon}</span>}
                        <span className="nav-label" suppressHydrationWarning>{i.label}</span>
                    </Link>
                </li>
            ))}
            <li>
                <a href={RESUME_URL} target="_blank" rel="noreferrer noopener" className="nav-link" aria-label="resume">
                    <span className="nav-icon" aria-hidden>
                        <svg viewBox="0 0 24 24" width={18} height={18}><path fill="currentColor" d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5L14 3.5ZM8 12h8v2H8Zm0 4h8v2H8Z"/></svg>
                    </span>
                    <span className="nav-label">resume</span>
                </a>
            </li>
            <li className="nav-theme">
                <ThemeToggle />
            </li>
        </ul>
        {/* Mobile utility menu */}
        <div className="nav-utility-mobile">
            <UtilityMenu />
        </div>
        </>
    );
}


