document.addEventListener("DOMContentLoaded", function () {
  // Function to show the redirect modal
  function showRedirectModal() {
    document.getElementById("gameRedirectModal").style.display = "block";
  }
  // Show the modal every 90 seconds (90000 ms)
  setInterval(showRedirectModal, 90000);

  // Redirect to game.html when the "Play" button is clicked
  document
    .getElementById("playGameButton")
    .addEventListener("click", function () {
      window.location.href = "game.html";
    });
  // Close the modal when the "Close" button is clicked
  document
    .getElementById("closeRedirectModal")
    .addEventListener("click", function () {
      document.getElementById("gameRedirectModal").style.display = "none";
    });
});
