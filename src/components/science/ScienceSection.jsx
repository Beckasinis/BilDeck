import './science.css';
import ForgettingCurveChart from './ForgettingCurveChart';
import RetentionCards from './RetentionCards';

export default function ScienceSection() {
  return (
    <section className="science-section">
      <h2 className="science-heading">Varför BilDeck fungerar</h2>

      {/* Active recall vs other methods */}
      <div className="science-block">
        <div className="science-text">
          <h3 className="science-subheading">Active recall slår passive inlärning</h3>
          <p>
            När du läser om ett svar förstärks inte minnet nämnvärt – hjärnan registrerar
            informationen som bekant utan att egentligen bearbeta den. Multiple choice är bättre,
            men tränar fortfarande igenkänning snarare än verklig återkallning.
          </p>
          <p>
            Active recall – att aktivt hämta svaret ur minnet innan du ser facit – tvingar
            hjärnan att söka och återaktivera minnesspåret. Det är den ansträngningen som gör
            minnet starkare. Roediger &amp; Karpicke (2006) visade att studenter som testade sig
            själva presterade upp till 2–3× bättre på fördröjda test jämfört med de som läste om
            materialet.
          </p>
        </div>
        <RetentionCards />
      </div>

      {/* Forgetting curve + spaced repetition */}
      <div className="science-block science-block--reverse">
        <div className="science-text">
          <h3 className="science-subheading">Glömskan är exponentiell – repetition bromsar den</h3>
          <p>
            Hermann Ebbinghaus visade redan 1885 att vi glömmer ungefär 67% av ny information
            inom 24 timmar, och ~75% inom en vecka – utan repetition. Kurvan är brant i
            början och planar sedan ut.
          </p>
          <p>
            Spaced repetition – att repetera vid rätt tillfällen precis innan glömskan tar
            överhanden – bromsar kurvan dramatiskt. Varje repetition förstärker minnesspåret
            och förlänger tiden tills nästa repetition behövs. Cepeda et al. (2006) analyserade
            184 studier och bekräftade att distribuerad träning konsekvent slår massplugg.
          </p>
          <p>
            BilDeck är byggt kring detta: du sorterar korten efter om du kunde svaret eller
            inte, och repeterar de svårare korten oftare. Det är spaced repetition i praktiken.
          </p>
        </div>
        <ForgettingCurveChart />
      </div>

      {/* Metacognitive self-assessment */}
      <div className="science-block science-meta">
        <div className="science-meta-icon" aria-hidden="true">⚖️</div>
        <div className="science-text">
          <h3 className="science-subheading">Självskattning förstärker inlärningen ytterligare</h3>
          <p>
            När du bedömer om du hade rätt tränar du inte bara minnet – du tränar också din
            förmåga att känna igen vad du faktiskt kan och inte kan. Det kallas metacognitive
            accuracy och är en stark prediktor för inlärningsframgång (Schneider &amp; Preckel, 2017).
          </p>
          <p>
            Forskning visar att elever som självbedömer sina svar och sedan kontrollerar facit
            utvecklar en mer realistisk bild av sin kunskap jämfört med när någon annan rättar.
            Det gör att du lägger mer tid på det du faktiskt inte kan – inte det du tror att du
            inte kan (Cho &amp; Powers, 2019).
          </p>
        </div>
      </div>
    </section>
  );
}
