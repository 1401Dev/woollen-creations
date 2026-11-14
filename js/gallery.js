// Powers gallery.html: groups products by category and renders each section.

import { mountChrome } from "./nav.js";
import { products, categoryLabels } from "./products.js";
import { cardHTML } from "./cards.js";

function renderGallery() {
  const host = document.querySelector("[data-gallery]");
  if (!host) return;

  const grouped = products.reduce((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  const order = ["amigurumi", "wearables", "home", "accessories"];
  host.innerHTML = order
    .filter((cat) => grouped[cat] && grouped[cat].length)
    .map(
      (cat) => `
      <section class="category">
        <div class="category__head">
          <h2>${categoryLabels[cat]}</h2>
          <span class="category__count">
            ${grouped[cat].length} piece${grouped[cat].length === 1 ? "" : "s"}
          </span>
        </div>
        <div class="grid">${grouped[cat].map(cardHTML).join("")}</div>
      </section>
    `,
    )
    .join("");
}

function init() {
  mountChrome();
  renderGallery();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
