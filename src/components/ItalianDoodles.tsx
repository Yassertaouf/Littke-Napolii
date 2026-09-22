import type { CSSProperties, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconPizzaSlice(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M32 7 L57 53 H7 Z" />
      <path d="M11 46c14-6 28-6 42 0" />
      <circle cx="29" cy="28" r="2.3" />
      <circle cx="38" cy="35" r="2" />
      <circle cx="24" cy="38" r="1.8" />
    </svg>
  );
}

export function IconChefHat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17 29c-6.5 0-10-7.4-5.6-12 1.8-2 5-3.3 7.3-1.6C19.6 9.8 25.4 6 30 6c4.7 0 10.4 3.8 11.3 9.4 2.3-1.7 5.5-.4 7.3 1.6 4.4 4.6.9 12-5.6 12" />
      <path d="M17 29v9h26v-9" />
      <path d="M15 47h30v8H15z" />
    </svg>
  );
}

export function IconMokaPot(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M25 14h12l2 9H23z" />
      <path d="M21 23h20l-4 9H25z" />
      <path d="M19 32h24l-3 21H22z" />
      <path d="M43 27c4.5 1 7 4.4 7 7.6 0 3.2-2.4 5.4-6 5.4" />
      <path d="M22 10h18" />
    </svg>
  );
}

export function IconLemonBranch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="33" cy="36" rx="13" ry="10.5" transform="rotate(-18 33 36)" />
      <path d="M33 25c1-6 6.5-9.6 13-9" />
      <path d="M21 27c-6-2.5-8.6-8-7-13.5" />
      <path d="M27 31c2 1.4 5 1.4 7 0" />
    </svg>
  );
}

export function IconLeaningTower(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.4} {...props}>
      <path d="M23 57 29 8h6l6 49z" />
      <path d="M24.5 17h15M23.7 25h16.6M22.8 33h18.4M22 41h20M21.2 49h21.6" />
      <path d="M19 57h26" />
    </svg>
  );
}

export function IconOliveBranch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 51c15-2 31-15 46-42" />
      <ellipse cx="23" cy="41" rx="5" ry="3.1" transform="rotate(-32 23 41)" />
      <ellipse cx="33" cy="29" rx="5" ry="3.1" transform="rotate(-32 33 29)" />
      <ellipse cx="43" cy="17" rx="5" ry="3.1" transform="rotate(-32 43 17)" />
      <circle cx="13" cy="49" r="2.6" />
      <circle cx="18.5" cy="46" r="2.1" />
    </svg>
  );
}

export function IconBasil(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M32 56V24" />
      <path d="M32 40c-9 1-16-5-17-15 10-1 17 5 17 15Z" />
      <path d="M32 30c9 1 16-5 17-15-10-1-17 5-17 15Z" />
    </svg>
  );
}

export function IconVolcano(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 52 24 22h16l14 30z" />
      <path d="M27 22c1-5 2-9 5-13 3 4 4 8 5 13" />
      <path d="M30 6c1 2 1 4 0 6" />
      <path d="M14 52h36" />
    </svg>
  );
}

export function IconEspressoCup(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 26h28l-3 20a6 6 0 0 1-6 5H23a6 6 0 0 1-6-5z" />
      <path d="M42 30c6-1 9 2 9 6.5S48 43 42 42" />
      <path d="M22 15c1 2-1 3-1 5M30 13c1 2-1 3-1 5M38 15c1 2-1 3-1 5" />
      <path d="M12 51h32" />
    </svg>
  );
}

export function IconGondola(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 40c8 6 40 6 48 0l-5 8H13z" />
      <path d="M44 40 46 14" />
      <path d="M41 18h9" />
      <path d="M23 40c0-5 3-9 8-9s8 4 8 9" />
    </svg>
  );
}

const ICONS = [
  IconPizzaSlice,
  IconChefHat,
  IconMokaPot,
  IconLemonBranch,
  IconLeaningTower,
  IconOliveBranch,
  IconBasil,
  IconVolcano,
  IconEspressoCup,
  IconGondola,
];

type IconComponent = (typeof ICONS)[number];

interface DoodleSpot {
  icon: IconComponent;
  style: CSSProperties;
}

