"use client";

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function UtilityMenu() {
	const [open, setOpen] = useState(false);
	const [justOpened, setJustOpened] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
		function onClick(e: MouseEvent) {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener('keydown', onKey);
		document.addEventListener('mousedown', onClick);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('mousedown', onClick);
		};
	}, []);

	return (
		<div className="utility-menu" ref={ref} onMouseDown={(e)=>{ if(justOpened){ e.stopPropagation(); e.preventDefault(); } }}>
			<button type="button" className="util-btn" aria-haspopup="menu" aria-expanded={open} aria-label="Theme options" onClick={() => { setOpen(v => !v); setJustOpened(true); setTimeout(()=>setJustOpened(false), 160); }}>
				<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/></svg>
			</button>
			{open && (
				<div className="util-menu" role="menu">
					<div className="util-group" role="none">
						<span className="util-label" role="none">Theme</span>
						<ThemeToggle />
					</div>
				</div>
			)}
		</div>
	);
}


