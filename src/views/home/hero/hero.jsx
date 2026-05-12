import './hero.css';
import useSessionStore from '../../../stores/useSessionStore';

function Hero() {
  const { user } = useSessionStore();
  const firstName = user?.user_metadata?.first_name;

  if (user) {
    return (
      <section className="hero hero--logged-in">
        <div className="hero-image">
          <picture>
            <source media="(max-width: 699px) and (orientation: portrait)" srcSet="/img/hero_portrait2.png" />
            <img src="/img/hero_landscape.png" alt="" />
          </picture>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            Nu kör vi, {firstName}!
          </div>
          <div className="hero-title">
            Redo att <em>trimma teorin</em>?
          </div>
          <div className="hero-actions">
            <button className="btn-primary">Börja träna!</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero--logged-out">
      <div className="hero-image">
        <picture>
          <source media="(max-width: 688px) and (orientation: portrait)" srcSet="/img/hero_portrait2.png" />
          <img src="/img/hero_landscape.png" alt="" />
        </picture>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          Körkortsteori som är rolig och fungerar
        </div>
        <h1 className="hero-title">
          Plugga smartare.<br />
          Klara teorin <em>snabbare.</em>
        </h1>
        <p className="hero-sub">
          Flashcards med active recall — allt du behöver för att ta körkort på kortast möjliga tid.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Hur fungerar det?</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;