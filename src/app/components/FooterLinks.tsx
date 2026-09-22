"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, SquaresFour } from "@phosphor-icons/react";

const ICON = { size: 18, weight: "light" as const, "aria-hidden": true };

const LINKS = [
  {
    href: "mailto:mhsenkow@gmail.com",
    label: "Email",
    description: "mhsenkow@gmail.com — best for roles, collabs, and follow-ups.",
    Icon: EnvelopeSimple,
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
  return (
    <ul className="icon-links" role="list">
      {LINKS.map(({ href, label, description, Icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={href}>
            <a
              className="icon-btn"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={label}
            >
              <span className="tooltip" role="tooltip">
                <span className="tooltip__title">{label}</span>
                <span className="tooltip__desc">{description}</span>
              </span>
              <Icon {...ICON} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
