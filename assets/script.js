// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Active nav highlight (based on what section is in view)
const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const obs = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    links.forEach(a => a.classList.remove("active"));
    const id = "#" + e.target.id;
    const active = links.find(a => a.getAttribute("href") === id);
    if (active) active.classList.add("active");
  }
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(s => obs.observe(s));

// Lightbox for gallery images
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-img");
const closeBtn = lightbox?.querySelector(".lightbox-close");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const img = e.target.closest("img.thumb");
  if (img) {
    openLightbox(img.src, img.alt);
    return;
  }

  if (e.target === lightbox || e.target.classList.contains("lightbox-img")) {
    closeLightbox();
  }
  if (e.target === closeBtn) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
