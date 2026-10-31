import { useState } from "react";
import { Play } from "../components/common/Icons";
import { productions } from "../data/productions";
import type { ProductionProject } from "../types";
import { getYouTubeId, getYouTubeThumbnail } from "../utils/youtube";

function ProductionMedia({ project, index }: { project: ProductionProject; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const videoUrl = project.videoUrl;
  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  // Sin enlace de YouTube: se mantiene el marcador de color de siempre
  if (!videoUrl || !videoId) {
    return (
      <div className="production-media">
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        <span className={`production-frame accent-${project.color}`} />
        {project.type === "video" && (
          <span className="play-icon">
            <Play />
          </span>
        )}
        <span className="media-kind">{project.type}</span>
      </div>
    );
  }

  const orientation = project.orientation ?? "horizontal";
  const thumb = thumbFailed
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : getYouTubeThumbnail(videoUrl);

  return (
    <div className={`production-media is-video is-${orientation}`}>
      {playing ? (
        // El reproductor solo se carga al hacer clic, para que la página abra rápido
        <iframe
          className="production-video"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1`}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <button
            type="button"
            className="production-play"
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir ${project.title}`}
          >
            {thumb && (
              <img
                className="production-thumb"
                src={thumb}
                alt=""
                loading="lazy"
                onError={() => setThumbFailed(true)}
              />
            )}
            <span className="play-icon">
              <Play />
            </span>
          </button>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="media-kind">video</span>
        </>
      )}
    </div>
  );
}

export default function ProductionPage() {
  return (
    <section className="experience-page production-page">
      <div className="production-heading">
        <span className="section-kicker">Experiencias · 02</span>
        <h1>
          PRODUCCIÓN
          <br />
          <em>AUDIOVISUAL</em><i>.</i>
        </h1>
      </div>
      <div className="production-list">
        {productions.map((project, index) => (
          <article className="production-project" key={project.title}>
            <ProductionMedia project={project} index={index} />
            <div className="production-copy">
              <span>Proyecto {String(index + 1).padStart(2, "0")}</span>
              <h2>{project.title}</h2>
              <p>{project.role}</p>
              <i>idea y puesto</i>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