const FIELDS: Record<string, DoodleSpot[]> = {
  intro: [
    { icon: IconLemonBranch, style: { top: '2%', left: '1%', width: 60, transform: 'rotate(-9deg)' } },
    { icon: IconOliveBranch, style: { bottom: '2%', left: '44%', width: 64, transform: 'rotate(6deg)' } },
    { icon: IconMokaPot, style: { top: '8%', right: '2%', width: 50, transform: 'rotate(7deg)' } },
    { icon: IconBasil, style: { bottom: '14%', right: '10%', width: 42, transform: 'rotate(-6deg)' } },
  ],
  menu: [
    { icon: IconPizzaSlice, style: { top: '-6%', right: '4%', width: 66, transform: 'rotate(10deg)' } },
    { icon: IconChefHat, style: { top: '4%', left: '0%', width: 52, transform: 'rotate(-8deg)' } },
    { icon: IconBasil, style: { bottom: '-3%', right: '28%', width: 44, transform: 'rotate(4deg)' } },
    { icon: IconVolcano, style: { bottom: '2%', left: '6%', width: 50, transform: 'rotate(-4deg)' } },
  ],
  split: [
    { icon: IconGondola, style: { top: '8%', right: '6%', width: 56, transform: 'rotate(-4deg)' } },
    { icon: IconOliveBranch, style: { bottom: '6%', right: '10%', width: 46, transform: 'rotate(10deg)' } },
  ],
  chef: [
    { icon: IconChefHat, style: { top: '6%', right: '4%', width: 50, transform: 'rotate(6deg)' } },
    { icon: IconBasil, style: { bottom: '8%', right: '14%', width: 40, transform: 'rotate(-8deg)' } },
  ],
  academy: [
    { icon: IconEspressoCup, style: { top: '8%', left: '3%', width: 48, transform: 'rotate(-6deg)' } },
    { icon: IconVolcano, style: { bottom: '4%', right: '4%', width: 60, transform: 'rotate(4deg)' } },
    { icon: IconLeaningTower, style: { top: '20%', right: '22%', width: 40, transform: 'rotate(3deg)' } },
  ],
  gallery: [
    { icon: IconLemonBranch, style: { top: '2%', right: '2%', width: 50, transform: 'rotate(8deg)' } },
    { icon: IconGondola, style: { bottom: '0%', left: '2%', width: 58, transform: 'rotate(-5deg)' } },
  ],
  contact: [
    { icon: IconMokaPot, style: { top: '6%', right: '6%', width: 46, transform: 'rotate(6deg)' } },
    { icon: IconOliveBranch, style: { bottom: '6%', left: '4%', width: 52, transform: 'rotate(-8deg)' } },
  ],
  footer: [
    { icon: IconLeaningTower, style: { top: '10%', left: '4%', width: 36, transform: 'rotate(-4deg)' } },
    { icon: IconOliveBranch, style: { bottom: '8%', right: '6%', width: 46, transform: 'rotate(8deg)' } },
    { icon: IconPizzaSlice, style: { top: '4%', right: '22%', width: 34, transform: 'rotate(10deg)' } },
  ],
};

export function DoodleField({ variant }: { variant: keyof typeof FIELDS }) {
  const spots = FIELDS[variant] ?? [];
  return (
    <div className={`doodle-field doodle-field-${variant}`} aria-hidden="true">
      {spots.map(({ icon: Icon, style }, index) => (
        <Icon key={index} className="doodle-icon" style={style} />
      ))}
    </div>
  );
}

const CATEGORY_ICON: Record<string, IconComponent> = {
  klassiker: IconPizzaSlice,
  signaturen: IconChefHat,
  vegetarisch: IconBasil,
};

export function MenuCategoryIcon({ category }: { category: string }) {
  const Icon = CATEGORY_ICON[category] ?? IconPizzaSlice;
  return <Icon className="menu-card-icon" />;
}

const KICKER_ICON: Record<string, IconComponent> = {
  story: IconLemonBranch,
  menu: IconPizzaSlice,
  craft: IconVolcano,
  chef: IconChefHat,
  academy: IconEspressoCup,
  gallery: IconGondola,
  contact: IconMokaPot,
};

export function KickerIcon({ section }: { section: string }) {
  const Icon = KICKER_ICON[section] ?? IconOliveBranch;
  return <Icon className="kicker-icon" />;
}
