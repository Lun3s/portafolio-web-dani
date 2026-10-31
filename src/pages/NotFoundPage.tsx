import { Link } from "react-router";

export interface NotFoundPageProps {
  title?: string;
}

export default function NotFoundPage({ title = "Página no encontrada" }: NotFoundPageProps) {
  return (
    <section className="placeholder-page">
      <span className="section-kicker">Próximamente</span>
      <h1>
        {title}<i>.</i>
      </h1>
      <p>Estamos preparando este espacio para compartir nuevos proyectos e historias.</p>
      <Link className="download-button" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
