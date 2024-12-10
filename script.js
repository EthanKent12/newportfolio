document.addEventListener("DOMContentLoaded", function() {
    const target = document.getElementById("typewriter");
    const text = target.innerText; // Gets inner content of paragraph
    target.innerText = '';

    // function to simulate typewriter effect
    function typeWriter(text, i) {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(function () {
                typeWriter(text, i);
            }, 100); // typing speed in milliseconds
        }
    }

    // call typewriter function
    typeWriter(text, 0);
});

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("contact-modal");
    const openModalButton = document.getElementById("open-modal");
    const closeModalButton = document.getElementById("close-modal");

    // Open the modal when the button is clicked
    openModalButton.addEventListener("click", () => {
        modal.style.display = "flex"; // Show the modal
    });

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
