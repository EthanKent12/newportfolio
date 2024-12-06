// Typewriter Effect
const typewriterText = ["Aspiring Web Developer | Tech Enthusiast"];
let charIndex = 0;

function typeText() {
    const element = document.getElementById("typewriter");
    if (charIndex < typewriterText[0].length) {
        element.textContent += typewriterText[0][charIndex];
        charIndex++;
        setTimeout(typeText, 100);
    }
}
typeText();

// Current Projects Background Change
function changeBackground(projectId) {
    const projectBackgrounds = {
        project1: "#4CAF50", // Green
        project2: "#FF5722", // Orange
        project3: "#3F51B5"  // Blue
    };
    document.body.style.backgroundColor = projectBackgrounds[projectId];
}
