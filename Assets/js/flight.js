document.getElementById("trip-type").addEventListener("change", function () {
    document.getElementById("return-date").disabled = this.value !== "round-trip";
});

document.getElementById("search-flights").addEventListener("click", function () {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const departureDate = document.getElementById("departure-date").value;
    const returnDate = document.getElementById("return-date").value;
    const travelers = document.getElementById("travelers").value;
    const specialFare = document.getElementById("special-fare").value;
    const resultsDiv = document.getElementById("flight-results");

    if (!from || !to || !departureDate) {
        alert("Please fill in all required fields.");
        return;
    }

    let resultText = `<p>Searching flights from <strong>${from}</strong> to <strong>${to}</strong> on <strong>${departureDate}</strong></p>`;
    if (returnDate) resultText += `<p>Returning on <strong>${returnDate}</strong></p>`;
    resultText += `<p>Class: <strong>${travelers}</strong></p>`;
    if (specialFare !== "none") resultText += `<p>Special Fare: <strong>${specialFare}</strong></p>`;

    resultsDiv.innerHTML = resultText + `<p>Fetching flight options...</p>`;


    
    // Simulate fetching flights
    setTimeout(() => {
        const flights = [
            { id: 1, airline: "Airways Express", departure: "8:00 AM", arrival: "11:30 AM", price: "$150" },
            { id: 2, airline: "SkyHigh Airlines", departure: "2:00 PM", arrival: "5:15 PM", price: "$180" },
            { id: 3, airline: "Global Air", departure: "10:30 AM", arrival: "2:00 PM", price: "$200" }
        ];

        resultsDiv.innerHTML = "<h2>Available Flights:</h2>";
        flights.forEach(flight => {
            const flightItem = document.createElement("div");
            flightItem.classList.add("flight-option");
            flightItem.innerHTML = `
                <h3>${flight.airline}</h3>
                <p>Departure: ${flight.departure} | Arrival: ${flight.arrival}</p>
                <p><strong>Price:</strong> ${flight.price}</p>
                <button class="book-flight-btn" data-id="${flight.id}" data-airline="${flight.airline}" 
                    data-price="${flight.price}" data-departure="${flight.departure}" 
                    data-arrival="${flight.arrival}">Book Now</button>
            `;
            resultsDiv.appendChild(flightItem);
        });

        document.querySelectorAll(".book-flight-btn").forEach(button => {
            button.addEventListener("click", function () {
                const airline = this.getAttribute("data-airline");
                const price = this.getAttribute("data-price");
                const departureTime = this.getAttribute("data-departure");
                const arrivalTime = this.getAttribute("data-arrival");

                openPaymentModal({ from, to, departureDate, returnDate, airline, price, departureTime, arrivalTime });
            });
        });
    }, 1500);
});

// Open Payment Modal
function openPaymentModal(bookingDetails) {
    document.getElementById("payment-modal").style.display = "block";
    document.getElementById("payment-details").innerHTML = `
        <p><strong>Airline:</strong> ${bookingDetails.airline}</p>
        <p><strong>From:</strong> ${bookingDetails.from} → <strong>To:</strong> ${bookingDetails.to}</p>
        <p><strong>Departure:</strong> ${bookingDetails.departureDate}</p>
        ${bookingDetails.returnDate ? `<p><strong>Return Date:</strong> ${bookingDetails.returnDate}</p>` : ""}
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
    const confirmButton = document.getElementById("confirm-payment");

    if (!validateCardDetails(cardNumber, expiry, cvv)) {
        alert("Invalid card details. Please check again.");
        return;
    }

    confirmButton.disabled = true;
    confirmButton.textContent = "Processing...";

    setTimeout(() => {
        localStorage.setItem("flightBooking", JSON.stringify(bookingDetails));
        alert("Payment Successful! Your flight has been booked.");
        closePaymentModal();
        displayBookingDetails();
        confirmButton.disabled = false;
        confirmButton.textContent = "Confirm Payment";
    }, 2000);
}

// Validate Card Details
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

// Close Payment Modal
function closePaymentModal() {
    document.getElementById("payment-modal").style.display = "none";
}

// Display Booking Details
function displayBookingDetails() {
    const storedBooking = JSON.parse(localStorage.getItem("flightBooking"));
    if (storedBooking) {
        document.getElementById("flight-results").innerHTML = `
            <h2>Booking Confirmed!</h2>
            <p style="color: green; font-weight: bold;">Flight booked successfully!</p>
            <p><strong>From:</strong> ${storedBooking.from}</p>
            <p><strong>To:</strong> ${storedBooking.to}</p>
            <p><strong>Departure Date:</strong> ${storedBooking.departureDate}</p>
            ${storedBooking.returnDate ? `<p><strong>Return Date:</strong> ${storedBooking.returnDate}</p>` : ""}
            <p><strong>Airline:</strong> ${storedBooking.airline}</p>
            <p><strong>Price:</strong> ${storedBooking.price}</p>
            <p><strong>Departure Time:</strong> ${storedBooking.departureTime} | <strong>Arrival Time:</strong> ${storedBooking.arrivalTime}</p>
            <button id="cancel-booking">Cancel Booking</button>
        `;

        document.getElementById("cancel-booking").addEventListener("click", function () {
            localStorage.removeItem("flightBooking");
            alert("Booking Canceled.");
            document.getElementById("flight-results").innerHTML = "";
        });
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("payment-modal");
    if (event.target === modal) {
        closePaymentModal();
    }
};

// Load stored booking on page load
document.addEventListener("DOMContentLoaded", displayBookingDetails);
