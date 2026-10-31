import type { Work } from "../../types";
import { Play } from "../common/Icons";
import { getYouTubeEmbedUrl, isYouTubeShort } from "../../utils/youtube";
import { useScrollLock } from "../../utils/useScrollLock";

export interface WorkModalProps {
  work: Work;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: WorkModalProps) {
  useScrollLock();
  const embedUrl = work.videoUrl ? getYouTubeEmbedUrl(work.videoUrl) : null;
  // Vertical (9:16) si se indica a mano o si el enlace es un YouTube Short
  const isVertical = work.orientation
    ? work.orientation === "vertical"
    : work.videoUrl
      ? isYouTubeShort(work.videoUrl)
      : false;

  return (
    <div
      className="work-modal"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onMouseDown={onClose}
    >
      <article className="modal-card" onMouseDown={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar vista ampliada"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Si hay videoUrl → reproduce en iframe de YouTube */}
        {embedUrl ? (
          <div className={`modal-video-wrapper${isVertical ? " modal-video-vertical" : ""}`}>
            <iframe
              className="modal-video"
              src={embedUrl}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          /* Si no hay video → muestra el placeholder de color */
          <div className={`modal-media media-${work.color}`}>
            <span className="media-number">{String(work.id).padStart(2, "0")}</span>
            <span className="media-shape shape-one" />
            <span className="media-shape shape-two" />
            {work.type === "video" && (
              <span className="play-icon">
                <Play />
              </span>
            )}
          </div>
        )}

        <div className="modal-copy">
          <span>
            {work.client} · {work.category}
          </span>
          <h2>{work.title}</h2>
          {work.description && <p>{work.description}</p>}
        </div>
      </article>
    </div>
  );
}

