const methods = [
  {
    icon: '📖',
    label: 'Omläsning',
    description: 'Passiv inlärning. Minnet försvagas snabbt utan aktiv återkallning.',
    accent: false,
    badge: 'Passiv inlärning',
  },
  {
    icon: '☑️',
    label: 'Multiple choice',
    description:
      'Tränar igenkänning, inte återkallning. Hjärnan väljer bland alternativ snarare än hämtar svaret självständigt.',
    accent: false,
    badge: 'Delvis effektivt',
  },
  {
    icon: '🧠',
    label: 'Active recall',
    description:
      'Upp till 2–3× bättre långtidsretention. Hjärnan tvingas hämta svaret aktivt, vilket stärker minnesspåret varje gång.',
    accent: true,
    badge: 'Mest effektivt',
  },
];

export default function RetentionCards() {
  return (
    <div className="retention-cards-wrapper">
      <div className="retention-cards">
        {methods.map(m => (
          <div key={m.label} className={`retention-card${m.accent ? ' retention-card--accent' : ''}`}>
            {m.badge && <span className="retention-badge">{m.badge}</span>}
            <span className="retention-icon" aria-hidden="true">{m.icon}</span>
            <p className="retention-label">{m.label}</p>
            <p className="retention-desc">{m.description}</p>
          </div>
        ))}
      </div>
      <p className="retention-source">
        Roediger &amp; Karpicke (2006), Karpicke &amp; Roediger (2007).
      </p>
    </div>
  );
}
