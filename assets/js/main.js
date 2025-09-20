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
    (document.querySelector("#site-title").innerText = e.seo.title),
    document
      .querySelector("#site-description")
      .setAttribute("content", e.seo.description);
  document
    .querySelector("#site-keywords")
    .setAttribute("content", e.seo.keywords);
  // Open Graph
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", e.seo.title);
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", e.seo.description);

  // Twitter Card
  document
    .querySelector('meta[name="twitter:title"]')
    .setAttribute("content", e.seo.title);
  document
    .querySelector('meta[name="twitter:description"]')
    .setAttribute("content", e.seo.description);
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
      (i.innerText = "Abdul Hadi"))
    : c.classList.add("d-none"),
    (document.querySelector("#footer-text").innerText = e.footer);

  e.gallery && e.gallery.title
    ? (document.querySelector("#gallery-title").innerText = e.gallery.title)
    : null;
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

async function renderGallery() {
  const data = await loadJSON("assets/data/gallery.json");
  if (!data) return;

  const container = document.querySelector("#gallery-list");
  container.innerHTML = "";

  data.forEach((item) => {
    const col = document.createElement("div");
    col.classList.add(
      "col-6",
      "col-md-4",
      "col-lg-3",
      "d-flex",
      "justify-content-center"
    );

    let mediaHTML = "";
    if (item.type === "image") {
      mediaHTML = `
    <div style="position:relative; width:100%; max-width:400px; min-width:150px; aspect-ratio:1/1; overflow:hidden; background:#f0f0f0;">
      <img src="assets/img/galery/${item.src}" 
           class="w-100 h-100 gallery-item" 
           data-type="image"
           data-src="assets/img/galery/${item.src}"
           alt="gallery item" 
           onerror="this.onerror=null;this.src='assets/img/no-image.png';"
           style="width:100%; object-fit:cover; cursor:pointer;"
           loading="lazy">
      <!-- Ikon Foto -->
      <img src="assets/img/icons/camera.png" 
           alt="Foto" 
           style="
             position:absolute;
             bottom:8px;
             right:8px;
             width:30px;
             height:30px;
             background:rgba(0,0,0,0.6);
             padding:4px;
             border-radius:50%;
           ">
    </div>
  `;
    } else if (item.type === "video") {
      mediaHTML = `
    <div style="position:relative; width:100%; max-width:400px; min-width:150px; aspect-ratio:1/1; overflow:hidden; background:#000;">
      <video class="w-100 h-100 gallery-item" 
             data-type="video"
             data-src="assets/img/galery/${item.src}"
             style="width:100%; object-fit:cover; cursor:pointer;" 
             muted>
        <source src="assets/img/galery/${item.src}" type="video/mp4">
        Browser kamu tidak mendukung video.
      </video>
      <!-- Ikon Video -->
      <img src="assets/img/icons/play.png" 
           alt="Video" 
           style="
             position:absolute;
             bottom:8px;
             right:8px;
             width:30px;
             height:30px;
             background:rgba(0,0,0,0.6);
             padding:4px;
             border-radius:50%;
           ">
    </div>
  `;
    }

    col.innerHTML = `
      <div class="card shadow-sm border-0 rounded overflow-hidden flex-fill">
        ${mediaHTML}
      </div>
    `;

    container.appendChild(col);
  });

  // Event listener modal
  document.querySelectorAll(".gallery-item").forEach((el) => {
    el.addEventListener("click", () => {
      const type = el.getAttribute("data-type");
      const src = el.getAttribute("data-src");

      let modalHTML = "";
      if (type === "image") {
        modalHTML = `
    <div class="d-flex justify-content-center align-items-center w-100 h-100" 
         style="background:black;">
      <img src="${src}" 
           class="rounded" 
           style="height:350px; max-width:90vw; max-height:90vh; width:auto; " 
           alt="preview">
    </div>`;
      } else if (type === "video") {
        modalHTML = `
    <div class="d-flex justify-content-center align-items-center w-100 h-100" 
         style="background:black;">
      <video class="rounded bg-black" 
             style="height:350px; max-width:90vw; max-height:90vh; width:auto; " 
             controls autoplay>
        <source src="${src}" type="video/mp4">
        Browser kamu tidak mendukung video.
      </video>
    </div>`;
      }

      document.querySelector("#modalContent").innerHTML = modalHTML;
      const modal = new bootstrap.Modal(
        document.getElementById("galleryModal")
      );
      modal.show();

      const modalEl = document.getElementById("galleryModal");
      // Stop video otomatis ketika modal ditutup
      modalEl.addEventListener("hide.bs.modal", (e) => {
        const video = modalEl.querySelector("video");
        if (video && !video.paused) {
          e.preventDefault(); // tahan modal
          video.pause(); // matiin video
          video.currentTime = 0; // reset ke awal
          // baru bener2 close modal
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", renderGallery);
