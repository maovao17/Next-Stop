document.getElementById("search-buses").addEventListener("click", function () {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const resultsDiv = document.getElementById("bus-results");

    if (!from || !to || !date) {
        alert("Please fill in all fields.");
        return;
    }

    resultsDiv.innerHTML = `<p>Searching buses from <strong>${from}</strong> to <strong>${to}</strong> on <strong>${date}</strong>...</p>`;

    setTimeout(() => {
        const buses = [
            { id: 1, company: "Express Bus Co.", departure: "8:00 AM", arrival: "2:00 PM", price: "$50" },
            { id: 2, company: "FastRide Travels", departure: "10:00 AM", arrival: "4:30 PM", price: "$60" },
            { id: 3, company: "Luxury Line", departure: "1:00 PM", arrival: "7:00 PM", price: "$75" }
        ];

        resultsDiv.innerHTML = "<h2>Available Buses:</h2>";
        buses.forEach(bus => {
            const busItem = document.createElement("div");
            busItem.classList.add("bus-option");
            busItem.innerHTML = `
                <h3>${bus.company}</h3>
                <p>Departure: ${bus.departure} | Arrival: ${bus.arrival}</p>
                <p><strong>Price:</strong> ${bus.price}</p>
                <button class="book-bus-btn" data-id="${bus.id}" data-company="${bus.company}" 
                    data-price="${bus.price}" data-departure="${bus.departure}" 
                    data-arrival="${bus.arrival}">Book Now</button>
            `;
            resultsDiv.appendChild(busItem);
        });

        document.querySelectorAll(".book-bus-btn").forEach(button => {
            button.addEventListener("click", function () {
                const company = this.getAttribute("data-company");
                const price = this.getAttribute("data-price");
                const departureTime = this.getAttribute("data-departure");
                const arrivalTime = this.getAttribute("data-arrival");

                openPaymentModal({ from, to, date, company, price, departureTime, arrivalTime });
            });
        });
    }, 1500);
});

function openPaymentModal(bookingDetails) {
    document.getElementById("payment-modal").style.display = "block";
    document.getElementById("payment-details").innerHTML = `
        <p><strong>Bus Company:</strong> ${bookingDetails.company}</p>
        <p><strong>From:</strong> ${bookingDetails.from} → <strong>To:</strong> ${bookingDetails.to}</p>
        <p><strong>Travel Date:</strong> ${bookingDetails.date}</p>
        <p><strong>Departure:</strong> ${bookingDetails.departureTime} | <strong>Arrival:</strong> ${bookingDetails.arrivalTime}</p>
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
        localStorage.setItem("busBooking", JSON.stringify(bookingDetails));
        alert("Payment Successful! Your bus ticket has been booked.");
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
    const storedBooking = JSON.parse(localStorage.getItem("busBooking"));
    if (storedBooking) {
        document.getElementById("bus-results").innerHTML = `
            <h2>Booking Confirmed!</h2>
            <p style="color: green;">Bus ticket booked successfully!</p>
            <p><strong>From:</strong> ${storedBooking.from}</p>
            <p><strong>To:</strong> ${storedBooking.to}</p>
            <p><strong>Date:</strong> ${storedBooking.date}</p>
            <p><strong>Bus Company:</strong> ${storedBooking.company}</p>
            <p><strong>Departure:</strong> ${storedBooking.departureTime} | <strong>Arrival:</strong> ${storedBooking.arrivalTime}</p>
            <p><strong>Price:</strong> ${storedBooking.price}</p>
            <button id="cancel-booking">Cancel Booking</button>
        `;
    }
}

document.addEventListener("DOMContentLoaded", displayBookingDetails);
