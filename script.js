// Project Reclaim - JavaScript for interactivity and animations
// All code is commented for easy customization

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling Function
    // Used for navigation links and CTA button
    function smoothScroll(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 70; // Account for fixed navbar height
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Easing function for smooth animation
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    }

    // Scroll to Section (exposed globally for onclick)
    window.scrollToSection = function(sectionId) {
        smoothScroll('#' + sectionId);
    };

    // Scroll to Top (exposed globally for button)
    window.scrollToTop = function() {
        smoothScroll('#hero');
    };

    // Navigation Links Smooth Scroll
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Intersection Observer for Animations
    // Triggers fade-up and stagger animations when sections come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe section titles, subsections, cards, closing message
    const animatables = document.querySelectorAll('.section-title, .subsection, .card, .closing-message');
    animatables.forEach(el => observer.observe(el));

    // Gallery Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Change Slide Function (exposed globally for buttons)
    window.changeSlide = function(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide += direction;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        slides[currentSlide].classList.add('active');
    };

    // Auto-slide every 5 seconds (optional, can be removed)
    setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Floating Hearts for Hero Background
    // Creates subtle floating heart particles instead of bubbles
    const heartsContainer = document.querySelector('.hearts-container'); // Assume a div in HTML for hearts
    if (heartsContainer) {
        function createFloatingHeart() {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 12 + 8) + 'px';
            heart.style.color = 'rgba(233, 30, 99, ' + (Math.random() * 0.5 + 0.2) + ')';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = 'float-heart 10s linear infinite';
            heartsContainer.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }

        // Create hearts every 500ms for continuous effect
        setInterval(createFloatingHeart, 500);

        // Add CSS animation if not present (but since it's JS, define inline or assume in CSS)
        // Note: Add @keyframes float-heart in style.css if needed
    }

    // Contact Form Handling - Removed as per updates (now a link to love-question.html)
});
