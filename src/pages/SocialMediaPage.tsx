import { useEffect, useRef, useState } from "react";
import { Arrow, Play } from "../components/common/Icons";
import type { Reel } from "../types";
import { reels } from "../data/reels";
import { getYouTubeEmbedUrl, getYouTubeThumbnail, handleThumbError, handleThumbLoad } from "../utils/youtube";
import { useScrollLock } from "../utils/useScrollLock";

function ReelModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  useScrollLock();
  const embedUrl = reel.videoUrl ? getYouTubeEmbedUrl(reel.videoUrl) : null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="work-modal"
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      onMouseDown={onClose}
    >
      <article className="modal-card reel-modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar reel">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {embedUrl ? (
          <div className="modal-video-wrapper modal-video-vertical">
            <iframe
              className="modal-video"
              src={embedUrl}
              title={reel.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={`reel-media media-${reel.color}`} style={{ width: "100%", aspectRatio: "9/16", maxHeight: "70vh" }}>
            <span className="reel-number">{reel.number}</span>
            <span className="play-icon"><Play /></span>
          </div>
        )}
        <div className="modal-copy">
          <h2>{reel.title}</h2>
        </div>
      </article>
    </div>
  );
}

export default function SocialMediaPage() {
  const reelsRef = useRef<HTMLDivElement>(null);
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const move = (direction: number) => reelsRef.current?.scrollBy({ left: direction * 316, behavior: "smooth" });

  return (
    <section className="experience-page social-page">
      <div className="experience-intro">
        <span className="section-kicker">Experiencias · 01</span>
        <h1>
          REDES
          <br />
          <em>SOCIALES</em><i>.</i>
        </h1>
        <p>
          He trabajado creando contenido que traduce ideas en conversaciones reales. Me gusta encontrar el tono, el formato y la historia que hacen que una marca se sienta humana, cercana y relevante en cada plataforma.
        </p>
      </div>
      <div className="reels-section">
        <div className="experience-subheading">
          <div>
            <span>Selección de contenido</span>
            <h2>VIDEOS</h2>
          </div>
          <div className="reel-arrows">
            <button type="button" className="carousel-arrow" onClick={() => move(-1)} aria-label="Videos anteriores">
              <Arrow left />
            </button>
            <button type="button" className="carousel-arrow" onClick={() => move(1)} aria-label="Videos siguientes">
              <Arrow />
            </button>
          </div>
        </div>
        <div className="reels-track" ref={reelsRef}>
          {reels.map((reel) => {
            const thumb = reel.videoUrl ? getYouTubeThumbnail(reel.videoUrl) : null;
            return (
              <article
                className="reel-card"
                key={reel.number}
                onClick={() => setActiveReel(reel)}
                style={{ cursor: "pointer" }}
              >
                <div className={`reel-media media-${reel.color}`}>
                  {thumb && <img className="media-thumb" src={thumb} alt={reel.title} loading="lazy" onError={handleThumbError} onLoad={handleThumbLoad} />}
                  <span className="reel-number">{reel.number}</span>
                  <span className="reel-orbit" />
                  <span className="play-icon"><Play /></span>
                </div>
                <h3>{reel.title}</h3>
              </article>
            );
          })}
        </div>
      </div>

      {activeReel && <ReelModal reel={activeReel} onClose={() => setActiveReel(null)} />}
    </section>
  );
}
