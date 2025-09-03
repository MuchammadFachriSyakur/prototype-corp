let currentLang = "en";
async function loadJSON(e) {
  try {
    const t = await fetch(e);
    if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`);
    return await t.json();
  } catch (t) {
    return console.error("Gagal load JSON:", e, t), null;
  }
}
function renderContent(e) {
  if (!e) return;
  (document.querySelector("#nav-company").innerText = e.company),
    (document.querySelector("#site-title").innerText = e.company),
    (document.querySelector("#nav-about").innerText = e.nav.about),
    (document.querySelector("#nav-products").innerText = e.nav.products),
    (document.querySelector("#nav-testimonials").innerText =
      e.nav.testimonials),
    (document.querySelector("#nav-contact").innerText = e.nav.contact),
    (document.querySelector("#hero-title").innerText = e.hero.title),
    (document.querySelector("#hero-subtitle").innerText = e.hero.subtitle);
  const t = document.querySelector("#hero-hook");
  e.hero.hook && "" !== e.hero.hook.trim()
    ? ((t.innerText = e.hero.hook), t.classList.remove("d-none"))
    : t.classList.add("d-none"),
    (document.querySelector("#hero-cta").innerText = e.hero.cta),
    (document.querySelector("#about-title").innerText = e.about.title),
    (document.querySelector("#about-desc").innerText = e.about.desc),
    (document.querySelector("#about-mission-title").innerText =
      e.about.missionTitle),
    (document.querySelector("#about-vision-title").innerText =
      e.about.visionTitle);
  const n = document.querySelector("#about-vision");
  (n.innerHTML = ""),
    e.about.vision &&
      e.about.vision.forEach((e) => {
        const t = document.createElement("div");
        (t.className = "list-group-item border-0 d-flex align-items-start"),
          (t.innerHTML = `<i class="bi bi-eye-fill text-primary me-2 fs-5"></i><span class="fs-6 lh-lg">${e}</span>`),
          n.appendChild(t);
      });
  const r = document.querySelector("#about-mission");
  (r.innerHTML = ""),
    e.about.mission &&
      e.about.mission.forEach((e) => {
        const t = document.createElement("div");
        (t.className = "list-group-item border-0 d-flex align-items-start"),
          (t.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2 fs-5"></i><span class="fs-6 lh-lg">${e}</span>`),
          r.appendChild(t);
      }),
    (document.querySelector("#products-title").innerText = e.products),
    (document.querySelector("#testimonials-title").innerText =
      e.testimonials.title);
  const o = document.querySelector("#testimonials-list");
  (o.innerHTML = ""),
    e.testimonials.items.forEach((e, t) => {
      const n = document.createElement("div");
      n.classList.add("carousel-item", ...(0 === t ? ["active"] : [])),
        (n.innerHTML = `<div class="d-flex flex-column align-items-center"><blockquote class="blockquote text-center"><p class="mb-3">“${e.quote}”</p><footer class="blockquote-footer">${e.name}</footer></blockquote></div>`),
        o.appendChild(n);
    }),
    (document.querySelector("#contact-title").innerText = e.contact.title),
    (document.querySelector("#contact-address-label").innerText =
      e.contact.addressLabel),
    (document.querySelector("#contact-address").innerText = e.contact.address),
    (document.querySelector("#contact-phone-label").innerText =
      e.contact.phoneLabel),
    (document.querySelector("#contact-phone").innerText = e.contact.phone),
    (document.querySelector("#contact-email-label").innerText =
      e.contact.emailLabel),
    (document.querySelector("#contact-email").innerText = e.contact.email),
    (document.querySelector("#contact-whatsapp").href = e.contact.whatsapp),
    (document.querySelector("#contact-whatsapp").innerText = e.whatsapp),
    (document.querySelector("#contact-maps").src = e.contact.maps);
  const c = document.querySelector("#contact-linkedin-wrap"),
    a = document.querySelector("#contact-linkedin-label"),
    i = document.querySelector("#contact-linkedin");
  e.contact.linkedin && "" !== e.contact.linkedin.trim()
    ? (c.classList.remove("d-none"),
      (a.innerText = e.contact.linkedinLabel),
      (i.href = e.contact.linkedin),
      (i.innerText = e.contact.linkedin))
    : c.classList.add("d-none"),
    (document.querySelector("#footer-text").innerText = e.footer);
}
async function renderProducts(e) {
  const t = await loadJSON("assets/data/products.json");
  if (!t || !t[e]) return;
  const n = document.querySelector("#products-list");
  (n.innerHTML = ""),
    t[e].forEach((e) => {
      const t = document.createElement("div");
      t.classList.add("col-md-6", "mb-4"),
        (t.innerHTML = `<div class="card h-100 shadow-sm"><img src="${e.img}" class="card-img-top" alt="${e.title}" onerror="this.onerror=null;this.src='assets/img/no-image.png';" style="height:300px; object-fit:cover;" loading="lazy"><div class="card-body"><h5 class="card-title">${e.title}</h5><p class="card-text">${e.desc}</p></div></div>`),
        n.appendChild(t);
    });
}
async function switchLanguage(e) {
  currentLang = e;
  const t = await loadJSON("assets/data/content.json");
  t && t[e] && renderContent(t[e]), renderProducts(e);
}
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage(currentLang);
  const e = document.querySelector("#lang-switcher");
  (e.value = currentLang),
    e.addEventListener("change", (t) => switchLanguage(t.target.value));
});
