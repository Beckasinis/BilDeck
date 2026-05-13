import "./product.css";
import Wordmark from "../../../../components/wordmark";
import Button from "../../../../components/button";

export default function ProductSection() {
  return (
    <section className="product-section">
      <h2><Wordmark /> — nu som fysiska kort!</h2>

      <div className="product-inner">

        <div className="product-image">
          <img src="img/product.png" alt="BilDeck fysiska kort och teoriboken" />
        </div>

        <div className="product-txt">
          <p>
            Vi vet att skärmar i all ära, men ibland är det något visst med
            fysiska verktyg. För dig som pluggar bäst med en bok i handen eller
            vill kunna sprida ut vägmärkena på köksbordet – nu finns vår
            exklusiva kortlek att köpa.
          </p>

          <ul className="product-list">
            <li>
              <span className="icon">📵</span>
              <span>
                <strong>Koppla ner.</strong> Slipp notiser och blått ljus.
              </span>
            </li>
            <li>
              <span className="icon">👥</span>
              <span>
                <strong>Plugga tillsammans.</strong> Perfekt för att öva med
                kompisar och testa varandra.
              </span>
            </li>
            <li>
              <span className="icon">🃏</span>
              <span>
                <strong>Samma metodik.</strong> Precis som i appen sorterar du
                din kunskap i olika högar med de fysiska korten.
              </span>
            </li>
          </ul>

          <div className="product-cta">
            <span className="product-price">449.00 kr</span>
            <Button variant="primary">Köp nu</Button>
          </div>
        </div>

      </div>
    </section>
  );
}
