import type { Work } from "../../types";
import { Play } from "../common/Icons";
import { getYouTubeThumbnail, handleThumbError, handleThumbLoad } from "../../utils/youtube";

export interface WorkCardProps {
  work: Work;
  onOpen: (work: Work) => void;
}

export default function WorkCard({ work, onOpen }: WorkCardProps) {
  // Si hay un videoUrl, intentamos obtener la miniatura de YouTube
  const thumb = work.thumbnail ?? (work.videoUrl ? getYouTubeThumbnail(work.videoUrl) : null);

  return (
    <button type="button" className="work-card" onClick={() => onOpen(work)}>
      <div className={`work-media media-${work.color}`}>
        {/* Miniatura de YouTube si está disponible */}
        {thumb && (
          <img
            className="media-thumb"
            src={thumb}
            alt={work.title}
            loading="lazy"
            onError={handleThumbError}
            onLoad={handleThumbLoad}
          />
        )}
        <span className="media-number">{String(work.id).padStart(2, "0")}</span>
        {!thumb && <span className="media-shape shape-one" />}
        {!thumb && <span className="media-shape shape-two" />}
        {work.type === "video" && (
          <span className="play-icon">
            <Play />
          </span>
        )}
        <span className="media-kind">{work.type}</span>
      </div>
      <div className="work-info">
        <span>
          {work.client} · {work.category}
        </span>
        <h3>{work.title}</h3>
      </div>
    </button>
  );
}
