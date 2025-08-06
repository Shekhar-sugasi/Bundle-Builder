const products = [
  {
    id: 1,
    name: "Tie-Dye Lounge Set",
    price: 150,
    image: "./assets/LoungeSet.jpg",
  },
  {
    id: 2,
    name: "Sunburst Tracksuit",
    price: 150,
    image: "./assets/Tracksuit.jpg",
  },
  {
    id: 3,
    name: "Retro Red Streetwear",
    price: 150,
    image: "./assets/RetroStreetwear.jpg",
  },
  {
    id: 4,
    name: "Urban Sportwear Combo",
    price: 150,
    image: "./assets/UrbanSportwear.jpg",
  },
  {
    id: 5,
    name: "Oversized Knit & Coat",
    price: 150,
    image: "./assets/OversizedCoat.jpg",
  },
  {
    id: 6,
    name: "Chic Monochrome Blazer",
    price: 150,
    image: "./assets/MonochromeBlazer.jpg",
  },
];

const grid = document.querySelector(".product-grid");
const selectedList = document.querySelector(".selected-products");
const progressFill = document.querySelector(".progress-fill");
const discountValue = document.querySelector(".discount .value");
const subtotalValue = document.querySelector(".subtotal .value");
const addToCartBtn = document.querySelector(".add-to-cart");

const slots = [null, null, null];

const PLUS_ICON =
  "M8.5 3.5a.75.75 0 0 1 .75.75v3.75h3.75a.75.75 0 1 1 0 1.5H9.25V13.75a.75.75 0 1 1-1.5 0V9.5H4a.75.75 0 0 1 0-1.5h3.75V4.25c0-.414.336-.75.75-.75z";
const TICK_ICON =
  "M15.1906 5.53066L7.1906 13.5307C7.12092 13.6006 7.03813 13.6561 6.94697 13.6939C6.8558 13.7318 6.75806 13.7513 6.65935 13.7513C6.56064 13.7513 6.4629 13.7318 6.37174 13.6939C6.28057 13.6561 6.19778 13.6006 6.1281 13.5307L2.6281 10.0307C2.55834 9.9609 2.503 9.87807 2.46524 9.78692C2.42748 9.69577 2.40805 9.59807 2.40805 9.49941C2.40805 9.40075 2.42748 9.30305 2.46524 9.2119C2.503 9.12075 2.55834 9.03793 2.6281 8.96816C2.69787 8.8984 2.78069 8.84306 2.87184 8.8053C2.96299 8.76754 3.06069 8.74811 3.15935 8.74811C3.25801 8.74811 3.35571 8.76754 3.44686 8.8053C3.53801 8.84306 3.62084 8.8984 3.6906 8.96816L6.65998 11.9375L14.1294 4.46941C14.2702 4.32851 14.4613 4.24936 14.6606 4.24936C14.8599 4.24936 15.051 4.32851 15.1919 4.46941C15.3327 4.61031 15.4119 4.8014 15.4119 5.00066C15.4119 5.19992 15.3327 5.39101 15.1919 5.53191L15.1906 5.53066Z";
const CARET_WHITE = `<path d="M12.19 9.03 7.19 14.03a.75.75 0 0 1-1.06 0 .75.75 0 0 1 0-1.06L10.6 8.5 6.13 4.03a.75.75 0 1 1 1.06-1.06l5 5a.75.75 0 0 1 0 1.06Z" fill="white"/>`;
const REMOVE_SVG = `<svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true"><path d="M17 9.05h-7v7.588c0 .073.014.146.041.219a.75.75 0 0 0 .137.191.5.5 0 0 0 .177.123c.073.027.15.041.233.041h5.824c.082 0 .16-.014.232-.04a.5.5 0 0 0 .178-.124.75.75 0 0 0 .123-.191c.036-.068.055-.143.056-.219V9.05ZM16.412 7.888h2.338c.164 0 .3.06.41.178a.5.5 0 0 1 .132.556.5.5 0 0 1-.388.189h-.588v7.588a1.9 1.9 0 0 1-1.066 1.713 1.9 1.9 0 0 1-.684.137h-5.824a1.9 1.9 0 0 1-1.244-.52 1.9 1.9 0 0 1-.37-.546 1.9 1.9 0 0 1-.136-.684V9.05h-.588a.5.5 0 0 1-.41-.164.5.5 0 0 1 .41-.835h2.338v-.588c0-.237.045-.46.137-.67.09-.219.214-.406.369-.56.155-.165.337-.292.547-.383.218-.091.45-.137.697-.137h2.324c.246 0 .474.046.684.137.21.09.396.218.56.383.155.154.278.341.37.56.09.21.136.433.136.67v.588Zm-4.662 0h3.5v-.588a.5.5 0 0 0-.439-.521h-2.324a.5.5 0 0 0-.44.521v.588Zm0 3.5a.5.5 0 0 1 .164-.354.5.5 0 0 1 .707 0 .5.5 0 0 1 .164.354v3.5a.5.5 0 0 1-.872.354.5.5 0 0 1-.163-.354v-3.5Zm2.338 0a.5.5 0 0 1 .854-.354.5.5 0 0 1 .164.354v3.5a.5.5 0 0 1-.854.354.5.5 0 0 1-.164-.354v-3.5Z" fill="#666"/></svg>`;

