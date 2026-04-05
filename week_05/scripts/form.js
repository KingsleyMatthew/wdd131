// Product Array
const products = [
    {id: "p1", name: "Smart Watch"},
    {id: "p2", name: "Wireless Headphones"},
    {id: "p3", name: "Coffee Maker"},
    {id: "p4", name: "Electric Toothbrush"},
    {id: "p5", name: "Robot Vacuum"}
];

// Populate Product Select
const productSelect = document.getElementById("product");

if (productSelect) {
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Footer Info
const yearEl = document.getElementById("year");
const modifiedEl = document.getElementById("modified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;

// Review Counter
const reviewCount = document.getElementById("reviewCount");

if (reviewCount) {
    let count = Number(localStorage.getItem("reviewCount")) || 0;
    count++;
    localStorage.setItem("reviewCount", count);
    reviewCount.textContent = count;
}