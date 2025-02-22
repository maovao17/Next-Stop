document.addEventListener("DOMContentLoaded", function () {
    const stories = [
        {
            title: "Lost in the Streets of Paris",
            image: "/Assets/Images/metro-7650419_1280.jpg",
            description: "A magical evening getting lost in the charming streets of Paris. The Eiffel Tower glowing in the background made it even more unforgettable."
        },
        {
            title: "Sunrise at the Grand Canyon",
            image: "/Assets/Images/grand-canyon-3736557_1280.jpg",
            description: "Watching the sun rise over the Grand Canyon was a life-changing experience. The colors painted the canyon walls like a masterpiece."
        },
        {
            title: "Backpacking in Thailand",
            image: "/Assets/Images/backpack-1868720_1280.jpg",
            description: "Exploring hidden temples, meeting monks, and enjoying the best street food in Bangkok. Thailand is truly a backpacker’s paradise!"
        }
    ];

    const storyContainer = document.getElementById("story-container");

    stories.forEach(story => {
        const storyCard = document.createElement("div");
        storyCard.classList.add("story-card");

        storyCard.innerHTML = `
            <img src="${story.image}" alt="${story.title}">
            <h2>${story.title}</h2>
            <p>${story.description}</p>
            <button class="read-more">Read More</button>
        `;

        storyContainer.appendChild(storyCard);
    });
});