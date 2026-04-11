const cars = [
  {
    name: "E-Class",
    type: "sedan",
    performance: "High",
    price: "$60,000",
    img: "images/E_class.webp",
    interior: ["images/E_ClassInt.webp", "images/E_ClassInt1.webp"],
    desc: "Luxury sedan with advanced technology, ambient lighting, and premium leather interior."
  },
  {
    name: "C-Class",
    type: "sedan",
    performance: "Medium",
    price: "$45,000",
    img: "images/C_class.webp",
    interior: ["images/C_ClassInt.webp", "images/C_ClassInt1.webp"],
    desc: "Compact luxury with sporty interior and digital cockpit."
  },
  {
    name: "G-Class",
    type: "suv",
    performance: "Very High",
    price: "$130,000",
    img: "images/Glc.webp",
    interior: ["images/G_ClassInt.webp", "images/G_ClassInt1.webp"],
    desc: "Iconic off-road SUV with rugged luxury interior."
  },
  {
    name: "S-Class",
    type: "sedan",
    performance: "Ultra",
    price: "$110,000",
    img: "images/S_class.webp",
    interior: ["images/Sclass_Int.webp", "images/Sclass_Int1.webp"],
    desc: "Flagship luxury sedan with executive comfort."
  },
  {
    name: "GLC",
    type: "suv",
    performance: "High",
    price: "$55,000",
    img: "images/GLC.webp",
    interior: ["images/GLC_Int.webp", "images/GLC_Int1.webp"],
    desc: "Luxury SUV with modern practicality."
  },
  {
    name: "AMG GT",
    type: "sports",
    performance: "Extreme",
    price: "$150,000",
    img: "images/AMGGT.webp",
    interior: ["images/AMGGT_Int.webp", "images/AMGGT_Int1.webp"],
    desc: "Race-inspired performance sports car."
  }
];

let index = 0;

/* =========================
   DISPLAY CARS
========================= */
function displayCars(list) {
  const container = document.getElementById("carContainer");
  if (!container) return;

  container.innerHTML = list.map(car => `
    <div class="card">
      <img src="${car.img}" loading="lazy" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>${car.type}</p>
      <p>${car.desc}</p>
      <button class="view-btn" onclick="openModal('${car.name}')">
        View Details
      </button>
    </div>
  `).join("");
}

/* =========================
   MODAL (FIXED)
========================= */
function openModal(name) {
  const car = cars.find(c => c.name === name);
  const modal = document.getElementById("modal");

  if (!car || !modal) return;

  const interiors = car.interior.map(img => `
    <img src="${img}" class="interior-img" alt="Interior">
  `).join("");

  modal.innerHTML = `
    <div class="modal-content">
      <img src="${car.img}" class="modal-main-img" alt="${car.name}">
      
      <h2>${car.name}</h2>
      <p>${car.desc}</p>

      <p><strong>Performance:</strong> ${car.performance}</p>
      <p><strong>Price:</strong> ${car.price}</p>

      <h3>Interior</h3>
      <div class="interior-grid">
        ${interiors}
      </div>

      <button onclick="closeModal()">Close</button>
    </div>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

/* =========================
   TABLE
========================= */
function displayTable() {
  const table = document.getElementById("tableBody");
  if (!table) return;

  table.innerHTML = cars.map(car => `
    <tr>
      <td>${car.name}</td>
      <td>${car.type}</td>
      <td>${car.performance}</td>
      <td>${car.price}</td>
    </tr>
  `).join("");
}

/* =========================
   FILTER
========================= */
function filterCars(type) {
  const result = type === "all"
    ? cars
    : cars.filter(c => c.type === type);

  displayCars(result);
}

/* =========================
   SLIDER
========================= */
function showImage() {
  const img = document.getElementById("sliderImage");
  if (!img) return;
  img.src = cars[index].img;
}

function nextImage() {
  index = (index + 1) % cars.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + cars.length) % cars.length;
  showImage();
}

/* =========================
   MENU
========================= */
function toggleMenu() {
  document.querySelector("nav ul")?.classList.toggle("active");
}

/* =========================
   SEARCH
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");

  if (searchInput && suggestionsBox) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase().trim();

      if (!value) {
        suggestionsBox.style.display = "none";
        displayCars(cars);
        return;
      }

      const filtered = cars.filter(car =>
        car.name.toLowerCase().includes(value) ||
        car.type.toLowerCase().includes(value)
      );

      displayCars(filtered);
      suggestionsBox.innerHTML = "";

      filtered.forEach(car => {
        const div = document.createElement("div");

        div.innerHTML = `
          <strong>${car.name}</strong><br>
          <small>${car.type}</small>
        `;

        div.onclick = () => {
          searchInput.value = car.name;
          suggestionsBox.style.display = "none";
          displayCars([car]);
        };

        suggestionsBox.appendChild(div);
      });

      suggestionsBox.style.display = "block";
    });
  }

  displayCars(cars);
  displayTable();
  showImage();
});

/* =========================
   CONTACT FORM (FIXED)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const model = document.getElementById("model")?.value;
      const message = document.getElementById("message")?.value;

      const formData = { name, email, model, message };

      localStorage.setItem("contactData", JSON.stringify(formData));

      const feedback = document.getElementById("formFeedback");
      if (feedback) {
        feedback.textContent =
          `Thank you ${name}, we will contact you about the ${model} soon 🚗`;
      }

      contactForm.reset();
    });
  }
});

/* =========================
   MODAL CLICK OUTSIDE
========================= */
window.onclick = function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};