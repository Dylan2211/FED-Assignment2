document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".profile-tabs a");

    tabs.forEach(tab => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(".profile-tabs a.active").classList.remove("active");
            this.classList.add("active");

            // Change content dynamically based on tab
            const content = document.querySelector(".profile-content");
            content.innerHTML = `<p>Content for ${this.innerText}</p>`;
        });
    });
});
