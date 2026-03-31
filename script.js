
// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            company: document.getElementById('contactCompany').value,
            message: document.getElementById('contactMessage').value,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage for marketing data
        let contacts = JSON.parse(localStorage.getItem('trustlayer_contacts') || '[]');
        contacts.push(formData);
        localStorage.setItem('trustlayer_contacts', JSON.stringify(contacts));
        
        // Show success message
        document.querySelector('.contact-form').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            document.querySelector('.contact-form').style.display = 'flex';
            document.getElementById('formSuccess').style.display = 'none';
        }, 3000);
    });
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

const carouselContainer = document.getElementById('carouselContainer');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (carouselContainer && carouselPrev && carouselNext) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 32; // width + gap
    
    function scrollToSlide(index) {
        carouselContainer.scrollLeft = index * slideWidth;
    }
    
    carouselPrev.addEventListener('click', () => {
        currentSlide = Math.max(0, currentSlide - 1);
        scrollToSlide(currentSlide);
    });
    
    carouselNext.addEventListener('click', () => {
        currentSlide = Math.min(slides.length - 1, currentSlide + 1);
        scrollToSlide(currentSlide);
    });
    
    // Auto-scroll carousel every 12 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        scrollToSlide(currentSlide);
    }, 12000);
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// CONTACT BUTTON IN FOOTER
// ============================================

// Add contact button functionality if needed
const contactButtons = document.querySelectorAll('[data-contact-btn]');
contactButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// ============================================
// LOGIN SYSTEM (TRIAL ACCESS)
// ============================================

function initLoginSystem() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('trustlayer_user_logged_in');
    
    if (!isLoggedIn) {
        // Show login prompt or trial access button
        console.log('User not logged in - trial access available');
    }
}

initLoginSystem();

// ============================================
// AVATAR VIDEO AUTOPLAY
// ============================================

const videoPlayer = document.getElementById('videoPlayer');
if (videoPlayer) {
    const video = videoPlayer.querySelector('video');
    if (video) {
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) || phone === '';
}

// Add validation to contact form
const contactEmailInput = document.getElementById('contactEmail');
const contactPhoneInput = document.getElementById('contactPhone');

if (contactEmailInput) {
    contactEmailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '';
        }
    });
}

if (contactPhoneInput) {
    contactPhoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TESTIMONIALS ANIMATION
// ============================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    testimonialCards.forEach(card => observer.observe(card));
}

// ============================================
// CAROUSEL ANIMATION
// ============================================

const carouselCards = document.querySelectorAll('.carousel-card');
if (carouselCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    carouselCards.forEach(card => observer.observe(card));
}

console.log('✓ All new features initialized');
