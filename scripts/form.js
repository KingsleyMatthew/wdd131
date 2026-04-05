// Product Array
const products = [
    {id: "p1", name: "Smart Watch"},
    {id: "p2", name: "Wireless Headphones"},
    {id: "p3", name: "Coffee Maker"},
    {id: "p4", name: "Electric Toothbrush"},
    {id: "p5", name: "Robot Vacuum"}
];

// Populate product options dynamically
const productSelect = document.getElementById('product');
if (productSelect) {
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;


// Review counter (for review.html)
const reviewCountEl = document.getElementById('reviewCount');
if (reviewCountEl) {
    let count = parseInt(localStorage.getItem('reviewCount')) || 0;
    count++;
    localStorage.setItem('reviewCount', count);
    reviewCountEl.textContent = count;
}