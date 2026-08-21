export default function BranchDiagram() {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white p-4">
      <svg viewBox="0 0 440 150" className="mx-auto w-full max-w-[440px]" role="img" aria-label="Diagramm: Ein Feature-Branch zweigt von main ab und wird per Pull Request wieder zurückgemergt.">
        {/* main-Linie */}
        <line x1="20" y1="105" x2="410" y2="105" stroke="#4f6df5" strokeWidth="3" />
        {/* feature-Branch: zweigt ab und mergt zurück */}
        <path
          d="M150,105 L195,45 L255,45 L320,105"
          fill="none"
          stroke="#2fb88a"
          strokeWidth="3"
        />

        {/* Commits auf main */}
        <circle cx="70" cy="105" r="6" fill="#4f6df5" />
        <circle cx="150" cy="105" r="6" fill="#4f6df5" />
        <circle cx="320" cy="105" r="7" fill="#4f6df5" stroke="white" strokeWidth="2" />
        <circle cx="380" cy="105" r="6" fill="#4f6df5" />

        {/* Commits auf dem Feature-Branch */}
        <circle cx="195" cy="45" r="6" fill="#2fb88a" />
        <circle cx="255" cy="45" r="6" fill="#2fb88a" />

        {/* Beschriftungen */}
        <text x="20" y="128" fontSize="12" fill="#1a1a2e" fontFamily="ui-monospace, monospace">
          main
        </text>
        <text x="150" y="128" fontSize="10.5" fill="#1a1a2e" opacity="0.55">
          Branch erstellt
        </text>
        <text x="195" y="30" fontSize="11" fill="#1a1a2e" fontWeight="600">
          feature/kontaktformular
        </text>
        <text x="320" y="128" fontSize="10.5" fill="#1a1a2e" opacity="0.55" textAnchor="middle">
          Merge · Pull Request
        </text>
      </svg>
    </div>
  );
}
