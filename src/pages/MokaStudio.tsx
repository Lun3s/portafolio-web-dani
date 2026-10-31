export default function MokaStudio() {
  return (
    <section className="moka-page">
      <div className="moka-logo-wrap">
        <span className="moka-spark spark-a">✦</span>
        <span className="moka-spark spark-b">✦</span>
        <span className="moka-spark spark-c">✦</span>
        <img className="moka-logo-img" src="/moka/mokastudio.png" alt="Logo de Moka Studio" />
      </div>
      <div className="moka-copy">
        <span className="section-kicker">Mi proyecto creativo</span>
        <h1>
          ¿QUÉ ES
          <br />
          <em>MOKA STUDIO</em><i>?</i>
        </h1>
        <p>
          Moka Studio es un espacio creativo donde las ideas toman forma a través de la comunicación, la dirección visual y el contenido audiovisual. Nace de la curiosidad y del deseo de crear universos con personalidad, cercanos y memorables.
        </p>
        <p>
          Aquí cada proyecto se trabaja con estrategia, sensibilidad y una buena dosis de juego.
        </p>
      </div>
      <img className="cat-sticker-img" src="/moka/stickerdemokastudio.png" alt="" />
    </section>
  );
}