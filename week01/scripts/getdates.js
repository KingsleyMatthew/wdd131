const year = document.querySelector("#currentyear");
const today = new Date();

year.textContent = today.getFullYear();

document.getElementById("lastModified").textContent =
"Last Modification: " + document.lastModified;