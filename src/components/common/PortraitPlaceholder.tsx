import { useState } from "react";

interface PortraitProps {
  /** true para la foto de la sección "Sobre mí"; false para la portada */
  about?: boolean;
  /** Ruta de la foto dentro de public/, ej: /dani/dani-portada.jpg */
  src?: string;
  alt?: string;
}

export default function PortraitPlaceholder({ about = false, src, alt = "Foto de Dani" }: PortraitProps) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className={`${about ? "about-photo" : "photo-placeholder"}${showPhoto ? " has-photo" : ""}`}>
      {showPhoto ? (
        // Si la foto no carga (ruta mal escrita), vuelve al marcador de siempre
        <img className="portrait-img" src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <>
          <span className="photo-spark">✦</span>
          <div className="photo-avatar">D</div>
          <span className="photo-label">Foto de Dani</span>
        </>
      )}
    </div>
  );
}
