document.getElementById("search-hotels").addEventListener("click", function () {
    const location = document.getElementById("location").value.trim();
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const resultsDiv = document.getElementById("hotel-results");

    if (!location || !checkin || !checkout) {
        alert("Please fill in all fields.");
        return;
    }

    resultsDiv.innerHTML = `<p>Searching hotels in <strong>${location}</strong> from <strong>${checkin}</strong> to <strong>${checkout}</strong>...</p>`;

    setTimeout(() => {
        const hotels = [
            { id: 1, name: "Grand Plaza Hotel", rating: "4-star", features: "Free Wi-Fi | Breakfast included", price: "$120/night" },
            { id: 2, name: "Cozy Stay Inn", rating: "3-star", features: "Near city center | Budget-friendly", price: "$80/night" },
            { id: 3, name: "Luxury Suites", rating: "5-star", features: "Ocean view | Pool & Spa", price: "$200/night" }
        ];

        resultsDiv.innerHTML = "<h2>Available Hotels:</h2>";
        hotels.forEach(hotel => {
            const hotelItem = document.createElement("div");
            hotelItem.classList.add("hotel-option");
            hotelItem.innerHTML = `
                <h3>${hotel.name}</h3>
                <p><strong>${hotel.rating}</strong> | ${hotel.features}</p>
                <p><strong>Price:</strong> ${hotel.price}</p>
                <button class="book-hotel-btn" data-id="${hotel.id}" data-name="${hotel.name}" 
                    data-price="${hotel.price}" data-rating="${hotel.rating}" 
                    data-features="${hotel.features}">Book Now</button>
            `;
            resultsDiv.appendChild(hotelItem);
        });

        document.querySelectorAll(".book-hotel-btn").forEach(button => {
            button.addEventListener("click", function () {
                const hotelName = this.getAttribute("data-name");
                const price = this.getAttribute("data-price");
                const rating = this.getAttribute("data-rating");
                const features = this.getAttribute("data-features");

                openPaymentModal({ location, checkin, checkout, hotelName, price, rating, features });
            });
        });
    }, 1500);
});

function openPaymentModal(bookingDetails) {
    document.getElementById("payment-modal").style.display = "block";
    document.getElementById("payment-details").innerHTML = `
        <p><strong>Hotel:</strong> ${bookingDetails.hotelName}</p>
        <p><strong>Location:</strong> ${bookingDetails.location}</p>
        <p><strong>Check-in:</strong> ${bookingDetails.checkin}</p>
        <p><strong>Check-out:</strong> ${bookingDetails.checkout}</p>
        <p><strong>Rating:</strong> ${bookingDetails.rating}</p>
        <p><strong>Features:</strong> ${bookingDetails.features}</p>
        <p><strong>Price:</strong> ${bookingDetails.price}</p>
    `;

    document.getElementById("confirm-payment").onclick = function () {
        processPayment(bookingDetails);
    };
}

function processPayment(bookingDetails) {
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvv = document.getElementById("card-cvv").value.trim();
    const confirmButton = document.getElementById("confirm-payment");

    if (!validateCardDetails(cardNumber, expiry, cvv)) {
        alert("Invalid card details. Please check again.");
        return;
    }

    confirmButton.disabled = true;
    confirmButton.textContent = "Processing...";

    setTimeout(() => {
        localStorage.setItem("hotelBooking", JSON.stringify(bookingDetails));
        alert("Payment Successful! Your hotel has been booked.");
        closePaymentModal();
        displayBookingDetails();
        confirmButton.disabled = false;
        confirmButton.textContent = "Confirm Payment";
    }, 2000);
}

function validateCardDetails(number, expiry, cvv) {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    const [month, year] = expiry.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (
        cardRegex.test(number) &&
        expiryRegex.test(expiry) &&
        parseInt(year) >= currentYear &&
        (parseInt(year) > currentYear || parseInt(month) >= currentMonth) &&
        cvvRegex.test(cvv)
    );
}

function closePaymentModal() {
    document.getElementById("payment-modal").style.display = "none";
}

function displayBookingDetails() {
    const storedBooking = JSON.parse(localStorage.getItem("hotelBooking"));
    if (storedBooking) {
        document.getElementById("hotel-results").innerHTML = `
            <h2>Booking Confirmed!</h2>
            <p style="color: green;">Your stay has been successfully booked!</p>
            <p><strong>Hotel:</strong> ${storedBooking.hotelName}</p>
            <p><strong>Location:</strong> ${storedBooking.location}</p>
            <p><strong>Check-in:</strong> ${storedBooking.checkin}</p>
            <p><strong>Check-out:</strong> ${storedBooking.checkout}</p>
            <p><strong>Rating:</strong> ${storedBooking.rating}</p>
            <p><strong>Features:</strong> ${storedBooking.features}</p>
            <p><strong>Price:</strong> ${storedBooking.price}</p>
            <button id="cancel-booking">Cancel Booking</button>
        `;
    }
}

document.addEventListener("DOMContentLoaded", displayBookingDetails);
