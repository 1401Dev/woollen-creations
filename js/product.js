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
    const hasMany = product.images.length > 1;
    const main = product.images[0];

    const thumbs = product.images
      .map(
        (src, i) => `
      <button
        type="button"
        class="thumb${i === 0 ? " is-active" : ""}"
        data-thumb-index="${i}"
        aria-label="Show image ${i + 1} of ${product.images.length}"
      >
        <img src="${esc(src)}" alt="" loading="lazy" />
      </button>`,
      )
      .join("");

    const dots = hasMany
      ? `<div class="slider-dots" aria-hidden="true">
           ${product.images
             .map(
               (_, i) =>
                 `<button type="button" class="slider-dot${
                   i === 0 ? " is-active" : ""
                 }" data-dot-index="${i}" aria-label="Go to image ${i + 1}" tabindex="-1"></button>`,
             )
             .join("")}
         </div>`
      : "";

    const arrows = hasMany
      ? `<button type="button" class="slider-arrow slider-arrow--prev" data-prev aria-label="Previous image">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>
         <button type="button" class="slider-arrow slider-arrow--next" data-next aria-label="Next image">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
         </button>`
      : "";

    return `
      <div class="product__art" data-slider${
        hasMany ? ' tabindex="0" role="group" aria-roledescription="carousel"' : ""
      }>
        <div class="product__art-inner">
          <img class="product__photo" data-main src="${esc(main)}" alt="${esc(product.name)}" draggable="false" />
          ${arrows}
          ${dots}
        </div>
      </div>
      ${hasMany ? `<div class="thumbs" data-thumbs>${thumbs}</div>` : ""}
    `;
  }

  return `
    <div class="product__art">
      <div class="product__art-inner">${productArtworkSVG(product)}</div>
    </div>
  `;
}

function wireSlider(images) {
  if (!images || images.length <= 1) return;
  const slider = document.querySelector("[data-slider]");
  const main = slider?.querySelector("[data-main]");
  if (!slider || !main) return;

  let index = 0;
  const thumbs = Array.from(document.querySelectorAll("[data-thumbs] .thumb"));
  const dots = Array.from(slider.querySelectorAll(".slider-dot"));

  function preload(i) {
    const img = new Image();
    img.src = images[i];
  }

  function go(next) {
    index = ((next % images.length) + images.length) % images.length;
    main.src = images[index];
    thumbs.forEach((t, i) => t.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    preload((index + 1) % images.length);
  }

  // Arrows
  slider.querySelector("[data-prev]")?.addEventListener("click", () => go(index - 1));
  slider.querySelector("[data-next]")?.addEventListener("click", () => go(index + 1));

  // Dots
  dots.forEach((d) =>
    d.addEventListener("click", () => go(parseInt(d.dataset.dotIndex, 10))),
  );

  // Thumbnails
  thumbs.forEach((t) =>
    t.addEventListener("click", (e) => {
      e.preventDefault();
      go(parseInt(t.dataset.thumbIndex, 10));
    }),
  );

  // Click main image to advance (but not when the user was swiping)
  let suppressClick = false;
  main.addEventListener("click", () => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    go(index + 1);
  });

  // Keyboard arrows (when the slider has focus)
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  });

  // Touch swipe
  let startX = 0;
  let startY = 0;
  let active = false;
  const SWIPE_MIN = 40;

  slider.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      active = true;
      suppressClick = false;
    },
    { passive: true },
  );
  slider.addEventListener(
    "touchmove",
    (e) => {
      if (!active) return;
      const t = e.touches[0];
      if (Math.abs(t.clientX - startX) > 10) suppressClick = true;
    },
    { passive: true },
  );
  slider.addEventListener(
    "touchend",
    (e) => {
      if (!active) return;
      active = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) go(index + 1);
        else go(index - 1);
      }
    },
    { passive: true },
  );

  preload(1 % images.length);
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

  wireSlider(product.images || []);
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
