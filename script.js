document.addEventListener('DOMContentLoaded', function() {
    // ========== Theme Toggle ==========
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    // Removed darkIcon and lightIcon as their animation is now handled purely by CSS :before pseudo-element and color changes.

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    }

    themeToggle.addEventListener('click', toggleTheme);

    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        // Removed direct style manipulations for icons, now handled by CSS
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        // Removed direct style manipulations for icons, now handled by CSS
    }

    // ========== Mobile Navigation ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    // mobileMenu is not used, can be removed
    
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        // Removed toggleHamburgerAnimation as CSS handles the animation based on aria-expanded
    });
    
    // Close menu when clicking nav links or outside
    document.addEventListener('click', function(e) {
        // Check if the click is outside the nav and the menu is active
        if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
    }

    // ========== Typing Animation ==========
    const typingText = document.querySelector('.typing-text');
    const professions = ['Full Stack Developer', 'AI Engineer', 'Python Developer', 'Machine Learning Engineer']; // Updated professions
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout;
    
    function type() {
        if (!typingText) return; // Ensure element exists
        const currentProfession = professions[professionIndex];
        
        typingText.textContent = isDeleting 
            ? currentProfession.substring(0, charIndex - 1)
            : currentProfession.substring(0, charIndex + 1);
        
        charIndex += isDeleting ? -1 : 1;
        typingSpeed = isDeleting ? 50 : 150; // Adjusted speeds for smoother effect
        
        if (!isDeleting && charIndex === currentProfession.length + 1) { // +1 to show full word
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 700; // Pause before next
        }
        
        typingTimeout = setTimeout(type, typingSpeed);
    }

    // Start typing animation after a short delay
    setTimeout(type, 1000);

    // Clean up timeout when leaving page
    window.addEventListener('beforeunload', () => {
        clearTimeout(typingTimeout);
    });

    // ========== Skills Section ==========
    const skillsData = [
        { name: 'HTML5', level: 95, icon: 'fab fa-html5' }, // Updated names and levels
        { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', level: 88, icon: 'fab fa-js' },
        { name: 'Python', level: 92, icon: 'fab fa-python' },
        { name: 'React.js', level: 80, icon: 'fab fa-react' },
        { name: 'Node.js', level: 75, icon: 'fab fa-node-js' },
        { name: 'Flask', level: 85, icon: 'fas fa-flask' },
        { name: 'SQL', level: 70, icon: 'fas fa-database' },
        { name: 'Machine Learning', level: 90, icon: 'fas fa-robot' },
        { name: 'Deep Learning', level: 80, icon: 'fas fa-microchip' },
        { name: 'NLP', level: 78, icon: 'fas fa-language' },
        { name: 'Git & GitHub', level: 85, icon: 'fab fa-git-alt' }
    ];

    function renderSkills() {
        const container = document.querySelector('.skills-grid');
        if (!container) return; // Ensure container exists
        container.innerHTML = skillsData.map(skill => `
            <div class="skill-item" role="listitem">
                <div class="skill-header">
                    <i class="${skill.icon}" aria-hidden="true"></i>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%" aria-label="${skill.name} skill level: ${skill.level}%">
                        <span class="sr-only">${skill.level}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ========== Projects Section ==========
    const projectsData = [
        {
            title: "Blog",
            description: "A real-time Blog application with using Python and Flask.",
            technologies: ["Python", "Flask", "JavaScript", "HTML",'CSS'],
            github: "https://github.com/rasool321/Blog",
            live: "" ,
            image: "images/blog.png" 
        },
        {
            title: "TODO",
            description: "Full-featured TODO with React",
            technologies: ["React", "JS", "HTML", "CSS", "JS"],
            github: "https://github.com/rasool321/Todo-React",
            live: "https://todorea.netlify.app/" ,
            image: "images/todo.png" 
        },
        {
            title: "Google Clone",
            description: "My Google Clone shows information as per quires.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            github: "https://github.com/rasool321/Google-Clone",
            live: "https://rasool321.github.io/Google-Clone/",
            image: "images/google.png" 
        },
        {
            title: "Insta-Clone",
            description: "Insta-Clone using PHP.",
            technologies: ["PHP", "MySql", "HTML", "JS",'CSS'],
            github: "https://github.com/rasool321/Insta-clone",
            live: "http://www.instaclone.infy.uk/" ,
            image: "images/insta.png" 
        },
        {
            title: " Etch-a-Sketch",
            description: "A fun and interactive Etch-a-Sketch web application where users can draw using an RGB mode, darken effect, and eraser. Features include grid resizing, dark/light mode toggle, and a sidebar for them….",
            technologies: ["HTML", "CSS", "JS"],
            github: "https://github.com/rasool321/Etch-a-Sketch",
            live: "https://rasool321.github.io/Etch-a-Sketch/",
            image: "images/etch.png" 
        }
    ];

   function renderProjects() {
    const container = document.querySelector('.projects-grid');
    if (!container) return; // Ensure container exists
    container.innerHTML = projectsData.map(project => `
        <div class="project-card" role="listitem">
            <div class="project-image-container">
                <img src="${project.image}" 
                     alt="${project.title} screenshot" 
                     class="project-image"
                     loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `
                    <a href="${project.github}" class="project-link" aria-label="View ${project.title} on GitHub" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>` : ''}
                    ${project.live ? `
                    <a href="${project.live}" class="project-link" aria-label="View ${project.title} live demo" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}


    // ========== Scroll Animations ==========
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    function animateProgressBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width; // Get the target width
            bar.style.width = '0'; // Reset to 0 for animation
            setTimeout(() => {
                bar.style.width = width; // Animate to target width
            }, 100); // Small delay to ensure reset takes effect
        });
    }

    // ========== Back to Top Button ==========
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('active', window.scrollY > 400); // Show after 400px scroll
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop;
                const headerHeight = document.querySelector('.header').offsetHeight; // Get dynamic header height
                window.scrollTo({
                    top: offsetTop - headerHeight - 20, // Adjust for header and a little extra space
                    behavior: 'smooth'
                });
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========== Footer Year ==========
    document.getElementById('year').textContent = new Date().getFullYear();

    // ========== EmailJS Form ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS with your User ID
        // IMPORTANT: Replace 'YOUR_EMAILJS_USER_ID' with your actual EmailJS User ID
        emailjs.init('xzS9ZOIj7mFOoR-gz'); // This ID seems correct from your context

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Validate form before sending
            if (!validateForm()) {
                showNotification('error', 'Please fill in all required fields correctly.');
                return;
            }

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                // Send form
                // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
                const response = await emailjs.sendForm(
                    'service_439axng', // Your Service ID (from EmailJS Dashboard -> Email Services)
                    'template_8slsqor', // Your Template ID (from EmailJS Dashboard -> Email Templates)
                    contactForm
                );
                
                console.log('EmailJS Success:', response);
                showNotification('success', 'Message sent successfully! I will get back to you soon.');
                contactForm.reset(); // Clear form fields on success
                // Clear error messages after successful submission
                contactForm.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            } catch (error) {
                console.error('EmailJS Error:', error);
                showNotification('error', 'Failed to send message. Please try again later.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
        
        // Form validation
        function validateForm() {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const errorMessage = field.nextElementSibling; // Assumes error-message span is next sibling
                if (!errorMessage) return; // Skip if no error message element

                if (!field.value.trim()) {
                    field.classList.add('error');
                    errorMessage.textContent = 'This field is required.';
                    isValid = false;
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    field.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid email address.';
                    isValid = false;
                } else {
                    field.classList.remove('error');
                    errorMessage.textContent = '';
                }
            });
            
            return isValid;
        }
        
        function isValidEmail(email) {
            // Basic regex for email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Real-time validation on input/change
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                if (field.hasAttribute('required')) {
                    const errorMessage = field.nextElementSibling;
                    if (!errorMessage) return;

                    if (!field.value.trim()) {
                        field.classList.add('error');
                        errorMessage.textContent = 'This field is required.';
                    } else if (field.type === 'email' && !isValidEmail(field.value)) {
                        field.classList.add('error');
                        errorMessage.textContent = 'Please enter a valid email address.';
                    } else {
                        field.classList.remove('error');
                        errorMessage.textContent = '';
                    }
                }
            });
        });
    }

    // ========== Notification System ==========
    function showNotification(type, message) {
        const notification = document.getElementById('notification');
        if (!notification) return;

        notification.className = `notification ${type}`; // Reset classes
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        notification.setAttribute('aria-hidden', 'false');
        
        // Trigger reflow to ensure transition plays
        void notification.offsetWidth; 
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.setAttribute('aria-hidden', 'true');
            }, 500); // Allow transition to finish before hiding completely
        }, 5000); // Notification stays for 5 seconds
    }

    // ========== Initialize Components ==========
    renderSkills();
    renderProjects();
    // Initial check for animations on load
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.8) { // If already in view
            section.classList.add('animate');
            if (section.id === 'skills') {
                animateProgressBars();
            }
        }
    });
});

