import './hero.css';
import useSessionStore from '../../stores/useSessionStore';

function Hero() {
  const { user } = useSessionStore();
  const firstName = user?.user_metadata?.first_name;

  if (user) {
    return (
      <section className="hero hero--logged-in">
        <picture className="hero-image">
          <source media="(max-width: 600px)" srcSet="/img/hero_portrait.png" />
          <img src="/img/hero_landscape.png" alt="" />
        </picture>
        <div className="hero-content">
          <div className="hero-eyebrow">
            Välkommen tillbaka, {firstName}!
          </div>
          <h1 className="hero-title">
            Redo att <em>trimma teorin</em>?
          </h1>
          <div className="hero-actions">
            <button className="btn-primary">Börja träna!</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero--logged-out">
      <img
        src="/img/hero_landscape.png"
        alt="Hero image"
        className="hero-image"
      />
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow__line"></span>
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
          <button className="btn-primary">Se hur det fungerar längre ner</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;