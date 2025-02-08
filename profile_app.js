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
  