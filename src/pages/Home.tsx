import Hero from "../components/home/Hero";
import HomeSection from "../components/common/HomeSection";
import PortraitPlaceholder from "../components/common/PortraitPlaceholder";
import ClientsCarousel from "../components/home/ClientsCarousel";
import { tools } from "../data/tools";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeSection title="Sobre mí" className="about-section">
        <div className="about-grid">
          <PortraitPlaceholder about src="/dani/dani-sobre-mi.jpg" alt="Dani" />
          <div className="about-copy">
            <span className="quote-mark">“</span>
            <p>
              Soy Dani y tengo 22 años, Me encanta transformar ideas en contenido que se sienta actual, auténtico y que realmente conecte.
              Me muevo entre la creación de contenido, gestión de redes sociales, producción audiovisual, edición y dirección de cámaras.
              También trabajo con contenido UGC, buscando que cada pieza se sienta natural, cercana y pensada para la plataforma.
            </p>
            <p>
              Disfruto explorar tendencias, probar formatos nuevos y darle a cada proyecto su propia personalidad.
            </p>
          </div>
        </div>
      </HomeSection>
      <HomeSection title="Herramientas y Conocimientos" className="tools-section">
        <div className="tools-grid">
          {tools.map((tool) => (
            <div className="tool" key={tool.name}>
              <span>
                <img src={tool.image} alt={`Logo de ${tool.name}`} />
              </span>
              <strong>{tool.name}</strong>
            </div>
          ))}
        </div>
      </HomeSection>
      <HomeSection title="Empresas que han confiado en mí" className="clients-section">
        <ClientsCarousel />
      </HomeSection>
    </>
  );
}
