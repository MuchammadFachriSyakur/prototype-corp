let currentLang = "id"; // default

// Load JSON
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

// Render konten utama
function renderContent(data) {
  if (!data) return;

  // Navbar + Footer
  document.querySelector("#nav-company").innerText = data.company;
  document.querySelector("#site-title").innerText = data.company;
  document.querySelector("#footer-company").innerText = data.company;

  // Hero
  document.querySelector("#hero-title").innerText = data.hero.title;
  document.querySelector("#hero-subtitle").innerText = data.hero.subtitle;
  document.querySelector("#hero-hook").innerText = data.hero.hook;
  document.querySelector("#hero-cta").innerText = data.hero.cta;

  // About
  document.querySelector("#about-title").innerText = data.about.title;
  document.querySelector("#about-desc").innerText = data.about.desc;

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
  document.querySelector("#contact-maps").src = data.contact.maps;
}

// Render produk
function renderProducts(products) {
  if (!products) return;
  const container = document.querySelector("#products-list");
  container.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("col-md-6", "mb-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.title}"
          onerror="this.onerror=null;this.src='assets/img/no-image.png';">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.desc}</p>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

// Switch bahasa
async function switchLanguage(lang) {
  currentLang = lang;
  const content = await loadJSON("assets/data/content.json");
  const products = await loadJSON("assets/data/products.json");

  if (content && content[lang]) renderContent(content[lang]);
  if (products && products[lang]) renderProducts(products[lang]);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage(currentLang);

  document
    .querySelector("#btn-lang-id")
    .addEventListener("click", () => switchLanguage("id"));
  document
    .querySelector("#btn-lang-en")
    .addEventListener("click", () => switchLanguage("en"));
});
