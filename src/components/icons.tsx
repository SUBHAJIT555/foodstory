type IconProps = {
  className?: string;
  title?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSearch({ className, title = "Search" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className={className} aria-hidden={!title}>
      {title ? <title>{title}</title> : null}
      <circle cx="11" cy="11" r="6.25" {...stroke} />
      <path d="M16 16.5 20 20.5" {...stroke} />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path d="M12 21s6-5.2 6-10.2A6 6 0 1 0 6 10.8C6 15.8 12 21 12 21Z" {...stroke} />
      <circle cx="12" cy="10.5" r="1.8" {...stroke} />
    </svg>
  );
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path d="M8 10l4 4 4-4" {...stroke} />
    </svg>
  );
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path d="M9 7l5 5-5 5" {...stroke} />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" {...stroke} />
    </svg>
  );
}

export function IconCart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M4 6h2.2l1.3 11h9l1.4-8H7" {...stroke} />
      <circle cx="10" cy="19.2" r="1.1" {...stroke} />
      <circle cx="16.2" cy="19.2" r="1.1" {...stroke} />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.2" {...stroke} />
      <path d="M5.5 19c1.2-3.2 3.4-4.6 6.5-4.6S16.8 15.8 18.5 19" {...stroke} />
    </svg>
  );
}

export function IconShelf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M6 4.5h12v15l-6-3.4-6 3.4z" {...stroke} />
    </svg>
  );
}

export function IconCall({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path d="M7.2 4.8h3.2l1 3.2-2 1.2a12 12 0 0 0 5.4 5.4l1.2-2 3.2 1v3.2c0 .8-.8 1.6-1.7 1.5C8.8 17.6 6.4 15.2 5.7 6.5c-.1-.9.7-1.7 1.5-1.7Z" {...stroke} />
    </svg>
  );
}

export function IconWhatsApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.6A8.4 8.4 0 0 0 5.1 16.4L4 20.4l4.1-1.1A8.4 8.4 0 1 0 12 3.6Zm4.7 11.9c-.2.6-1.1 1-1.5 1.1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.8-.3h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5l-.5.6c-.1.1-.2.3 0 .5.3.5 1 1.3 1.6 1.7.3.2.5.2.7 0l.6-.6c.2-.2.4-.2.7-.1.2.1 1.3.6 1.5.7.2.1.4.2.4.5 0 .3-.2.9-.6 1.2Z"
      />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <rect x="4.5" y="6" width="15" height="13.5" rx="1.2" {...stroke} />
      <path d="M8 4.5v3M16 4.5v3M4.5 10h15" {...stroke} />
    </svg>
  );
}

export function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M12 19.2 5.8 13.4a3.8 3.8 0 1 1 5.4-5.3L12 9l.8-.9a3.8 3.8 0 1 1 5.4 5.3z" {...stroke} />
    </svg>
  );
}

export function IconFaq({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden>
      <path d="M6 6.5h12v9.5H10L7 19v-3H6z" {...stroke} />
    </svg>
  );
}

export function IconStore({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} aria-hidden>
      <path d="M4.5 10.5 6 6h12l1.5 4.5v8h-15z" {...stroke} />
      <path d="M9 18.5v-5h6v5" {...stroke} />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="24" height="24" className={className} aria-hidden>
      <path d="M3 8.65h10M8 13.65V3.65" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconShare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" className={className} aria-hidden>
      <circle cx="4" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.8 7.13 10.2 4.87M5.8 8.87l4.4 2.27" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpeaker({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" className={className} aria-hidden>
      <path
        d="M5 12.5H3.33A.83.83 0 0 1 2.5 11.67V8.34a.83.83 0 0 1 .83-.83H5L7.92 3.75a.83.83 0 0 1 1.25.42v12.66a.83.83 0 0 1-1.25.42L5 12.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M12.5 6.67a5 5 0 0 1 0 6.67M14.75 4.17a8.3 8.3 0 0 1 0 11.67" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconNavigate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className={className} aria-hidden>
      <polygon points="3 11 22 2 13 21 11 13 3 11" {...stroke} />
    </svg>
  );
}
