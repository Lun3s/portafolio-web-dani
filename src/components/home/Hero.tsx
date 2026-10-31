import { Link } from "react-router";
import PortraitPlaceholder from "../common/PortraitPlaceholder";
import { socials } from "../../data/socials";

export default function Hero() {
  return (
    <div className="hero-stage">
      <div className="socials" aria-label="Redes sociales">
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
      <section className="hero" id="inicio">
        <div className="portrait-composition">
          <svg className="crayon-star" viewBox="0 0 540 540" aria-hidden="true">
            <defs>
              <filter id="rough">
                <feTurbulence baseFrequency="0.02" numOctaves="3" seed="8" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
              </filter>
            </defs>
            <path
              className="star-fill"
              d="M277 36 331 180 486 171 365 270 422 418 286 337 163 437 198 281 67 198 224 184Z"
              filter="url(#rough)"
            />
            <path
              className="star-scribble"
              d="M279 40 331 181 482 173 364 271 419 414 286 334 166 432 200 280 72 200 225 185Z"
              filter="url(#rough)"
            />
          </svg>
          <PortraitPlaceholder src="/dani/dani-portada.jpg" alt="Retrato de Dani" />
          <svg className="doodle doodle-one" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M15 2c.6 8 4 12.4 13 13-9 .6-12.4 5-13 13C14.4 20 11 15.6 2 15c9-.6 12.4-5 13-13Z" />
          </svg>
          <svg className="doodle doodle-two" viewBox="0 0 30 30" aria-hidden="true">
            <path d="M15 2c.6 8 4 12.4 13 13-9 .6-12.4 5-13 13C14.4 20 11 15.6 2 15c9-.6 12.4-5 13-13Z" />
          </svg>
        </div>
        <div className="hero-copy">
          <span className="intro-tag">
            <span /> ¡Qué gusto verte por aquí!
          </span>
          <h1>
            Hola a todos,
            <br />
            soy <em>Dani</em><i>.</i>
          </h1>
          <p>comunicadora y creativa audiovisual</p>
          <Link className="work-link" to="/trabajos">
            Conoce mi trabajo <span>↘</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
