import { socials } from "../../data/socials";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <span className="section-kicker">Hablemos</span>
      <h2>CONTÁCTAME<span>.</span></h2>
      <div className="footer-contact">
        <a href="mailto:danigonzales02@gmail.com">danigonzalesr02@gmail.com</a>
        <a href="tel:+51963444983">963 444 983</a>
      </div>
      <div className="footer-bottom">
        <span>PORTAFOLIO · 2026</span>
        <div className="footer-socials">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url || "#"}
              aria-label={social.label}
              target={social.url?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <span>Hecho con mucha creatividad</span>
      </div>
    </footer>
  );
}
