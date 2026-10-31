import { events } from "../data/events";

export default function EventsPage() {
  return (
    <section className="experience-page events-page">
      <div className="events-heading">
        <span className="section-kicker">Experiencias · 03</span>
        <h1>EVENTOS<i>.</i></h1>
      </div>
      <div className="events-grid">
        {events.map((event, index) => (
          <article className="event-card" key={event.name}>
            <div className={`event-photo${event.image ? " has-image" : ""}`}>
              {event.image ? (
                <img className="event-img" src={event.image} alt={event.name} loading="lazy" />
              ) : (
                // Sin foto: se mantiene el marcador de color de siempre
                <>
                  <span className={`event-frame accent-${event.color}`} />
                  <span className="event-photo-label">Foto</span>
                </>
              )}
              <span className="event-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2>{event.name}</h2>
            <p>{event.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
