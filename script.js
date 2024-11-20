// Loader functionality
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");

    setTimeout(() => {
        loader.style.display = "none";
        mainContent.style.display = "block";
    }, 2000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


// Typewriter Effect
const typewriterText = [
    "Aspiring Web Developer | Tech Enthusiast"
];
let typewriterIndex = 0;
let charIndex = 0;

function typeText() {
    const element = document.getElementById("typewriter");
    if (charIndex < typewriterText[typewriterIndex].length) {
        element.textContent += typewriterText[typewriterIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            typewriterIndex = (typewriterIndex + 1) % typewriterText.length;
            element.textContent = "";
            typeText();
        }, 2000);
    }
}
typeText();

// Skills Data
const skills = [
    { name: "HTML", level: "high", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", level: "high", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "C++", level: "intermediate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C#", level: "intermediate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "PHP", level: "intermediate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "MySQL", level: "low", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "GitHub", level: "high", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
];

// Skill Levels and Bar Colors
const skillLevels = {
    high: { color: "green", width: "100%" },
    intermediate: { color: "yellow", width: "70%" },
    low: { color: "red", width: "40%" }
};

// Generate Skill HTML
function generateSkillHTML(skill) {
    return `
        <div class="skill">
            <img src="${skill.logo}" alt="${skill.name}" class="skill-logo" />
            <div class="skill-info">
                <h4>${skill.name}</h4>
                <div class="progress-wrapper">
                    <div class="progress-bar" style="background-color: ${skillLevels[skill.level].color}; width: ${skillLevels[skill.level].width};"></div>
                </div>
            </div>
        </div>
    `;
}

// Show the skills one at a time
let currentSkillIndex = 0;
function loadSkills() {
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer.style.opacity = 0; // Fade out before changing
    setTimeout(() => {
        skillsContainer.innerHTML = generateSkillHTML(skills[currentSkillIndex]);
        skillsContainer.style.opacity = 1; // Fade in after changing
    }, 500); // Match the transition duration
}

// Navigate through skills
function nextSkill() {
    currentSkillIndex = (currentSkillIndex + 1) % skills.length;
    loadSkills();
}

function previousSkill() {
    currentSkillIndex = (currentSkillIndex - 1 + skills.length) % skills.length;
    loadSkills();
}

loadSkills();
