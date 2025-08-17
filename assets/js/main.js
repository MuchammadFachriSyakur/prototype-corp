let currentLang = "id"; // default bahasa

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

// Fallback image
function getImageWithFallback(src, title) {
  return `<img src="${src}" class="card-img-top" alt="${title}"
            onerror="this.onerror=null;this.src='assets/img/no-image.png';">`;
}

// Render konten utama
function renderContent(data) {
  if (!data) return;

  // Navbar
  document.querySelector("#company-name").innerText = data.hero.title;
  document.querySelector("#nav-home").innerText = data.nav.home;
  document.querySelector("#nav-about").innerText = data.nav.about;
  document.querySelector("#nav-products").innerText = data.nav.products;
  document.querySelector("#nav-contact").innerText = data.nav.contact;

  // Hero
  document.querySelector("#hero-title").innerText = data.hero.title;
  document.querySelector("#hero-subtitle").innerText = data.hero.subtitle;
  document.querySelector("#hero-cta").innerText = data.hero.cta;

  // About
  document.querySelector("#about-title").innerText = data.about.title;
  document.querySelector("#about-desc").innerText = data.about.desc;

  // Products
  document.querySelector("#products-title").innerText = data.products;

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

  // Footer
  document.querySelector(
    "#footer-text"
  ).innerText = `${new Date().getFullYear()} ${data.hero.title}`;
}

// Render produk
function renderProducts(products) {
  if (!products) return;
  const container = document.querySelector("#products-list");
  container.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        ${getImageWithFallback(p.img, p.title)}
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
