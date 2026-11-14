// Generates the SVG "artwork" used as a placeholder image for each product.
// Each artwork uses the product's own colour palette, so the gallery already
// looks designed before any real photos exist.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

export function productArtworkSVG(product) {
  const c1 = product.colors[0] ?? "#c7b89d";
  const c2 = product.colors[1] ?? "#f4ece0";
  const c3 = product.colors[2] ?? product.colors[0] ?? "#4a4238";
  const id = product.slug;

  return `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="${esc(product.name)}"
     preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="bg-${id}" cx="30%" cy="25%" r="90%">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0.85"/>
    </radialGradient>
    <pattern id="weave-${id}" width="14" height="14" patternUnits="userSpaceOnUse">
      <path d="M0 7 Q 3.5 0, 7 7 T 14 7" fill="none" stroke="${c3}"
            stroke-opacity="0.14" stroke-width="1.2"/>
      <path d="M0 11 Q 3.5 4, 7 11 T 14 11" fill="none" stroke="${c3}"
            stroke-opacity="0.1"  stroke-width="1.2"/>
    </pattern>
  </defs>

  <rect width="400" height="400" fill="url(#bg-${id})"/>
  <rect width="400" height="400" fill="url(#weave-${id})"/>

  <g transform="translate(200 210)">
    <circle r="92" fill="${c3}" opacity="0.95"/>
    <g stroke="${c1}" stroke-opacity="0.55" stroke-width="1.6" fill="none">
      <path d="M -80 -20 Q -30 -90, 60 -70 T 80 50"/>
      <path d="M -70 20  Q -10 -40, 70 -20 T 70 70"/>
      <path d="M -60 60  Q 10 10,   60 60  T 50 80"/>
      <path d="M -30 -80 Q 40 -40,  50 30  T -20 85"/>
      <path d="M -85 10  Q -40 50,  10 30  T 85 30"/>
    </g>
    <circle r="92" fill="none" stroke="${c2}" stroke-opacity="0.3" stroke-width="2"/>
    <path d="M 85 20 Q 140 40, 150 100"
          stroke="${c3}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>

  <circle cx="120" cy="100" r="50" fill="#ffffff" opacity="0.1"/>
</svg>`.trim();
}

export function heroSceneSVG() {
  return `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="hero-bg" cx="35%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#f6e4d6"/>
      <stop offset="100%" stop-color="#e8c9b1"/>
    </radialGradient>
    <pattern id="hero-weave" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 6 Q 3 0, 6 6 T 12 6" fill="none" stroke="#8a4a30"
            stroke-opacity="0.12" stroke-width="1.2"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#hero-bg)"/>
  <rect width="400" height="400" fill="url(#hero-weave)"/>

  <g transform="translate(135 230) rotate(-10)">
    <ellipse cx="0" cy="0" rx="110" ry="100" fill="#b5593d"/>
    <g fill="none" stroke="#f1d6a5" stroke-opacity="0.55" stroke-width="2">
      <path d="M -95 -20 Q -30 -105, 80 -70 T 95 50"/>
      <path d="M -80 30 Q 0 -40,  90 -10 T 60 90"/>
      <path d="M -60 70 Q 20 10,  70 60  T 30 95"/>
      <path d="M -35 -85 Q 50 -50, 60 25 T -25 90"/>
    </g>
  </g>

  <g transform="translate(275 150)">
    <circle r="60" fill="#5a4030"/>
    <g fill="none" stroke="#e4d8c3" stroke-opacity="0.5" stroke-width="1.5">
      <path d="M -50 -10 Q -20 -60, 40 -45 T 55 25"/>
      <path d="M -40 20 Q 0 -20,  55 -10 T 40 55"/>
      <path d="M -25 50 Q 15 15,  50 40  T 15 60"/>
    </g>
  </g>

  <path d="M 245 260 Q 310 290, 330 360"
        stroke="#8c3f28" stroke-width="3" stroke-linecap="round" fill="none"/>

  <g stroke="#3a2a1f" stroke-linecap="round">
    <line x1="60" y1="60" x2="330" y2="330" stroke-width="4"/>
    <circle cx="60" cy="60" r="6" fill="#3a2a1f"/>
  </g>
</svg>`.trim();
}

export const logoSVG = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M16 4 C 10 10, 10 22, 16 28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M22 7 C 16 13, 16 19, 22 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  <path d="M10 7 C 16 13, 16 19, 10 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
</svg>`.trim();
