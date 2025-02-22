document.addEventListener("DOMContentLoaded", function () {
    // Sticky Navbar Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }
    });

    // Search Bar Expansion
    const searchInput = document.getElementById("search-bar");
    searchInput?.addEventListener("focus", () => (searchInput.style.width = "250px"));
    searchInput?.addEventListener("blur", () => (searchInput.style.width = "180px"));

    // User Dropdown Toggle
    const userMenu = document.querySelector(".user-menu");
    const dropdown = document.getElementById("dropdown-menu");
    if (userMenu && dropdown) {
        userMenu.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!userMenu.contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    }

    // Homepage Background Fade-in
    const homepageBg = document.getElementById("homepage-img-background");
    if (homepageBg) {
        setTimeout(() => (homepageBg.style.opacity = "1"), 500);
    }

    // Transport Modules Sticky Effect
    const transportModules = document.getElementById("transport-modules");
    if (transportModules && navbar) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > navbar.offsetHeight) {
                transportModules.classList.add("sticky-transport");
            } else {
                transportModules.classList.remove("sticky-transport");
            }
        });
    }

    // Collections Scroll
    const scrollContainer = document.getElementById("collections");
    if (scrollContainer) {
        document.getElementById("scroll-left")?.addEventListener("click", () => {
            scrollContainer.scrollBy({ left: -250, behavior: "smooth" });
        });

        document.getElementById("scroll-right")?.addEventListener("click", () => {
            scrollContainer.scrollBy({ left: 250, behavior: "smooth" });
        });
    }

    // User Authentication Handling
    updateNavbar();

    // Logout Function
    document.getElementById("logout-btn")?.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("loggedInUser");
        updateNavbar();
        window.location.href = "/Pages/login.html"; // Redirect to login
    });

    // Auto Logout on Page Unload
    window.addEventListener("beforeunload", function () {
        localStorage.removeItem("loggedInUser");
    });
});

// Function to Update Navbar
function updateNavbar() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const signInButton = document.querySelector(".auth-button[href='/Pages/login.html']");
    const signUpButton = document.querySelector(".auth-button[href='/Pages/signup.html']");
    const welcomeUser = document.getElementById("welcome-user");
    const profileSection = document.getElementById("profile-section");

    if (loggedInUser) {
        signInButton?.style.setProperty("display", "none");
        signUpButton?.style.setProperty("display", "none");
        if (welcomeUser) {
            welcomeUser.textContent = `Welcome, ${loggedInUser}!`;
            welcomeUser.style.color = "white";
        }
        profileSection?.style.setProperty("display", "flex");
    } else {
        signInButton?.style.setProperty("display", "inline-block");
        signUpButton?.style.setProperty("display", "inline-block");
        if (welcomeUser) welcomeUser.textContent = "";
        profileSection?.style.setProperty("display", "none");
    }
}


function checkPNR() {
    const pnr = document.getElementById("pnr").value.trim();
    const type = document.getElementById("pnr-type").value;
    const resultDiv = document.getElementById("pnr-result");

    if (pnr.length !== 10 || isNaN(pnr)) {
        resultDiv.innerHTML = "<p class='error'>Please enter a valid 10-digit PNR number.</p>";
        return;
    }

    resultDiv.innerHTML = `<p>Fetching ${type} PNR status for ${pnr}...</p>`;

    // Simulating API call (Replace with actual API request)
    setTimeout(() => {
        resultDiv.innerHTML = `<p class='success'>Your ${type} PNR ${pnr} is confirmed!</p>`;
    }, 2000);
}

// Ensure user is logged in before booking
function checkLogin() {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (!isLoggedIn) {
        alert("You must be logged in to book. Redirecting to login page...");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".book-hotel-btn, .book-bus-btn, .book-train-btn, .book-flight-btn, .book-cab-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            if (!checkLogin()) {
                event.preventDefault(); // Stop booking if not logged in
            }
        });
    });
});
