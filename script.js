document.addEventListener("DOMContentLoaded", function() {
    // Typewriter Effect
    const target = document.getElementById("typewriter");
    const text = target.innerText;
    target.innerText = '';

    function typeWriter(text, i) {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(function () {
                typeWriter(text, i);
            }, 100);
        }
    }
    typeWriter(text, 0);

    // Dark Mode Toggle
    const themeSwitch = document.getElementById('checkbox');
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeSwitch.checked = currentTheme === 'dark';
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Modal
    const modal = document.getElementById("contact-modal");
    const openModalButton = document.getElementById("open-modal");
    const closeModalButton = document.getElementById("close-modal");
    const contactForm = document.getElementById("contact-form");

    openModalButton.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Form Validation and EmailJS Integration
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Name validation
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }

        // Message validation
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            removeError(message);
        }

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send("service_ybf965k", "template_v0j7b6m", {
                from_name: name.value,
                from_email: email.value,
                message: message.value,
                to_name: "Ethan Kent-Ogiata"
            })
            .then(function() {
                // Show success message
                btnText.textContent = 'Message Sent!';
                submitBtn.classList.add('success');
                
                // Reset form
                contactForm.reset();
                
                // Close modal after 2 seconds
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                    // Reset button state
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 2000);
            })
            .catch(function(error) {
                // Show error message
                btnText.textContent = 'Error! Try Again';
                submitBtn.classList.add('error');
                
                // Reset button state after 2 seconds
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('error');
                }, 2000);
                
                console.error("Error sending email:", error);
            });
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        formGroup.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        formGroup.classList.remove('error');
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate Progress Bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Intersection Observer for Progress Bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelector('.skills-container').querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });

    // Initialize EmailJS
    (function() {
        emailjs.init("hNH9Y6g8pC5Zr3Qz6"); // Replace with your EmailJS public key
    })();

    // Function to send email
    function sendEmail(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send("service_ybf965k", "template_v0j7b6m", {
            from_name: name,
            from_email: email,
            message: message,
            to_name: "Ethan Kent-Ogiata"
        })
        .then(function() {
            // Show success message
            btnText.textContent = 'Message Sent!';
            submitBtn.classList.add('success');
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                document.getElementById('contact-modal').style.display = 'none';
                // Reset button state
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
            }, 2000);
        })
        .catch(function(error) {
            // Show error message
            btnText.textContent = 'Error! Try Again';
            submitBtn.classList.add('error');
            
            // Reset button state after 2 seconds
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('error');
            }, 2000);
            
            console.error("Error sending email:", error);
        });

        return false;
    }

    // Modal functionality
    document.getElementById('open-modal').addEventListener('click', function() {
        document.getElementById('contact-modal').style.display = 'block';
    });

    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('contact-modal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('contact-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
