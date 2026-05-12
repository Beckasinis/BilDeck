import './howto.css';

const steps = [
  {
    number: 1,
    title: 'Utmana dig själv',
    body: (
      <>
        Läs kortet — och försök svara <strong>innan</strong> du vänder. Säg det högt om du kan.
        Det är just den ansträngningen som bränner in svaret i hjärnan.
      </>
    ),
  },
  {
    number: 2,
    title: 'Var ärlig med dig själv',
    body: (
      <>
        Svaret kom direkt, utan tvekan? →{' '}
        <span className="howto-pill howto-pill--blue">Klar</span>
        <br />
        Osäker, glömde en detalj, tvekade? →{' '}
        <span className="howto-pill howto-pill--orange">Aktiva högen</span>
        <br />
        Fuska inte med dig själv — det är bara du som förlorar på det.
      </>
    ),
    active: true,
  },
  {
    number: 3,
    title: 'Förstå varför, inte bara vad',
    body: (
      <>
        Om du svarar fel — läs förklaringen. <strong>Förstå logiken</strong> bakom regeln.
        Det du förstår glömmer du inte lika lätt.
      </>
    ),
  },
  {
    number: 4,
    title: 'Kör tills inga kort studsar tillbaka',
    body: (
      <>
        Målet per session: ta dig igenom hela leken utan att ett enda kort hamnar i Aktiva högen.{' '}
        <strong>Det betyder att du kan det nu</strong> — men inte nödvändigtvis imorgon.
      </>
    ),
  },
  {
    number: 5,
    title: 'Repetera. Repetera. Repetera.',
    body: (
      <>
        Hjärnan glömmer om du inte underhåller minnet. Kom tillbaka till kortlekarna regelbundet
        hela vägen fram till provdagen —{' '}
        <strong>det är repetition över tid som bygger äkta långtidsminne</strong>, inte en enda bra
        session.
      </>
    ),
    last: true,
  },
];

function HowToSection() {
  return (
    <section className="howto">
      <span className="howto-tag">Active recall</span>

      <h2 className="howto-headline">
        Så här lär du dig<br />
        så att det <em>faktiskt sitter</em>
      </h2>

      <p className="howto-lead">
        BilDeck är inte en vanlig pluggapp. Varje kort tvingar dig att minnas — inte bara känna
        igen. Det är skillnaden mellan att plugga kvällen innan och att faktiskt kunna det på
        provet.
      </p>

      <div className="howto-steps">
        {steps.map((step) => (
          <div
            key={step.number}
            className={[
              'howto-step',
              step.active ? 'howto-step--active' : '',
              step.last ? 'howto-step--last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="howto-step__left">
              <div className="howto-step__num">{step.number}</div>
              {!step.last && <div className="howto-step__line" />}
            </div>
            <div className="howto-step__content">
              <h4 className="howto-step__title">{step.title}</h4>
              <p className="howto-step__body">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="howto-callout">
        <span className="howto-callout__icon">⚠</span>
        <div>
          <p className="howto-callout__title">Att klara en lek ≠ att du är klar</p>
          <p className="howto-callout__body">
            Många tror att det räcker att gå igenom korten en gång utan misstag. Men minnet bleknar
            snabbt. <strong>Fortsätt repetera</strong> tills provdagen — det är det som faktiskt
            håller.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowToSection;
