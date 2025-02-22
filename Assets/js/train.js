
document.getElementById("search-trains").addEventListener("click", function () {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const resultsDiv = document.getElementById("train-results");

    if (!from || !to || !date) {
        alert("Please fill in all fields.");
        return;
    }

    resultsDiv.innerHTML = `<p>Searching trains from <strong>${from}</strong> to <strong>${to}</strong> on <strong>${date}</strong>...</p>`;

    // Simulating fetched train data
    setTimeout(() => {
        const trains = [
            { id: 1, name: "Express 101", departure: "06:00 AM", arrival: "11:30 AM", price: "$50" },
            { id: 2, name: "SuperFast 303", departure: "09:00 AM", arrival: "2:45 PM", price: "$65" },
            { id: 3, name: "Night Rider 707", departure: "10:30 PM", arrival: "5:15 AM", price: "$80" }
        ];

        resultsDiv.innerHTML = "<h2>Available Trains:</h2>";
        trains.forEach(train => {
            const trainItem = document.createElement("div");
            trainItem.classList.add("train-option");
            trainItem.innerHTML = `
                <h3>${train.name}</h3>
                <p>Departure: ${train.departure} | Arrival: ${train.arrival}</p>
                <p><strong>Price:</strong> ${train.price}</p>
                <button class="book-train-btn" data-id="${train.id}" data-name="${train.name}" 
                    data-price="${train.price}" data-departure="${train.departure}" 
                    data-arrival="${train.arrival}">Book Now</button>
            `;
            resultsDiv.appendChild(trainItem);
        });

        // Add event listeners to "Book Now" buttons
        document.querySelectorAll(".book-train-btn").forEach(button => {
            button.addEventListener("click", function () {
                const trainName = this.getAttribute("data-name");
                const price = this.getAttribute("data-price");
                const departureTime = this.getAttribute("data-departure");
                const arrivalTime = this.getAttribute("data-arrival");

                openPaymentModal({ from, to, date, trainName, price, departureTime, arrivalTime });
            });
        });
    }, 1500);
});

// Open Payment Modal
function openPaymentModal(bookingDetails) {
    document.getElementById("payment-modal").style.display = "block";
    document.getElementById("payment-details").innerHTML = `
        <p><strong>Train:</strong> ${bookingDetails.trainName}</p>
        <p><strong>From:</strong> ${bookingDetails.from} → <strong>To:</strong> ${bookingDetails.to}</p>
        <p><strong>Date:</strong> ${bookingDetails.date}</p>
        <p><strong>Departure Time:</strong> ${bookingDetails.departureTime} | <strong>Arrival Time:</strong> ${bookingDetails.arrivalTime}</p>
        <p><strong>Price:</strong> ${bookingDetails.price}</p>
    `;

    document.getElementById("confirm-payment").onclick = function () {
        processPayment(bookingDetails);
    };
}

// Process Payment
function processPayment(bookingDetails) {
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvv = document.getElementById("card-cvv").value.trim();

    if (!validateCardDetails(cardNumber, expiry, cvv)) {
        alert("Invalid card details. Please check again.");
        return;
    }

    localStorage.setItem("trainBooking", JSON.stringify(bookingDetails));

    alert("Payment Successful! Your train ticket has been booked.");
    closePaymentModal();
    displayBookingDetails();
}

// Validate Card Details
function validateCardDetails(number, expiry, cvv) {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    return cardRegex.test(number) && expiryRegex.test(expiry) && cvvRegex.test(cvv);
}

// Close Payment Modal
function closePaymentModal() {
    document.getElementById("payment-modal").style.display = "none";
}

// Display Booking Details
function displayBookingDetails() {
    const storedBooking = JSON.parse(localStorage.getItem("trainBooking"));
    if (storedBooking) {
        document.getElementById("train-results").innerHTML = `
            <h2>Booking Confirmed!</h2>
            <p><strong>Train:</strong> ${storedBooking.trainName}</p>
            <p><strong>From:</strong> ${storedBooking.from} → <strong>To:</strong> ${storedBooking.to}</p>
            <p><strong>Date:</strong> ${storedBooking.date}</p>
            <p><strong>Price:</strong> ${storedBooking.price}</p>
            <button id="cancel-booking">Cancel Booking</button>
        `;

        document.getElementById("cancel-booking").addEventListener("click", function () {
            localStorage.removeItem("trainBooking");
            alert("Booking Canceled.");
            document.getElementById("train-results").innerHTML = "";
        });
    }
}

// Load stored booking on page load
document.addEventListener("DOMContentLoaded", displayBookingDetails);
