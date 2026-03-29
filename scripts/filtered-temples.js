// MENU TOGGLE
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.textContent = menuButton.textContent === "☰" ? "X" : "☰";
});

// FOOTER YEAR & LAST MODIFIED
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  "Last Modified: " + document.lastModified;

// TEMPLE DATA WITH PRECOMPUTED YEAR
const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005-08-07", area: 11500, year: 2005, imageUrl: "images/aba.webp" },
  { templeName: "Manti Utah", location: "Utah, USA", dedicated: "1888-05-21", area: 74792, year: 1888, imageUrl: "images/manti.webp" },
  { templeName: "Payson Utah", location: "Utah, USA", dedicated: "2015-06-07", area: 96630, year: 2015, imageUrl: "images/payson.webp" },
  { templeName: "Salt Lake Temple", location: "Utah, USA", dedicated: "1893-04-06", area: 253000, year: 1893, imageUrl: "images/salt-lake.webp" },
  { templeName: "Accra Ghana", location: "Accra, Ghana", dedicated: "2004-01-11", area: 17500, year: 2004, imageUrl: "images/accra.webp" },
  { templeName: "Rome Italy", location: "Rome, Italy", dedicated: "2019-03-10", area: 41010, year: 2019, imageUrl: "images/rome.webp" },
  { templeName: "Paris France", location: "Paris, France", dedicated: "2016-09-15", area: 18000, year: 2016, imageUrl: "images/paris.webp" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983-12-02", area: 116642, year: 1983, imageUrl: "images/mexico.webp" },
  { templeName: "Tokyo Japan", location: "Tokyo, Japan", dedicated: "2017-05-21", area: 22000, year: 2017, imageUrl: "images/tokyo.webp" },
  { templeName: "London England", location: "London, England", dedicated: "1958-10-29", area: 9500, year: 1958, imageUrl: "images/london.webp" }
];

// CREATE TEMPLE CARD
function createTempleCard(t) {
  const card = document.createElement("section");

  const h2 = document.createElement("h2");
  h2.textContent = t.templeName;

  const pLoc = document.createElement("p");
  pLoc.innerHTML = `<strong>Location:</strong> ${t.location}`;

  const pDed = document.createElement("p");
  pDed.innerHTML = `<strong>Dedicated:</strong> ${t.dedicated}`;

  const pArea = document.createElement("p");
  pArea.innerHTML = `<strong>Area:</strong> ${t.area} sq ft`;

  const img = document.createElement("img");
  img.src = t.imageUrl;
  img.alt = t.templeName;
  img.loading = "lazy";
  img.width = 346;
  img.height = 217;
  img.decoding = "async";

  card.append(h2, pLoc, pDed, pArea, img);
  return card;
}

// DISPLAY FUNCTION WITH LAZY RENDER
const container = document.querySelector("#temple-container");
const title = document.querySelector("#title");

function displayTemplesLazy(list) {
  container.innerHTML = "";

  // Render first 3 temples immediately
  const frag = document.createDocumentFragment();
  list.slice(0, 3).forEach(t => frag.appendChild(createTempleCard(t)));
  container.appendChild(frag);

  // Render remaining temples when browser is idle
  const remaining = list.slice(3);
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const frag2 = document.createDocumentFragment();
      remaining.forEach(t => frag2.appendChild(createTempleCard(t)));
      container.appendChild(frag2);
    });
  } else {
    setTimeout(() => {
      const frag2 = document.createDocumentFragment();
      remaining.forEach(t => frag2.appendChild(createTempleCard(t)));
      container.appendChild(frag2);
    }, 50);
  }
}

// FILTER FUNCTION USING PRECOMPUTED YEAR
function filterTemples(type) {
  let filtered = [];
  switch(type) {
    case "old":
      filtered = temples.filter(t => t.year < 1900);
      title.textContent = "Old Temples"; break;
    case "new":
      filtered = temples.filter(t => t.year > 2000);
      title.textContent = "New Temples"; break;
    case "large":
      filtered = temples.filter(t => t.area > 90000);
      title.textContent = "Large Temples"; break;
    case "small":
      filtered = temples.filter(t => t.area < 10000);
      title.textContent = "Small Temples"; break;
    default:
      filtered = temples;
      title.textContent = "Home";
  }
  displayTemplesLazy(filtered);
}

// NAVIGATION CLICK (event delegation)
document.querySelector("nav").addEventListener("click", e => {
  if(e.target.tagName === "A") {
    e.preventDefault();
    filterTemples(e.target.id);
  }
});

// INITIAL LOAD
document.addEventListener("DOMContentLoaded", () => {
  displayTemplesLazy(temples);
});