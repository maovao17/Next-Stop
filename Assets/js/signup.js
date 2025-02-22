document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const successMessage = document.getElementById("success-message");
    const googleSignupBtn = document.getElementById("google-signup");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const dob = document.getElementById("dob").value.trim();
            const gender = document.getElementById("gender").value;
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim(); 

            if (!name || !dob || !gender || !phone || !email || !password) {
                alert("All fields are required!");
                return;
            }

            // Retrieve existing users or initialize an empty array
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if email is already registered
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                alert("Email is already registered. Please log in.");
                return;
            }

            // Store new user
            users.push({ name, dob, gender, phone, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            // Show success message
            if (successMessage) {
                successMessage.textContent = "Account created successfully!";
                successMessage.style.color = "green";
                successMessage.style.fontWeight = "bold";
            }

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }

    // Google Sign-Up Placeholder
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener("click", function () {
            alert("Google Sign-Up feature coming soon!");
        });
    }
});
