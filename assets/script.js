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