function icon(path) {
  return `<svg width="19" height="19" viewBox="0 0 17 17"><path d="${path}" fill="currentColor"/></svg>`;
}

function renderProducts() {
  grid.innerHTML = "";
  products.forEach((p) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="toggle-button" data-id="${p.id}">
          <span class="btn-text">Add to Bundle</span>
          ${icon(PLUS_ICON)}
        </button>
      </div>
    `;
  });
  updateButtons();
}

// updating sidebar
function renderSelectedProducts() {
  selectedList.innerHTML = "";
  let subtotal = 0,
    discount = 0,
    count = 0;

  for (let i = 0; i < 3; i++) {
    const item = slots[i];
    const li = document.createElement("li");

    if (item) {
      subtotal += item.price;
      discount += item.price * 0.3;
      count++;
      li.innerHTML = `
        <img class="thumb" src="${item.image}" alt="${item.name}" />
        <div class="meta">
          <span class="name">${item.name}</span>
          <span class="price-small">$${item.price.toFixed(2)}</span>
          <div class="selected-product-quantity-container">
            <div class="qty"><button>-</button><button>1</button><button>+</button></div>
            <button class="remove-item" data-id="${
              item.id
            }">${REMOVE_SVG}</button>
          </div>
        </div>
      `;
    } else {
      li.className = "empty";
    }
    selectedList.appendChild(li);
  }

  progressFill.style.width = (count / 3) * 100 + "%";
  discountValue.textContent = `- $${discount.toFixed(2)} (${
    count > 0 ? 30 : 0
  }%)`;
  subtotalValue.textContent = `$${(subtotal - discount).toFixed(2)}`;

  addToCartBtn.disabled = count < 3;
  if (count < 3) {
    addToCartBtn.querySelector(".btn-text").textContent =
      "Add 3 Items to Proceed";
    addToCartBtn.querySelector("svg").innerHTML = CARET_WHITE;
    addToCartBtn.dataset.added = "false";
  }
  updateButtons();
}

function updateButtons() {
  document.querySelectorAll(".toggle-button").forEach((btn) => {
    const id = parseInt(btn.dataset.id);
    const inSlot = slots.findIndex((s) => s && s.id === id) !== -1;
    btn.classList.toggle("active", inSlot);
    btn.querySelector(".btn-text").textContent = inSlot
      ? "Added to Bundle"
      : "Add to Bundle";
    btn.querySelector("svg").innerHTML = inSlot
      ? `<path d="${TICK_ICON}" fill="currentColor"/>`
      : `<path d="${PLUS_ICON}" fill="currentColor"/>`;
  });
}

function toggleProduct(id) {
  const idx = slots.findIndex((s) => s && s.id === id);
  if (idx !== -1) {
    slots[idx] = null;
  } else {
    const empty = slots.findIndex((s) => !s);
    if (empty === -1) {
      alert("Bundle already has 3 items. Remove one to add another.");
      return;
    }
    slots[empty] = products.find((p) => p.id === id);
  }
  renderSelectedProducts();
}

// event listeners
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-button");
  if (btn) toggleProduct(parseInt(btn.dataset.id));
});

selectedList.addEventListener("click", (e) => {
  if (e.target.closest(".remove-item")) {
    const id = parseInt(e.target.closest(".remove-item").dataset.id);
    const idx = slots.findIndex((s) => s && s.id === id);
    if (idx !== -1) {
      slots[idx] = null;
      renderSelectedProducts();
    }
  }
});

addToCartBtn.addEventListener("click", () => {
  if (addToCartBtn.disabled) return;
  const selectedBundle = slots.filter((item) => item !== null);
  console.log("Selected Bundle:", selectedBundle);

  const added = addToCartBtn.dataset.added === "true";
  addToCartBtn.querySelector(".btn-text").textContent = added
    ? "Add 3 Items to Proceed"
    : "Added To Cart";
  addToCartBtn.querySelector("svg").innerHTML = added
    ? CARET_WHITE
    : `<path d="${TICK_ICON}" fill="white"/>`;
  addToCartBtn.dataset.added = added ? "false" : "true";
});

renderProducts();
renderSelectedProducts();
