function displayTemplesLazy(list) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  // Render first 3 temples immediately
  list.slice(0, 3).forEach(t => {
    fragment.appendChild(createTempleCard(t));
  });
  container.appendChild(fragment);

  // Render remaining temples when the browser is idle
  const remaining = list.slice(3);
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const frag = document.createDocumentFragment();
      remaining.forEach(t => frag.appendChild(createTempleCard(t)));
      container.appendChild(frag);
    });
  } else {
    // Fallback
    setTimeout(() => {
      const frag = document.createDocumentFragment();
      remaining.forEach(t => frag.appendChild(createTempleCard(t)));
      container.appendChild(frag);
    }, 50);
  }
}

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