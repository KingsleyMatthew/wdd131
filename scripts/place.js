// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;

// VALUES
const temp = 10;
const wind = 5;

// FUNCTION (ONE LINE)
function calculateWindChill(t, w) {
  return 13.12 + 0.6215 * t - 11.37 * w**0.16 + 0.3965 * t * w**0.16;
}

// CONDITIONS
let windChill = "N/A";

if (temp <= 10 && wind > 4.8) {
  windChill = calculateWindChill(temp, wind).toFixed(1) + " °C";
}

document.getElementById("windchill").textContent = windChill;