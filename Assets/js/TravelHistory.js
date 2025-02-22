document.addEventListener("DOMContentLoaded", function () {
    const travelHistory = [
        {
            destination: "Paris, France",
            date: "2024-06-15",
            image: "/Assets/Images/paris.jpg",
            description: "Explored the Eiffel Tower and the Louvre Museum."
        },
        {
            destination: "Bali, Indonesia",
            date: "2024-07-22",
            image: "/Assets/Images/bali.jpg",
            description: "Relaxed on the beautiful beaches of Bali."
        },
        {
            destination: "New York, USA",
            date: "2024-05-10",
            image: "/Assets/Images/nyc.jpg",
            description: "Visited Times Square and Central Park."
        },
        {
            destination: "Tokyo, Japan",
            date: "2024-09-05",
            image: "/Assets/Images/japan.jpg",
            description: "Experienced the vibrant culture and tech of Tokyo."
        }
    ];

    const historyContainer = document.getElementById("travel-history-list");
    const searchInput = document.getElementById("searchTrips");

    // Function to display travel history
    function displayHistory(trips) {
        historyContainer.innerHTML = ""; // Clear previous content
        if (trips.length === 0) {
            historyContainer.innerHTML = "<p style='text-align:center; font-size:18px; color:#b71c1c;'>No trips found.</p>";
            return;
        }

        trips.forEach(trip => {
            const tripCard = document.createElement("div");
            tripCard.classList.add("travel-card");

            tripCard.innerHTML = `
                <img src="${trip.image}" alt="${trip.destination}">
                <h3>${trip.destination}</h3>
                <p><strong>Date:</strong> ${trip.date}</p>
                <p>${trip.description}</p>
            `;
            historyContainer.appendChild(tripCard);
        });
    }

    // Initial display of all trips
    displayHistory(travelHistory);

    // Search filter function
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTrips = travelHistory.filter(trip =>
            trip.destination.toLowerCase().includes(searchTerm)
        );
        displayHistory(filteredTrips);
    });
});
