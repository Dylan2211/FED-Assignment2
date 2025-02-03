/*************************************
 *          MOBILE MENU CODE         *
 *************************************/

// Select DOM elements for mobile menu
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navbarContainer = document.querySelector(".navbar__container");
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

/*************************************
 *      PRODUCT & CART CODE          *
 *************************************/

// Select DOM elements for product popup and cart
const products = document.querySelectorAll(".product");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartItems = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");
const purchaseSuccess = document.getElementById("purchase-success");

let cart = [];

/**
 * Update the cart UI with current items.
 */
function updateCart() {
  cartItems.innerHTML = ""; // Clear current cart items
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.productName;

    // Create a remove button for each item
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1); // Remove item from cart
      updateCart();         // Refresh the cart display
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

/**
 * Setup product popup events: When a product’s "Add to Cart" (view details) button is clicked,
 * show the popup with product details.
 */
products.forEach((product) => {
  const button = product.querySelector(".view-details-btn");
  button.addEventListener("click", () => {
    const productName = product.getAttribute("data-product");
    const productImg = product.querySelector("img").src;

    // Update popup content with product details
    document.getElementById("popup-title").innerText = productName;
    document.getElementById("popup-img").src = productImg;

    // Pass product details via data attributes on the add-to-cart button
    addToCartBtn.setAttribute("data-product", productName);
    addToCartBtn.setAttribute("data-img", productImg);

    popup.style.display = "flex"; // Display the popup
  });
});

// Event listener to close the popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Add product to cart when add-to-cart button in popup is clicked
addToCartBtn.addEventListener("click", () => {
  const productName = addToCartBtn.getAttribute("data-product");
  const productImg = addToCartBtn.getAttribute("data-img");

  // Add product details to the cart array
  cart.push({ productName, productImg });
  updateCart(); // Refresh cart display
  popup.style.display = "none"; // Close the popup after adding
});

// Handle checkout process
checkoutBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Ensure form details are entered and cart is not empty
  if (name && email && cart.length > 0) {
    purchaseSuccess.style.display = "block"; // Show success message
    cart = []; // Clear cart data after purchase
    updateCart(); // Refresh cart display

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  } else {
    alert("Please fill in all details and add items to the cart.");
  }
});
