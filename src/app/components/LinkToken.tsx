"use client";
import Link from 'next/link';

type Props = {
  href: string;
  label: string;
};

export function LinkToken({ href, label }: Props) {
  // Only compute a favicon for absolute URLs to avoid SSR/CSR mismatches
  let icon: string | null = null;
  try {
    const isAbsolute = /^https?:\/\//i.test(href);
    if (isAbsolute) {
      const domain = new URL(href).hostname;
      icon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
  } catch (_) {
    icon = null;
  }
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className="link-token">
      {icon && <img src={icon} alt="" width={16} height={16} loading="lazy" />}
      <span>{label}</span>
    </Link>
  );
}


