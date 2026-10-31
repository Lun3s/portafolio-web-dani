import { useEffect } from "react";

/**
 * Bloquea el scroll de la página mientras el componente que lo usa está montado
 * (por ejemplo, un modal abierto). Compensa el ancho de la barra de scroll para
 * que el contenido no "salte" de lado al abrir o cerrar.
 */
export function useScrollLock(): void {
  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);
}
