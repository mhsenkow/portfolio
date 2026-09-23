"use client";

import { useCallback, useState } from "react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, SquaresFour } from "@phosphor-icons/react";
import { CONTACT_EMAIL } from "@/content/site";

const ICON = { size: 18, weight: "light" as const, "aria-hidden": true };

const LINKS = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Email",
    description: `${CONTACT_EMAIL} — best for roles, collabs, and follow-ups.`,
    Icon: EnvelopeSimple,
    email: true,
  },
  {
    href: "https://github.com/mhsenkow",
    label: "GitHub",
    description: "Machines, prototypes, and public builds — github.com/mhsenkow.",
    Icon: GithubLogo,
  },
  {
    href: "https://www.linkedin.com/in/mhsenkow/",
    label: "LinkedIn",
    description: "Work history and recommendations — in/mhsenkow.",
    Icon: LinkedinLogo,
  },
  {
    href: "https://thenounproject.com/creator/mhsenkow/",
    label: "Noun Project",
    description: "Icon sets and marks published on The Noun Project.",
    Icon: SquaresFour,
  },
] as const;

export function FooterLinks() {
  const [copied, setCopied] = useState(false);

  const onEmailClick = useCallback(async () => {
    // mailto: often no-ops when no desktop mail client is configured.
    // Copy always works; default mailto navigation still fires.
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked; mailto still proceeds */
    }
  }, []);

  return (
    <ul className="icon-links" role="list">
      {LINKS.map((link) => {
        const { href, label, description, Icon } = link;
        const isEmail = "email" in link && link.email;
        const external = href.startsWith("http");
        return (
          <li key={href}>
            <a
              className="icon-btn"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={isEmail && copied ? "Email address copied" : label}
              onClick={isEmail ? onEmailClick : undefined}
            >
              <span className="tooltip" role="tooltip">
                <span className="tooltip__title">
                  {isEmail && copied ? "Copied" : label}
                </span>
                <span className="tooltip__desc">
                  {isEmail && copied
                    ? `${CONTACT_EMAIL} is on your clipboard.`
                    : description}
                </span>
              </span>
              <Icon {...ICON} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
