document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get input values
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user exists
            const storedUser = users.find(user => user.email === email && user.password === password);

            if (storedUser) {
                // Save user session
                localStorage.setItem("loggedInUser", storedUser.name);
                localStorage.setItem("userEmail", storedUser.email);

                // Redirect to homepage
                window.location.href = "/index.html";
            } else {
                errorMessage.textContent = "Invalid email or password!";
                errorMessage.style.color = "red";
            }
        });
    }

    // Function to check if user is logged in & update UI
    function updateNavbar() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const signInButton = document.querySelector(".auth-button[href='login.html']");
        const signUpButton = document.querySelector(".auth-button[href='signup.html']");
        const welcomeUser = document.getElementById("welcome-user");
        const logoutButton = document.getElementById("logout-btn");

        if (loggedInUser) {
            if (signInButton) signInButton.style.display = "none";
            if (signUpButton) signUpButton.style.display = "none";

            if (welcomeUser) {
                welcomeUser.textContent = `Welcome, ${loggedInUser}`;
                welcomeUser.style.display = "block";
            }

            if (logoutButton) logoutButton.style.display = "inline";
        }
    }

    // Run updateNavbar on every page load
    updateNavbar();

    // Logout functionality
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("userEmail");

            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to home
        });
    }
});
