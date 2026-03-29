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

// TEMPLE DATA (10 TOTAL, LOCAL WEBP)
const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005-08-07", area: 11500, imageUrl: "images/aba.webp" },
  { templeName: "Manti Utah", location: "Utah, USA", dedicated: "1888-05-21", area: 74792, imageUrl: "images/manti.webp" },
  { templeName: "Payson Utah", location: "Utah, USA", dedicated: "2015-06-07", area: 96630, imageUrl: "images/payson.webp" },
  { templeName: "Salt Lake Temple", location: "Utah, USA", dedicated: "1893-04-06", area: 253000, imageUrl: "images/salt-lake.webp" },
  { templeName: "Accra Ghana", location: "Accra, Ghana", dedicated: "2004-01-11", area: 17500, imageUrl: "images/accra.webp" },
  { templeName: "Rome Italy", location: "Rome, Italy", dedicated: "2019-03-10", area: 41010, imageUrl: "images/rome.webp" },
  { templeName: "Paris France", location: "Paris, France", dedicated: "2016-09-15", area: 18000, imageUrl: "images/paris.webp" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983-12-02", area: 116642, imageUrl: "images/mexico.webp" },
  { templeName: "Tokyo Japan", location: "Tokyo, Japan", dedicated: "2017-05-21", area: 22000, imageUrl: "images/tokyo.webp" },
  { templeName: "London England", location: "London, England", dedicated: "1958-10-29", area: 9500, imageUrl: "images/london.webp" }
];

// DISPLAY FUNCTION
const container = document.querySelector("#temple-container");
const title = document.querySelector("#title");

function displayTemples(list) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach(t => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h2>${t.templeName}</h2>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area} sq ft</p>
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy" width="346" height="217" decoding="async">
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// FILTER FUNCTION
function filterTemples(type) {
  let filtered = [];
  switch(type) {
    case "old":
      filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
      title.textContent = "Old Temples"; break;
    case "new":
      filtered = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
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
  displayTemples(filtered);
}

// NAVIGATION CLICK
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    filterTemples(e.target.id);
  });
});

// INITIAL LOAD
document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);
});