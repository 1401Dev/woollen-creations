// Shared card renderer used by the home page and the gallery.

import { categoryLabels } from "./products.js";
import { productArtworkSVG } from "./artwork.js";

export function cardHTML(product) {
  return `
    <a class="card" href="product.html?slug=${encodeURIComponent(product.slug)}">
      <div class="card__media">
        ${productArtworkSVG(product)}
        <span class="card__badge">${categoryLabels[product.category]}</span>
      </div>
      <div class="card__body">
        <h3>${product.name}</h3>
        <p>${product.summary}</p>
      </div>
    </a>
  `;
}
