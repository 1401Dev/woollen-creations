// Shared card renderer used by the home page and the gallery.

import { categoryLabels } from "./products.js";
import { productArtworkSVG } from "./artwork.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function cardMedia(product) {
  if (product.images && product.images.length) {
    return `<img class="card__photo" src="${esc(product.images[0])}" alt="${esc(product.name)}" loading="lazy" />`;
  }
  return productArtworkSVG(product);
}

export function cardHTML(product) {
  return `
    <a class="card" href="product.html?slug=${encodeURIComponent(product.slug)}">
      <div class="card__media">
        ${cardMedia(product)}
        <span class="card__badge">${categoryLabels[product.category]}</span>
      </div>
      <div class="card__body">
        <h3>${esc(product.name)}</h3>
        <p>${esc(product.summary)}</p>
      </div>
    </a>
  `;
}
