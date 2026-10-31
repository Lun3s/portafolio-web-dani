import { useEffect, useRef, useState } from "react";
import type { FocusEvent, PointerEvent } from "react";
import { useSearchParams } from "react-router";
import type { Work } from "../types";
import { Arrow } from "../components/common/Icons";
import WorkCard from "../components/works/WorkCard";
import WorkModal from "../components/works/WorkModal";
import { useReducedMotion } from "../utils/useReducedMotion";
import { clients } from "../data/clients";
import { works } from "../data/works";

export default function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedClient = searchParams.get("cliente");
  const validClients = clients.map((client) => client.name);
  const selected = clients.find((client) => client.slug === requestedClient)?.name ?? "Todos";
  const filteredWorks = selected === "Todos" ? works : works.filter((work) => work.client === selected);
  const reducedMotion = useReducedMotion();
  const scrollBehavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
  // El carrusel se detiene si hay mouse encima, foco de teclado o un dedo tocándolo
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const touchTimer = useRef<number | undefined>(undefined);
  const paused = hovered || focused || touched;
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mueve el carrusel a la tarjeta siguiente (o anterior). Mide las tarjetas reales,
  // así funciona con cualquier ancho de pantalla y con cualquier cantidad de videos.
  const moveCarousel = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 1) return; // todas las tarjetas caben: no hay nada que mover

    // Posición de scroll en la que cada tarjeta queda al inicio (sin pasar del final)
    const trackLeft = track.getBoundingClientRect().left;
    const stops = Array.from(track.children).map((card) =>
      Math.min(max, Math.max(0, card.getBoundingClientRect().left - trackLeft + track.scrollLeft)),
    );

    const current = track.scrollLeft;
    const margin = 4;
    let target: number | undefined;
    if (direction > 0) {
      target = stops.find((stop) => stop > current + margin);
      if (target === undefined) target = 0; // ya está en el final: vuelve al inicio
    } else {
      target = [...stops].reverse().find((stop) => stop < current - margin);
      if (target === undefined) target = 0;
    }
    track.scrollTo({ left: target, behavior: scrollBehavior });
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: scrollBehavior });
  }, [selected]);

  // Avance automático: no corre con "reducir movimiento", si el usuario lo pausa
  // o mientras hay un video abierto encima
  useEffect(() => {
    if (reducedMotion || paused || activeWork || filteredWorks.length < 2) return;
    const timer = window.setInterval(() => moveCarousel(1), 4500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, activeWork, filteredWorks.length]);

  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    window.clearTimeout(touchTimer.current);
    setTouched(true);
  };

  // Al soltar el dedo, el carrusel espera unos segundos antes de reanudarse
  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => setTouched(false), 8000);
  };

  // Solo el foco de teclado pausa (el clic con mouse en una flecha no)
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    let keyboardFocus = true;
    try {
      keyboardFocus = (event.target as HTMLElement).matches(":focus-visible");
    } catch {
      // Navegador sin :focus-visible: se asume foco de teclado
    }
    if (keyboardFocus) setFocused(true);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  useEffect(() => {
    if (!activeWork) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveWork(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activeWork]);

  const chooseFilter = (filter: string) => {
    const client = clients.find((item) => item.name === filter);
    setSearchParams(client ? { cliente: client.slug } : {});
  };

  return (
    <section className="works-page">
      <div className="works-heading">
        <span className="section-kicker">Selección de proyectos</span>
        <h1>TRABAJOS<i>.</i></h1>
      </div>
      <div className="filter-chips" aria-label="Filtrar por cliente">
        {["Todos", ...validClients].map((filter) => (
          <button
            key={filter}
            type="button"
            className={selected === filter ? "filter-chip selected" : "filter-chip"}
            onClick={() => chooseFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div
        className="works-carousel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <button
          type="button"
          className="carousel-arrow works-arrow"
          onClick={() => moveCarousel(-1)}
          aria-label="Trabajos anteriores"
        >
          <Arrow left />
        </button>
        <div className="works-track" ref={trackRef}>
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} onOpen={setActiveWork} />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow works-arrow"
          onClick={() => moveCarousel(1)}
          aria-label="Trabajos siguientes"
        >
          <Arrow />
        </button>
      </div>
      <p className="carousel-note">
        {paused ? "Pausado" : "Desliza para descubrir"} <span>↗</span>
      </p>

      {activeWork && <WorkModal work={activeWork} onClose={() => setActiveWork(null)} />}
    </section>
  );
}
