// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.service-card, .testimonial-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('active');
    });
}

// Form validation and enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Add shake animation
                input.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate form submission
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                form.reset();
                
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message animate-fadeIn';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                form.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.classList.add('animate-fadeOut');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 3000);
            }, 1500);
        }
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.bottom = '0';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.bottom = '-100%';
    });
});

// Add floating contact buttons to every page
function addFloatingButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'floating-buttons-container';
    
    // Create Call button
    const callButton = document.createElement('a');
    callButton.href = 'tel:+917386487631';
    callButton.className = 'floating-button call-button';
    callButton.innerHTML = '<i class="fas fa-phone"></i>';
    callButton.title = 'Call Us';
    
    // Create WhatsApp button
    const whatsappButton = document.createElement('a');
    const name = 'Mohammed Saleem';
    const message = `Hi ${name}, I'm interested in your construction services.`;
    const encodedMessage = encodeURIComponent(message);
    whatsappButton.href = `https://api.whatsapp.com/send/?phone=917386487631&text=${encodedMessage}&type=phone_number&app_absent=0`;
    whatsappButton.className = 'floating-button whatsapp-button';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.title = `Chat with ${name}`;
    whatsappButton.target = '_blank';
    
    // Add click event to hide WhatsApp number
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        const number = '+917386487631';
        
        // Open WhatsApp in new tab
        window.open(this.href, '_blank');
        
        // Hide the number in the current page
        const numberElements = document.querySelectorAll('.text-gray-400');
        numberElements.forEach(element => {
            if (element.textContent.includes(number)) {
                element.textContent = 'Contact us for details';
            }
        });
    });
    
    buttonsContainer.appendChild(callButton);
    buttonsContainer.appendChild(whatsappButton);
    document.body.appendChild(buttonsContainer);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', addFloatingButtons);

// Handle Get in Touch button clicks
document.addEventListener('DOMContentLoaded', function() {
    const getInTouchButtons = document.querySelectorAll('.get-in-touch-btn');
    getInTouchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'contact.html';
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
    }

    // Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Smooth Scroll for Navigation Links
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

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add shine effect to buttons
    const buttons = document.querySelectorAll('.btn-hover');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('shine-effect');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('shine-effect');
        });
    });

    // Handle Get in Touch button clicks
    const getInTouchButtons = document.querySelectorAll('.get-in-touch-btn');
    getInTouchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === 'contact.html') {
                window.location.href = href;
            } else {
                window.location.href = 'contact.html';
            }
        });
    });
});
