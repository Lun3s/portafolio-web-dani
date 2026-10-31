export function Moon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.4A8.4 8.4 0 0 1 8.6 4 8.4 8.4 0 1 0 20 15.4Z" />
    </svg>
  );
}

export function Sun() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Download() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" />
    </svg>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={open ? "chevron open" : "chevron"} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg className={left ? "arrow-left" : ""} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".7" className="icon-fill" />
    </svg>
  );
}

export function TikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 4v11.5a4.5 4.5 0 1 1-3.6-4.4M15 4c.4 2.7 2 4.3 4.5 4.6" />
    </svg>
  );
}

export function Linkedin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.1M12 17v-4c0-1.7 1.1-3 2.7-3 1.5 0 2.3 1 2.3 3v4M12 10v7" />
    </svg>
  );
}

export function Play() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 7 8 5-8 5Z" />
    </svg>
  );
}

export default {
  Moon,
  Sun,
  Download,
  Chevron,
  Arrow,
  Instagram,
  TikTok,
  Linkedin,
  Play,
};
