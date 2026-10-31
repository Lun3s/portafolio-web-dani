import type { ReactNode } from "react";

export interface HomeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function HomeSection({ title, children, className = "" }: HomeSectionProps) {
  return (
    <section className={`home-section ${className}`}>
      <span className="section-kicker">Conoce mi universo</span>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
