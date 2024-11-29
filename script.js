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

// Skills Functionality
const skills = [
    { name: "HTML", level: "high", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", level: "high", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
];

const skillLevels = {
    high: { color: "green", width: "100%" },
    intermediate: { color: "yellow", width: "70%" }
};

let currentSkillIndex = 0;

function loadSkills() {
    const skillsContainer = document.getElementById("skills-container");
    const skill = skills[currentSkillIndex];
    skillsContainer.innerHTML = `
        <div class="skill">
            <img src="${skill.logo}" alt="${skill.name}" />
            <h4>${skill.name}</h4>
        </div>
    `;
}

function nextSkill() {
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    loadSkills();
}

function previousSkill() {
    currentSkillIndex = (currentSkillIndex - 1 + skills.length) % skills.length;
    loadSkills();
}

loadSkills();
