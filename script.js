// Global Variables
let currentSlide = 0;
let slideInterval;
let currentBlogModal = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website Functions
function initializeWebsite() {
    initializeNavigation();
    initializeCounters();
    initializeFAQ();
    initializeDoctorFilters();
    initializeTestimonialSlider();
    initializeForms();
    initializeChatbot();
    initializeScrollAnimations();
    initializeNewsletterPopup();
    
    // Set minimum date for appointment booking
    setMinimumDate();
}

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Doctor Filter Functionality
function initializeDoctorFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter doctor cards
            doctorCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Auto-play slider
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Initialize slider
    showSlide(0);
    startSlider();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
    }
    
    // Global functions for slider controls
    window.changeSlide = function(direction) {
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
        stopSlider();
        startSlider();
    };
    
    window.currentSlide = function(index) {
        showSlide(index - 1);
        stopSlider();
        startSlider();
    };
}

// Form Handling
function initializeForms() {
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmission(this);
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    }
}

function handleAppointmentSubmission(form) {
    const formData = new FormData(form);
    const appointmentData = {};
    
    for (let [key, value] of formData.entries()) {
        appointmentData[key] = value;
    }
    
    // Simulate API call
    setTimeout(() => {
        showAppointmentSuccess(appointmentData);
        form.reset();
    }, 1000);
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    
    // Simulate API call
    setTimeout(() => {
        showContactSuccess();
        form.reset();
    }, 1000);
}

function handleNewsletterSubmission(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        closeNewsletterModal();
        form.reset();
    }, 1000);
}

function showAppointmentSuccess(data) {
    const modal = document.getElementById('successModal');
    const summaryDiv = document.getElementById('appointmentSummary');
    
    if (summaryDiv) {
        summaryDiv.innerHTML = `
            <h4>Appointment Details:</h4>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Department:</strong> ${data.department}</p>
            <p><strong>Date:</strong> ${data.appointmentDate}</p>
            <p><strong>Time:</strong> ${data.appointmentTime}</p>
        `;
    }
    
    if (modal) {
        modal.style.display = 'block';
    }
}

