import { useState } from "react";
import { Link } from "react-router";
import { Arrow } from "../common/Icons";
import { clients } from "../../data/clients";

export default function ClientsCarousel() {
  const [start, setStart] = useState(0);
  const shown = Array.from({ length: 6 }, (_, index) => clients[(start + index) % clients.length]);

  return (
    <div className="client-carousel">
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => setStart((current) => (current - 1 + clients.length) % clients.length)}
        aria-label="Clientes anteriores"
      >
        <Arrow left />
      </button>
      <div className="client-track">
        {shown.map((client) => (
          <Link key={client.slug} to={`/trabajos?cliente=${client.slug}`}>
            <span className="client-logo">
              {client.logo ? <img src={client.logo} alt={`Logo de ${client.name}`} /> : client.name}
            </span>
            <strong>{client.name}</strong>
          </Link>
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => setStart((current) => (current + 1) % clients.length)}
        aria-label="Clientes siguientes"
      >
        <Arrow />
      </button>
    </div>
  );
}
