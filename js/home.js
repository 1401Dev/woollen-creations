// Powers index.html: injects nav/footer, hero artwork and the featured grid.

import { mountChrome } from "./nav.js";
import { getFeatured, products } from "./products.js";
import { heroSceneSVG } from "./artwork.js";
import { cardHTML } from "./cards.js";

function renderHeroArt() {
  const host = document.querySelector("[data-hero-art]");
  if (host) host.innerHTML = heroSceneSVG();
}

function renderStats() {
  const made = document.querySelector("[data-stat-made]");
  if (made) made.textContent = `${products.length * 8}+`;
}

function renderFeatured() {
  const host = document.querySelector("[data-featured]");
  if (!host) return;
  host.innerHTML = getFeatured().map(cardHTML).join("");
}

function init() {
  mountChrome();
  renderHeroArt();
  renderStats();
  renderFeatured();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
