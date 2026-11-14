// Injects the shared navbar and footer on every page, and marks the current
// page's nav link so it's visually highlighted.

import { logoSVG } from "./artwork.js";

const NAV_LINKS = [
  { href: "gallery.html", label: "Gallery" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" },
];

function currentFile() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path.toLowerCase();
}

export function renderNav() {
  const host = document.querySelector("[data-nav]");
  if (!host) return;
  const here = currentFile();
  const links = NAV_LINKS.map((l) => {
    const active = l.href.toLowerCase() === here;
    return `<a class="nav__link" href="${l.href}"${
      active ? ' aria-current="page"' : ""
    }>${l.label}</a>`;
  }).join("");

  host.innerHTML = `
    <div class="container nav__inner">
      <a class="nav__brand" href="index.html" aria-label="Woollen Creations home">
        ${logoSVG}
        <span>Woollen Creations</span>
      </a>
      <nav class="nav__links" aria-label="Primary">${links}</nav>
    </div>
  `;
}

export function renderFooter() {
  const host = document.querySelector("[data-footer]");
  if (!host) return;
  host.innerHTML = `
    <div class="container footer__top">
      <div class="footer__about">
        <a class="nav__brand" href="index.html">
          ${logoSVG}
          <span>Woollen Creations</span>
        </a>
        <p>A small studio of hand-crocheted, knitted, and felted pieces,
           made slowly in small batches.</p>
      </div>
      <div class="footer__cols">
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="gallery.html">Full gallery</a></li>
            <li><a href="about.html">About the studio</a></li>
            <li><a href="contact.html">Get in touch</a></li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>Commissions open</li>
            <li>Ships worldwide</li>
            <li>Made in small batches</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; 2026 Woollen Creations. All pieces handmade with care.</p>
        <p>Every stitch one at a time.</p>
      </div>
    </div>
  `;
}

export function mountChrome() {
  renderNav();
  renderFooter();
}
