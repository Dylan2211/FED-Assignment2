// document.addEventListener("DOMContentLoaded", function () {
//     //[STEP 0]: Ensure our document is fully loaded and ready
    
//     //[STEP 1]: Define API key
//     const APIKEY = "67a45d0a0b037f61c0192cb3";
  
//     //[STEP 2]: Retrieve the user's email from the URL query parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const userEmail = urlParams.get("email");
  
//     if (!userEmail) {
//       console.error("No email provided in the URL query parameter.");
//       return;
//     }
  
//     //[STEP 3]: Build our query object and encode it for URL use
//     const queryObj = { email: userEmail };
//     const query = "?q=" + encodeURIComponent(JSON.stringify(queryObj));
  
//     //[STEP 4]: Set up our GET request settings
//     const settings = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-apikey": APIKEY,
//         "Cache-Control": "no-cache",
//       },
//     };
  
//     //[STEP 5]: Fetch the account record from RESTdb
//     fetch("https://mokeselldatabase-51ca.restdb.io/rest/account" + query, settings)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((accounts) => {
//         //[STEP 6]: Process the returned account data
//         if (accounts.length > 0) {
//           // Assume the first record is our account
//           const account = accounts[0];
  
//           //[STEP 7]: Update the DOM with the retrieved username
  
//           // Update navbar greeting (targeting the <strong> element within .user-greeting)
//           const greetingElement = document.querySelector(".user-greeting strong");
//           if (greetingElement) {
//             greetingElement.textContent = account.username;
//           }
  
//           // Update profile header (targeting the <h2> element inside .profile-info)
//           const profileNameElement = document.querySelector(".profile-info h2");
//           if (profileNameElement) {
//             profileNameElement.textContent = account.username;
//           }
//         } else {
//           console.error("No account found for email:", userEmail);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching account data:", error);
//       });
//   });


// app.js

// profile_app.js

// profile_app.js

document.addEventListener("DOMContentLoaded", function () {
    // --- Modal Elements ---
    const sellModal = document.getElementById("sellModal");
    const sellBtn = document.getElementById("sellBtn");
    const closeBtn = document.querySelector(".modal .close");
    const sellForm = document.getElementById("sellForm");
  
    // --- Open Modal When "Add" Button is Clicked ---
    sellBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      sellModal.style.display = "block";
    });
  
    // --- Close Modal When "×" is Clicked ---
    closeBtn.addEventListener("click", function () {
      sellModal.style.display = "none";
    });
  
    // --- Close Modal When Clicking Outside the Modal Content ---
    window.addEventListener("click", function (event) {
      if (event.target === sellModal) {
        sellModal.style.display = "none";
      }
    });
  
    // --- Handle Form Submission ---
    sellForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get the description and the selected image file
      const descriptionInput = document.getElementById("description").value;
      const fileInput = document.getElementById("itemimage").files[0];
  
      if (!fileInput) {
        alert("Please select an image file.");
        return;
      }
  
      // Use FileReader to convert the image file to a Base64-encoded string
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result; // e.g., "data:image/png;base64,..."
  
        // Build the payload. Field names match your restDB schema:
        // "description" and "itemimage"
        const payload = {
          description: descriptionInput,
          itemimage: base64Image,
        };
  
        // RESTdb endpoint URL – replace <your-database-name> with your actual database name
        const restdbUrl =
          "https://<your-database-name>.restdb.io/rest/listings";
  
        // Send the POST request using fetch
        fetch(restdbUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "f506c92d37e33260ff29d4524852abcfc65d8",
            "cache-control": "no-cache",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok: " + response.statusText
              );
            }
            return response.json();
          })
          .then((data) => {
            console.log("Listing created:", data);
            alert("Your item has been listed!");
  
            // Reset the form and close the modal
            sellForm.reset();
            sellModal.style.display = "none";
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("There was an error listing your item. Please try again.");
          });
      };
  
      // Read the file as a Data URL
      reader.readAsDataURL(fileInput);
    });
  });
  

  // Add this code after your account data fetch in profile_app.js
// Inside the .then((accounts) => { ... }) block after updating profile info

// Fetch listings from RESTdb
fetch("https://mokeselldatabase-eca4.restdb.io/rest/listings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "f506c92d37e33260ff29d4524852abcfc65d8",
      "Cache-Control": "no-cache"
    }
  })
  .then(response => response.json())
  .then(listings => {
    const listingContainer = document.querySelector('.listing-container');
    
    listings.forEach(listing => {
      const listingHTML = `
        <div class="listing">
          <div class="listing-top">
            <img src="images/dog.jpg" alt="User Profile" class="profile-pic" />
            <div class="user-info">
              <p class="username">${account.username}</p>
              <p class="time">7 minutes ago</p>
            </div>
          </div>
          <img src="${listing.itemimage}" alt="Product Image" class="listing-img" />
          <div class="listing-info">
            <p class="title">${listing.description}</p>
            <p class="price">S$170</p>
            <p class="condition">Lightly Used</p>
            <img src="images/heart.png" class="icon" />
          </div>
        </div>
      `;
      listingContainer.insertAdjacentHTML('beforeend', listingHTML);
    });
  })
  .catch(error => console.error('Error fetching listings:', error));