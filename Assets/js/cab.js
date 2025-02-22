document.getElementById("search-cabs").addEventListener("click", function() {
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const date = document.getElementById("date").value;

    if (!pickup || !dropoff || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const resultsDiv = document.getElementById("cab-results");
    resultsDiv.innerHTML = `<p>Searching cabs from <strong>${pickup}</strong> to <strong>${dropoff}</strong> on <strong>${date}</strong>...</p>`;

    // Simulate fetching cab options
    setTimeout(() => {
        resultsDiv.innerHTML += `
            <div class="cab-option">
                <h3>Standard Cab</h3>
                <p>Comfortable ride | Affordable price</p>
                <button>Book Now</button>
            </div>
            <div class="cab-option">
                <h3>Luxury Cab</h3>
                <p>Premium service | Extra comfort</p>
                <button>Book Now</button>
            </div>
        `;
    }, 1500);
});

document.getElementById("search-cabs").addEventListener("click", function () {
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const date = document.getElementById("date").value;
    const resultsDiv = document.getElementById("cab-results");

    if (!pickup || !dropoff || !date) {
        alert("Please fill in all fields.");
        return;
    }

    // Mock cab results (Replace with API fetch if needed)
    const availableCabs = [
        { id: 1, name: "Sedan", price: "$20" },
        { id: 2, name: "SUV", price: "$30" },
        { id: 3, name: "Luxury", price: "$50" }
    ];

    resultsDiv.innerHTML = "<h2>Available Cabs:</h2>";
    availableCabs.forEach(cab => {
        const cabItem = document.createElement("div");
        cabItem.classList.add("cab-item");
        cabItem.innerHTML = `
            <p><strong>${cab.name}</strong> - ${cab.price}</p>
            <button class="book-btn" data-id="${cab.id}" data-name="${cab.name}" data-price="${cab.price}">Book</button>
        `;
        resultsDiv.appendChild(cabItem);
    });

    // Add event listeners to "Book" buttons
    document.querySelectorAll(".book-btn").forEach(button => {
        button.addEventListener("click", function () {
            const cabName = this.getAttribute("data-name");
            const cabPrice = this.getAttribute("data-price");

            if (confirm(`Confirm booking for ${cabName} at ${cabPrice}?`)) {
                // Store booking details in localStorage
                const bookingDetails = { pickup, dropoff, date, cabName, cabPrice };
                localStorage.setItem("cabBooking", JSON.stringify(bookingDetails));

                alert("Booking Confirmed! Check booking details below.");
                displayBookingDetails();
            }
        });
    });
});

// Function to display booked cab details
function displayBookingDetails() {
    const storedBooking = JSON.parse(localStorage.getItem("cabBooking"));
    if (storedBooking) {
        document.getElementById("cab-results").innerHTML = `
            <h2>Booking Confirmed!</h2>
            <p><strong>Pickup:</strong> ${storedBooking.pickup}</p>
            <p><strong>Drop-off:</strong> ${storedBooking.dropoff}</p>
            <p><strong>Date:</strong> ${storedBooking.date}</p>
            <p><strong>Cab:</strong> ${storedBooking.cabName}</p>
            <p><strong>Price:</strong> ${storedBooking.cabPrice}</p>
            <button id="cancel-booking">Cancel Booking</button>
        `;

        // Add event listener for canceling booking
        document.getElementById("cancel-booking").addEventListener("click", function () {
            localStorage.removeItem("cabBooking");
            alert("Booking Canceled.");
            document.getElementById("cab-results").innerHTML = "";
        });
    }
}

// Load stored booking on page load
document.addEventListener("DOMContentLoaded", displayBookingDetails);
