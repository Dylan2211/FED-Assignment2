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
    e.preventDefault(); // Prevent default form submission
    passwordError.style.display = "none"; // Hide error message

    // Save user data to localStorage
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    // Simulate account creation (replace this with actual backend logic)
    alert("Account created successfully! Redirecting to your profile...");

    // Redirect to profile.html after 2 seconds
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 2000); // 2000 milliseconds = 2 seconds
  }
});
