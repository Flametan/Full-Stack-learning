export default function RequestCycleDiagram() {
  const browserX = 60;
  const dnsX = 260;
  const serverX = 460;
  const top = 34;
  const bottom = 300;

  return (
    <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white p-4">
      <svg
        viewBox="0 0 520 320"
        className="mx-auto w-full max-w-[520px]"
        role="img"
        aria-label="Sequenzdiagramm: Browser fragt DNS nach der IP-Adresse, sendet dann einen HTTP-Request an den Webserver und erhält eine HTTP-Response zurück, aus der er weitere Ressourcen nachlädt."
      >
        <defs>
          <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#1a1a2e" />
          </marker>
          <marker id="arrowLeft" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6 Z" fill="#1a1a2e" />
          </marker>
        </defs>

        {/* Lifelines */}
        <line x1={browserX} y1={top} x2={browserX} y2={bottom} stroke="#1a1a2e" strokeOpacity="0.15" strokeWidth="2" />
        <line x1={dnsX} y1={top} x2={dnsX} y2={bottom} stroke="#1a1a2e" strokeOpacity="0.15" strokeWidth="2" />
        <line x1={serverX} y1={top} x2={serverX} y2={bottom} stroke="#1a1a2e" strokeOpacity="0.15" strokeWidth="2" />

        {/* Akteur-Labels */}
        <text x={browserX} y="20" fontSize="12" fontWeight="700" fill="#1a1a2e" textAnchor="middle">Browser</text>
        <text x={dnsX} y="20" fontSize="12" fontWeight="700" fill="#4f6df5" textAnchor="middle">DNS</text>
        <text x={serverX} y="20" fontSize="12" fontWeight="700" fill="#2fb88a" textAnchor="middle">Webserver</text>

        {/* 1. Browser -> DNS */}
        <line x1={browserX} y1="55" x2={dnsX - 4} y2="55" stroke="#1a1a2e" strokeWidth="1.5" markerEnd="url(#arrowRight)" />
        <text x={(browserX + dnsX) / 2} y="47" fontSize="10.5" fill="#1a1a2e" textAnchor="middle">1. Wo ist example.com?</text>

        {/* 2. DNS -> Browser */}
        <line x1={dnsX} y1="85" x2={browserX + 4} y2="85" stroke="#4f6df5" strokeWidth="1.5" markerEnd="url(#arrowLeft)" />
        <text x={(browserX + dnsX) / 2} y="77" fontSize="10.5" fill="#4f6df5" textAnchor="middle">2. 93.184.216.34</text>

        {/* 3. Browser -> Server */}
        <line x1={browserX} y1="130" x2={serverX - 4} y2="130" stroke="#1a1a2e" strokeWidth="1.5" markerEnd="url(#arrowRight)" />
        <text x={(browserX + serverX) / 2} y="122" fontSize="10.5" fill="#1a1a2e" textAnchor="middle">3. GET / HTTP/1.1</text>

        {/* 4. Server -> Browser */}
        <line x1={serverX} y1="165" x2={browserX + 4} y2="165" stroke="#2fb88a" strokeWidth="1.5" markerEnd="url(#arrowLeft)" />
        <text x={(browserX + serverX) / 2} y="157" fontSize="10.5" fill="#2fb88a" textAnchor="middle">4. 200 OK + HTML</text>

        {/* 5. Browser -> Server (weitere Ressourcen), gestrichelt */}
        <line
          x1={browserX}
          y1="205"
          x2={serverX - 4}
          y2="205"
          stroke="#1a1a2e"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#arrowRight)"
        />
        <text x={(browserX + serverX) / 2} y="197" fontSize="10.5" fill="#1a1a2e" opacity="0.7" textAnchor="middle">
          5. GET /style.css, /app.js, …
        </text>

        {/* 6. Browser rendert */}
        <rect x={browserX - 55} y="235" width="110" height="34" rx="8" fill="#4f6df5" fillOpacity="0.08" />
        <text x={browserX} y="248" fontSize="10.5" fontWeight="600" fill="#1a1a2e" textAnchor="middle">
          6. Browser rendert
        </text>
        <text x={browserX} y="261" fontSize="10.5" fill="#1a1a2e" textAnchor="middle">
          die Seite
        </text>
      </svg>
    </div>
  );
}
