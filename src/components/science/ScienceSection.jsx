import './science.css';
import ForgettingCurveChart from './ForgettingCurveChart';
import RetentionCards from './RetentionCards';

export default function ScienceSection() {
  return (
    <section className="science-section">
      <h2>Varför BilDeck fungerar</h2>

      {/* Active recall vs other methods */}
      <div className="science-block">
        <div className="science-text">
          <h3>Active recall slår passiv inlärning</h3>

          <p>
            Att läsa om ett svar känns effektivt, men stärker minnet ganska lite.
            Hjärnan känner mest igen informationen utan att behöva återkalla den.
          </p>

          <p>
            Multiple choice är bättre, men tränar fortfarande igenkänning mer
            än verklig återkallning.
          </p>

          <p>
            <strong>Active recall</strong> fungerar annorlunda: du försöker
            hämta svaret ur minnet innan du ser facit. Den mentala
            ansträngningen stärker minnesspåret.
          </p>

          <p>
            Roediger & Karpicke (2006) visade att studenter som testade sig
            själva presterade upp till 2–3× bättre på senare prov än de som
            bara läste om materialet.
          </p>
        </div>

        <RetentionCards />
      </div>

      {/* Forgetting curve + spaced repetition */}
      <div className="science-block science-block--reverse">
        <div className="science-text">
          <h3>Glömskan är exponentiell — repetition bromsar den</h3>

          <p>
            Hermann Ebbinghaus visade redan 1885 att vi glömmer stora delar av
            ny information snabbt — ungefär 67% inom ett dygn utan repetition.
          </p>

          <p>
            Glömskan sker snabbast i början och planar sedan gradvis ut.
          </p>

          <p>
            <strong>Spaced repetition</strong> bromsar kurvan genom att
            repetera precis innan informationen håller på att försvinna.
          </p>

          <p>
            Varje repetition stärker minnesspåret och gör att nästa repetition
            kan vänta längre. Cepeda et al. (2006) analyserade 184 studier och
            visade att distribuerad träning konsekvent slår massplugg.
          </p>

          <p>
            BilDeck bygger på samma princip: kort du missar repeteras oftare än
            kort du redan kan.
          </p>
        </div>

        <ForgettingCurveChart />
      </div>

      {/* Metacognitive self-assessment */}
      <div className="science-block science-meta">
        <div className="science-meta-icon" aria-hidden="true">
          ⚖️
        </div>

        <div className="science-text">
          <h3>Självskattning förstärker inlärningen</h3>

          <p>
            När du bedömer om du kunde svaret tränar du inte bara minnet —
            du tränar också din förmåga att förstå vad du faktiskt kan.
          </p>

          <p>
            Det kallas <strong>metacognitive accuracy</strong> och är starkt
            kopplat till bättre inlärning (Schneider & Preckel, 2017).
          </p>

          <p>
            Forskning visar att elever som självbedömer sina svar och sedan
            kontrollerar facit får en mer realistisk bild av sin kunskap.
          </p>

          <p>
            Det gör att du lägger mer tid på det du faktiskt behöver träna —
            inte det du bara tror att du behöver träna.
          </p>
        </div>
      </div>
    </section>
  );
}