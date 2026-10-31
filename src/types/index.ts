import type { ReactNode } from "react";

export interface SocialLink {
  label: string;
  url?: string;
  icon: ReactNode;
}

export interface Client {
  name: string;
  slug: string;
  logo?: string;
}

export interface Tool {
  name: string;
  image: string;
}

export interface Work {
  id: number;
  title: string;
  client: string;
  type: "video" | "imagen";
  category: string;
  color: string;
  /** URL completa de YouTube, ej: https://youtu.be/XXXXXXX */
  videoUrl?: string;
  /** URL de imagen de portada (thumbnail). Si no se da, se usa la miniatura de YouTube */
  thumbnail?: string;
  /** "horizontal" (16:9, por defecto) o "vertical" (9:16, para YouTube Shorts) */
  orientation?: "horizontal" | "vertical";
  /** Texto opcional del modal. Si no se escribe, no aparece ningún párrafo */
  description?: string;
}

export interface Reel {
  title: string;
  number: string;
  color: string;
  /** URL completa de YouTube, ej: https://youtu.be/XXXXXXX */
  videoUrl?: string;
}

export interface ProductionProject {
  title: string;
  role: string;
  type: "video" | "imagen";
  color: string;
  /** URL completa de YouTube, ej: https://youtu.be/XXXXXXX */
  videoUrl?: string;
  /** "horizontal" (16:9, por defecto) o "vertical" (9:16, para YouTube Shorts) */
  orientation?: "horizontal" | "vertical";
  /** URL de imagen de portada (thumbnail). Si no se da, se usa la miniatura de YouTube */
  thumbnail?: string;
}
export interface EventItem {
  name: string;
  caption: string;
  color: string;
  /** Ruta de la foto dentro de public/, ej: /eventos/evento-1.jpg */
  image?: string;
}


