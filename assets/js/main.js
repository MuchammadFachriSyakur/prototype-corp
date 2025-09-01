let currentLang = "en"; // default

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Gagal load JSON:", path, err);
    return null;
  }
}

function renderContent(data) {
  if (!data) return;

  // Navbar
  document.querySelector("#nav-company").innerText = data.company;
  document.querySelector("#site-title").innerText = data.company;
  document.querySelector("#nav-about").innerText = data.nav.about;
  document.querySelector("#nav-products").innerText = data.nav.products;
  document.querySelector("#nav-testimonials").innerText = data.nav.testimonials;
  document.querySelector("#nav-contact").innerText = data.nav.contact;

  // Hero
  document.querySelector("#hero-title").innerText = data.hero.title;
  document.querySelector("#hero-subtitle").innerText = data.hero.subtitle;
  const heroHook = document.querySelector("#hero-hook");
  if (data.hero.hook && data.hero.hook.trim() !== "") {
    heroHook.innerText = data.hero.hook;
    heroHook.classList.remove("d-none");
  } else heroHook.classList.add("d-none");
  document.querySelector("#hero-cta").innerText = data.hero.cta;

  // About
  document.querySelector("#about-title").innerText = data.about.title;
  document.querySelector("#about-desc").innerText = data.about.desc;

  // Vision
  const visionUl = document.querySelector("#about-vision");
  visionUl.innerHTML = "";
  if (data.about.vision) {
    data.about.vision.forEach((v) => {
      const item = document.createElement("div");
      item.className = "list-group-item border-0 d-flex align-items-start";
      item.innerHTML = `
      <i class="bi bi-eye-fill text-primary me-2 fs-5"></i>
      <span class="fs-6 lh-lg">${v}</span>
    `;
      visionUl.appendChild(item);
    });
  }

  // Mission
  const missionUl = document.querySelector("#about-mission");
  missionUl.innerHTML = "";
  if (data.about.mission) {
    data.about.mission.forEach((m) => {
      const item = document.createElement("div");
      item.className = "list-group-item border-0 d-flex align-items-start";
      item.innerHTML = `
      <i class="bi bi-check-circle-fill text-success me-2 fs-5"></i>
      <span class="fs-6 lh-lg">${m}</span>
    `;
      missionUl.appendChild(item);
    });
  }

  // Products
  document.querySelector("#products-title").innerText = data.products;

  // Testimonials
  document.querySelector("#testimonials-title").innerText =
    data.testimonials.title;
  const testiContainer = document.querySelector("#testimonials-list");
  testiContainer.innerHTML = "";
  data.testimonials.items.forEach((t, idx) => {
    const div = document.createElement("div");
    div.classList.add("carousel-item", ...(idx === 0 ? ["active"] : []));
    div.innerHTML = `
      <div class="d-flex flex-column align-items-center">
        <blockquote class="blockquote text-center">
          <p class="mb-3">“${t.quote}”</p>
          <footer class="blockquote-footer">${t.name}</footer>
        </blockquote>
      </div>`;
    testiContainer.appendChild(div);
  });

  // Contact
  document.querySelector("#contact-title").innerText = data.contact.title;
  document.querySelector("#contact-address-label").innerText =
    data.contact.addressLabel;
  document.querySelector("#contact-address").innerText = data.contact.address;
  document.querySelector("#contact-phone-label").innerText =
    data.contact.phoneLabel;
  document.querySelector("#contact-phone").innerText = data.contact.phone;
  document.querySelector("#contact-email-label").innerText =
    data.contact.emailLabel;
  document.querySelector("#contact-email").innerText = data.contact.email;
  document.querySelector("#contact-whatsapp").href = data.contact.whatsapp;
  document.querySelector("#contact-whatsapp").innerText = data.whatsapp;
  document.querySelector("#contact-maps").src = data.contact.maps;

  const linkedinWrap = document.querySelector("#contact-linkedin-wrap");
  const linkedinLabel = document.querySelector("#contact-linkedin-label");
  const linkedinLink = document.querySelector("#contact-linkedin");
  if (data.contact.linkedin && data.contact.linkedin.trim() !== "") {
    linkedinWrap.classList.remove("d-none");
    linkedinLabel.innerText = data.contact.linkedinLabel;
    linkedinLink.href = data.contact.linkedin;
    linkedinLink.innerText = data.contact.linkedin;
  } else linkedinWrap.classList.add("d-none");

  // Footer
  document.querySelector("#footer-text").innerText = data.footer;
}

async function renderProducts(lang) {
  const products = await loadJSON("assets/data/products.json");
  if (!products || !products[lang]) return;
  const container = document.querySelector("#products-list");
  container.innerHTML = "";
  products[lang].forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("col-md-6", "mb-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.title}" onerror="this.onerror=null;this.src='assets/img/no-image.png';" style="height:300px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.desc}</p>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

async function switchLanguage(lang) {
  currentLang = lang;
  const content = await loadJSON("assets/data/content.json");
  if (content && content[lang]) renderContent(content[lang]);
  renderProducts(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  switchLanguage(currentLang);
  const langSwitcher = document.querySelector("#lang-switcher");
  langSwitcher.value = currentLang;
  langSwitcher.addEventListener("change", (e) =>
    switchLanguage(e.target.value)
  );
});
