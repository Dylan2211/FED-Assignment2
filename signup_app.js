const form = document.getElementById("signup-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");

form.addEventListener("submit", (e) => {
  // Check if passwords match
  if (passwordInput.value !== confirmPasswordInput.value) {
    e.preventDefault(); // Prevent form submission
    passwordError.style.display = "block"; // Show error message
    confirmPasswordInput.focus(); // Focus on the confirm password field
  } else {
    passwordError.style.display = "none"; // Hide error message
    alert("Account created successfully!"); // Simulate successful submission
  }
});
