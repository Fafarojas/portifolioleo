document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#efc69b' 
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.4,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#efc69b',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.4
                    }
                }
            }
        },
        retina_detect: true
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const progressBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percentage = progress.dataset.progress;
                progress.style.width = percentage + '%';
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        bar.style.width = '0';
        skillsObserver.observe(bar);
    });

    const ctaButton = document.querySelector('.hero .cta-button');
    ctaButton.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth'
        });
    });

    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
});