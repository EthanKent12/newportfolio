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

