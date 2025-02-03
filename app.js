// Select DOM elements
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navbarContainer = document.querySelector(".navbar__container");
const body = document.body;
const overlay = document.createElement("div");

// Create and append overlay
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// ----- MOBILE MENU TOGGLE -----

// Function to toggle the mobile menu state
function toggleMenuState() {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
  navbarContainer.classList.toggle("active");
  body.classList.toggle("active");
  overlay.style.display = menu.classList.contains("is-active")
    ? "block"
    : "none";
}

// Event listener for mobile menu toggle
menu.addEventListener("click", toggleMenuState);

// Close menu when overlay is clicked
overlay.addEventListener("click", toggleMenuState);
