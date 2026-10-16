export default function PizzaMascot() {
  return (
    <div className="mascot-wrap" aria-hidden="true">
      <svg viewBox="0 0 340 340" className="mascot-svg">
        <g className="mascot-float">
          {/* pizza body */}
          <circle cx="150" cy="190" r="118" fill="#e9b23f" stroke="#c9911f" strokeWidth="6" />
          <circle cx="150" cy="190" r="96" fill="#d9622f" />
          <circle cx="150" cy="190" r="90" fill="#e8763f" />
          {/* pepperoni */}
          <circle cx="98" cy="140" r="15" fill="#b23a22" />
          <circle cx="190" cy="130" r="14" fill="#b23a22" />
          <circle cx="205" cy="205" r="15" fill="#b23a22" />
          <circle cx="115" cy="230" r="13" fill="#b23a22" />
          <circle cx="165" cy="245" r="12" fill="#b23a22" />
          {/* basil */}
          <path d="M130 165 q10 -18 26 -10 q-6 18 -26 10 Z" fill="#5c7a4a" />
          <path d="M175 175 q12 -14 26 -4 q-8 16 -26 4 Z" fill="#5c7a4a" />
          {/* face */}
          <circle cx="120" cy="185" r="8" fill="#2a201a" />
          <circle cx="123" cy="182" r="2.4" fill="#fff" />
          <circle cx="168" cy="182" r="8" fill="#2a201a" />
          <circle cx="171" cy="179" r="2.4" fill="#fff" />
          <path d="M118 210 q26 22 54 2" stroke="#2a201a" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="103" cy="203" r="9" fill="#c9432b" opacity=".55" />
          <circle cx="192" cy="200" r="9" fill="#c9432b" opacity=".55" />
        </g>
        {/* speech bubble */}
        <g className="mascot-bubble">
          <path
            d="M218 40 C 270 32, 312 60, 308 100 C 305 134, 268 152, 230 148 C 224 160, 214 168, 202 170 C 208 158, 208 150, 204 146 C 176 136, 168 104, 188 76 C 196 54, 206 44, 218 40 Z"
            fill="#f7f1e8"
            stroke="#5c7a91"
            strokeWidth="4"
          />
          <text x="250" y="88" textAnchor="middle" className="mascot-bubble-text">PIZZA,</text>
          <text x="250" y="118" textAnchor="middle" className="mascot-bubble-text">AMORE?</text>
        </g>
        <g className="mascot-hearts">
          <path d="M292 26c-3-6-11-6-13 1-2-7-10-7-13-1-3 7 5 14 13 20 8-6 16-13 13-20Z" fill="#db1374" />
        </g>
      </svg>
    </div>
  );
}
