document.addEventListener("DOMContentLoaded", function () {
  // Define our API key and endpoint for the account collection
  const APIKEY = "67a45d0a0b037f61c0192cb3";
  const API_URL = "https://mokeselldatabase-51ca.restdb.io/rest/account";

  // Retrieve the user's email from the URL query string (e.g., ?email=jamar@example.com)
  let urlParams = new URLSearchParams(window.location.search);
  let userEmail = urlParams.get("email");

  if (!userEmail) {
    console.error("No user email provided in the query parameter.");
    return;
  }

  // Build our query string to search for the account by email.
  // RESTdb expects a query parameter in the form ?q={"email": "userEmail"}
  const query = `?q={"email": "${userEmail}"}`;

  // Set up our AJAX (fetch) settings for a GET request
  let settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    }
  };

  // Make the GET request to RESTdb
  fetch(API_URL + query, settings)
    .then(response => response.json())
    .then(response => {
      // If at least one account is returned, use the first record.
      if (response.length > 0) {
        let account = response[0];

        // Update the navbar greeting: "Hello, <strong>username</strong>"
        let greetingElement = document.querySelector(".user-greeting strong");
        if (greetingElement) {
          greetingElement.innerText = account.username;
        }

        // Update the profile header with the account's username
        let profileNameElement = document.querySelector(".profile-info h2");
        if (profileNameElement) {
          profileNameElement.innerText = account.username;
        }

        // Optionally, update an email element if you have one.
        // For example, if you add an element with id "profile-email" in your HTML:
        let profileEmailElement = document.getElementById("profile-email");
        if (profileEmailElement) {
          profileEmailElement.innerText = account.email;
        }
      } else {
        console.error("No account found for email: " + userEmail);
      }
    })
    .catch(error => {
      console.error("Error fetching account data:", error);
    });
});
