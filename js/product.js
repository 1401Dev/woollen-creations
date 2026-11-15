// Powers product.html: reads ?slug=... from the URL and renders the matching
// item, plus a "more in this category" strip.

import { mountChrome } from "./nav.js";
import { products, getProduct, categoryLabels } from "./products.js";
import { productArtworkSVG } from "./artwork.js";
import { cardHTML } from "./cards.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderNotFound() {
  const host = document.querySelector("[data-product]");
  if (!host) return;
  host.innerHTML = `
    <div class="about" style="padding: 4rem 0;">
      <p class="eyebrow">404</p>
      <h1>We couldn't find that piece</h1>
      <p style="margin-top:1rem; color:var(--muted); font-size:1.05rem;">
        It may have found a new home. Head back to the gallery to see what's
        in the studio now.
      </p>
      <p style="margin-top:1.5rem;">
        <a class="btn btn--primary" href="gallery.html">Back to the gallery</a>
      </p>
    </div>
  `;
  document.title = "Not found · Woollen Creations";
}

function productMedia(product) {
  if (product.images && product.images.length) {
    const main = product.images[0];
    const thumbs = product.images
      .map(
        (src, i) => `
      <button
        type="button"
        class="thumb${i === 0 ? " is-active" : ""}"
        data-src="${esc(src)}"
        aria-label="View image ${i + 1} of ${product.images.length}"
      >
        <img src="${esc(src)}" alt="" loading="lazy" />
      </button>
    `,
      )
      .join("");

    return `
      <div class="product__art">
        <div class="product__art-inner">
          <img class="product__photo" data-main src="${esc(main)}" alt="${esc(product.name)}" />
        </div>
      </div>
      ${
        product.images.length > 1
          ? `<div class="thumbs" data-thumbs>${thumbs}</div>`
          : ""
      }
    `;
  }

  return `
    <div class="product__art">
      <div class="product__art-inner">${productArtworkSVG(product)}</div>
    </div>
  `;
}

function wireThumbs() {
  const host = document.querySelector("[data-thumbs]");
  const main = document.querySelector("[data-main]");
  if (!host || !main) return;
  host.addEventListener("click", (e) => {
    const btn = e.target.closest(".thumb");
    if (!btn) return;
    const src = btn.dataset.src;
    if (!src) return;
    main.src = src;
    host.querySelectorAll(".thumb").forEach((t) => t.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
}

function renderProduct(product) {
  document.title = `${product.name} · Woollen Creations`;

  const host = document.querySelector("[data-product]");
  if (!host) return;

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const swatches = product.colors
    .map((c) => `<span class="swatch" style="background:${c}" title="${c}"></span>`)
    .join("");

  host.innerHTML = `
    <nav class="breadcrumb">
      <a href="gallery.html">Gallery</a>
      <span class="sep">/</span>
      <span>${categoryLabels[product.category]}</span>
    </nav>

    <div class="product">
      <div class="product__media-col">
        ${productMedia(product)}
      </div>

      <div class="product__info">
        <p class="eyebrow">${categoryLabels[product.category]}</p>
        <h1>${esc(product.name)}</h1>
        <p class="product__summary">${esc(product.summary)}</p>
        <p class="product__body">${esc(product.description)}</p>

        <dl class="product__meta">
          <div>
            <dt>Materials</dt>
            <dd>${product.materials.map(esc).join(", ")}</dd>
          </div>
          <div>
            <dt>Time to make</dt>
            <dd>${esc(product.madeTime)}</dd>
          </div>
          <div>
            <dt>Palette</dt>
            <dd><div class="swatches">${swatches}</div></dd>
          </div>
          <div>
            <dt>One of a kind</dt>
            <dd>Yes — commissions available in your choice of colours.</dd>
          </div>
        </dl>

        <div class="product__ctas">
          <a class="btn btn--primary" href="contact.html">Enquire about this piece</a>
          <a class="btn btn--ghost" href="gallery.html">Back to gallery</a>
        </div>
      </div>
    </div>

    ${
      related.length
        ? `
      <section class="category">
        <div class="category__head">
          <h2>More ${categoryLabels[product.category].toLowerCase()}</h2>
        </div>
        <div class="grid">${related.map(cardHTML).join("")}</div>
      </section>
    `
        : ""
    }
  `;

  wireThumbs();
}

function init() {
  mountChrome();
  const slug = new URLSearchParams(window.location.search).get("slug");
  const product = slug ? getProduct(slug) : undefined;
  if (!product) {
    renderNotFound();
    return;
  }
  renderProduct(product);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
