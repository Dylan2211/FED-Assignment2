// Retrieve user data from localStorage (or sessionStorage)
const username = localStorage.getItem("username") || "[Username]";
const email = localStorage.getItem("email") || "[Email]";

// Display user data on the profile page
document.getElementById("profile-username").textContent = username;
document.getElementById("profile-email").textContent = email;

// Select DOM elements for mobile menu
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navbarContainer = document.querySelector(".navbar__right"); // Adjusted to target the right section
const body = document.body;

// Create and append overlay element (for closing menu on click outside)
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

/**
 * Toggle the mobile menu state and control overlay visibility.
 * Also toggles a "no-scroll" class on the body to prevent scrolling when menu is active.
 */
function toggleMenuState() {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
  navbarContainer.classList.toggle("active");
  body.classList.toggle("active");
  overlay.style.display = menu.classList.contains("is-active") ? "block" : "none";
  // Optional: prevent body scrolling when menu is active
  body.classList.toggle("no-scroll", menu.classList.contains("is-active"));
}

// Event listeners for mobile menu toggle and overlay click
menu.addEventListener("click", toggleMenuState);
overlay.addEventListener("click", toggleMenuState);