function showContactSuccess() {
    const modal = document.getElementById('contactSuccessModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

function closeContactModal() {
    const modal = document.getElementById('contactSuccessModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Set minimum date for appointment booking
function setMinimumDate() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

// Chatbot Functionality
function initializeChatbot() {
    const chatbotIcon = document.getElementById('chatbot');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbot = document.querySelector('.close-chatbot');
    const sendButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', function() {
            chatbotModal.style.display = chatbotModal.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotModal.style.display = 'none';
        });
    }
    
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.querySelector('.chatbot-body');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
        chatBody.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `<p><strong>Assistant:</strong> ${getBotResponse(message)}</p>`;
            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
        
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function getBotResponse(message) {
    const responses = {
        'appointment': 'You can book an appointment by visiting our Appointment page or calling +1-234-567-8900.',
        'hours': 'Our hospital is open 24/7 for emergencies. Regular hours are Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM.',
        'location': 'We are located at 123 Healthcare Street, Medical City. Free parking is available.',
        'insurance': 'We accept most major insurance plans. Please contact our billing department to verify your coverage.',
        'emergency': 'For medical emergencies, please call 911 immediately or visit our emergency department.',
        'default': 'Thank you for your message. For specific inquiries, please call +1-234-567-8900 or visit our Contact page.'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (let key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    return responses.default;
}

// Gallery Lightbox
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightbox.style.display = 'block';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Blog Modal Functions
function openBlogModal(blogId) {
    const blogData = getBlogData(blogId);
    const modal = document.getElementById('blogModal');
    
    if (modal && blogData) {
        document.getElementById('modal-blog-title').textContent = blogData.title;
        document.getElementById('modal-blog-date').innerHTML = `<i class="fas fa-calendar"></i> ${blogData.date}`;
        document.getElementById('modal-blog-author').innerHTML = `<i class="fas fa-user"></i> ${blogData.author}`;
        document.getElementById('modal-blog-image').src = blogData.image;
        document.getElementById('modal-blog-content').innerHTML = blogData.content;
        
        modal.style.display = 'block';
        currentBlogModal = blogId;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.style.display = 'none';
        currentBlogModal = null;
    }
}

function getBlogData(blogId) {
    const blogPosts = {
        'heart-health': {
            title: '10 Tips for a Healthy Heart',
            date: 'January 15, 2024',
            author: 'Dr. John Smith',
            image: '/placeholder.svg?height=400&width=600&text=Heart+Health',
            content: `
                <p>Maintaining a healthy heart is crucial for overall well-being. Here are 10 evidence-based tips:</p>
                <h4>1. Exercise Regularly</h4>
                <p>Aim for at least 150 minutes of moderate-intensity aerobic activity per week.</p>
                <h4>2. Eat a Heart-Healthy Diet</h4>
                <p>Focus on fruits, vegetables, whole grains, and lean proteins.</p>
                <h4>3. Maintain a Healthy Weight</h4>
                <p>Work with your healthcare provider to achieve a healthy weight.</p>
                <h4>4. Don't Smoke</h4>
                <p>Smoking damages blood vessels and increases heart disease risk.</p>
                <h4>5. Limit Alcohol</h4>
                <p>Drink in moderation if you choose to drink alcohol.</p>
            `
        },
        'child-nutrition': {
            title: 'Nutrition Guidelines for Growing Children',
            date: 'January 12, 2024',
            author: 'Dr. Emily Davis',
            image: '/placeholder.svg?height=400&width=600&text=Child+Nutrition',
            content: `
                <p>Proper nutrition during childhood is essential for healthy growth and development.</p>
                <h4>Age-Appropriate Nutrition</h4>
                <p>Children's nutritional needs change as they grow and develop.</p>
                <h4>Essential Nutrients</h4>
                <p>Focus on protein, calcium, iron, and essential vitamins.</p>
                <h4>Healthy Eating Habits</h4>
                <p>Establish regular meal times and offer variety in foods.</p>
            `
        },
        'stress-management': {
            title: 'Managing Stress in Modern Life',
            date: 'January 10, 2024',
            author: 'Dr. Sarah Johnson',
            image: '/placeholder.svg?height=400&width=600&text=Stress+Management',
            content: `
                <p>Effective stress management is crucial for maintaining good health.</p>
                <h4>Understanding Stress</h4>
                <p>Stress is your body's response to challenges or demands.</p>
                <h4>Management Techniques</h4>
                <p>Deep breathing, exercise, meditation, and time management can help.</p>
                <h4>When to Seek Help</h4>
                <p>Consider professional help if stress interferes with daily life.</p>
            `
        },
        'exercise-benefits': {
            title: 'The Benefits of Regular Exercise',
            date: 'January 8, 2024',
            author: 'Dr. James Miller',
            image: '/placeholder.svg?height=400&width=600&text=Exercise+Benefits',
            content: `
                <p>Regular physical activity provides numerous health benefits.</p>
                <h4>Physical Benefits</h4>
                <p>Strengthens heart, builds muscle, improves balance, and boosts immunity.</p>
                <h4>Mental Health Benefits</h4>
                <p>Reduces depression and anxiety, improves mood and cognitive function.</p>
                <h4>Getting Started</h4>
                <p>Start slowly and choose activities you enjoy.</p>
            `
        },
        'diabetes-prevention': {
            title: 'Preventing Type 2 Diabetes',
            date: 'January 5, 2024',
            author: 'Dr. Robert Wilson',
            image: '/placeholder.svg?height=400&width=600&text=Diabetes+Prevention',
            content: `
                <p>Type 2 diabetes is largely preventable through lifestyle modifications.</p>
                <h4>Risk Factors</h4>
                <p>Family history, obesity, inactivity, and age are key risk factors.</p>
                <h4>Prevention Strategies</h4>
                <p>Maintain healthy weight, stay active, eat balanced diet, get regular check-ups.</p>
                <h4>Early Warning Signs</h4>
                <p>Watch for increased thirst, frequent urination, and fatigue.</p>
            `
        },
        'winter-skincare': {
            title: 'Winter Skin Care Tips',
            date: 'January 3, 2024',
            author: 'Dr. Maria Garcia',
            image: '/placeholder.svg?height=400&width=600&text=Winter+Skincare',
            content: `
                <p>Winter weather can be harsh on your skin. Here's how to protect it.</p>
                <h4>Common Winter Problems</h4>
                <p>Dry skin, chapped lips, eczema flare-ups, and cracked hands.</p>
                <h4>Winter Skincare Routine</h4>
                <p>Use gentle cleansers, moisturize regularly, and protect from wind.</p>
                <h4>Professional Care</h4>
                <p>Consult a dermatologist for persistent skin problems.</p>
            `
        }
    };
    
    return blogPosts[blogId] || null;
}

// Newsletter Popup
function initializeNewsletterPopup() {
    // Show newsletter popup after 30 seconds
    setTimeout(() => {
        if (!localStorage.getItem('newsletterShown')) {
            showNewsletterModal();
            localStorage.setItem('newsletterShown', 'true');
        }
    }, 30000);
}

function showNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal, .lightbox');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modals with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, .lightbox');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Emergency banner call button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('emergency-btn')) {
        window.location.href = 'tel:+12345678900';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-spinner');
    if (loader) {
        loader.remove();
    }
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Back to top button
function addBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    document.body.appendChild(backToTop);
}

// Initialize back to top button
addBackToTopButton();

 document.getElementById("chatbotBtn").onclick = function() {
    var modal = document.getElementById("chatbotModal");
    modal.style.display = (modal.style.display === "none") ? "block" : "none";
  }