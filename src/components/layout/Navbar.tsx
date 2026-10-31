import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Moon, Sun, Download, Chevron } from "../common/Icons";
import { experienceLinks, CV_URL, CV_FILE_NAME } from "../../data/navigation";

export interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ darkMode, toggleTheme }: NavbarProps) {
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExperiencesOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="nav-shell">
      <nav className="navbar" aria-label="Navegación principal">
        <button
          type="button"
          className="round-button moon-button"
          onClick={toggleTheme}
          aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
          aria-pressed={darkMode}
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
        <div className="desktop-navigation">
          <div className="nav-links">
            <Link to="/#inicio">Inicio</Link>
            <NavLink to="/moka-studio">Moka Studio</NavLink>
            <NavLink to="/trabajos">Trabajos</NavLink>
            <div className="experience-wrap">
              <button
                type="button"
                className="nav-link-button"
                onClick={() => setExperiencesOpen(!experiencesOpen)}
                aria-expanded={experiencesOpen}
              >
                Experiencias <Chevron open={experiencesOpen} />
              </button>
              {experiencesOpen && (
                <div className="experience-menu">
                  <span className="menu-kicker">Áreas creativas</span>
                  {experienceLinks.map(([label, href], index) => (
                    <Link key={href} to={href}>
                      {label}
                      <span>0{index + 1}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to={`${location.pathname}#contacto`}>Contáctame</Link>
          </div>
          <a className="download-button" href={CV_URL} download={CV_FILE_NAME}>
            Descargar CV <Download />
          </a>
        </div>
        <div className="mobile-actions">
          <a className="round-button download-icon" href={CV_URL} download={CV_FILE_NAME} aria-label="Descargar CV">
            <Download />
          </a>
          <button
            type="button"
            className={mobileOpen ? "menu-button open" : "menu-button"}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span />
            <span />
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <span className="menu-kicker">Navegación</span>
            <Link to="/#inicio">Inicio</Link>
            <Link to="/moka-studio">Moka Studio</Link>
            <Link to="/trabajos">Trabajos</Link>
            <button type="button" onClick={() => setExperiencesOpen(!experiencesOpen)}>
              Experiencias <Chevron open={experiencesOpen} />
            </button>
            {experiencesOpen && (
              <div className="mobile-submenu">
                {experienceLinks.map(([label, href]) => (
                  <Link key={href} to={href}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
            <Link to={`${location.pathname}#contacto`}>Contáctame</Link>
            <a className="mobile-cv" href={CV_URL} download={CV_FILE_NAME}>
              Descargar CV <Download />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
