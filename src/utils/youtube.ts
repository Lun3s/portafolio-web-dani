import type { SyntheticEvent } from "react";

/**
 * Extrae el ID de un video de YouTube desde cualquier formato de URL.
 *
 * Formatos soportados:
 *   https://www.youtube.com/watch?v=XXXXXXX
 *   https://youtu.be/XXXXXXX
 *   https://www.youtube.com/embed/XXXXXXX
 *   https://www.youtube.com/shorts/XXXXXXX
 */
export function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    // youtu.be/<id>
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("?")[0] || null;
    }
    // youtube.com/embed/<id> or /shorts/<id>
    const pathMatch = parsed.pathname.match(/\/(embed|shorts)\/([^/?#]+)/);
    if (pathMatch) return pathMatch[2];
    // youtube.com/watch?v=<id>
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

/**
 * Devuelve la URL del embed de YouTube con parámetros optimizados para portafolio.
 * - rel=0        → no muestra videos relacionados de otros canales
 * - modestbranding=1 → minimiza el logo de YouTube
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}

/**
 * Devuelve la URL de la miniatura de alta calidad de YouTube.
 */
export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

/**
 * Respaldo para miniaturas: si "maxresdefault" no existe (YouTube responde 404 o
 * una imagen gris de 120x90), cambia a "hqdefault", que siempre existe.
 */
export function handleThumbError(event: SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  if (img.src.includes("maxresdefault")) {
    img.src = img.src.replace("maxresdefault", "hqdefault");
  } else {
    img.style.display = "none";
  }
}

export function handleThumbLoad(event: SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  if (img.src.includes("maxresdefault") && img.naturalWidth <= 120) {
    img.src = img.src.replace("maxresdefault", "hqdefault");
  }
}

/**
 * Indica si el enlace es un YouTube Short (video vertical).
 * Solo se puede saber con enlaces de tipo youtube.com/shorts/<id>.
 */
export function isYouTubeShort(url: string): boolean {
  try {
    return new URL(url).pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
}