// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // MOBILE MENU TOGGLE - FIXED
    
    function initMobileMenu() {
        // Check if menu toggle already exists
        let menuToggle = document.querySelector('.menu-toggle');
        
        // Create menu toggle if it doesn't exist
        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Toggle Menu');
            
            // Add to nav - insert before the submit button div
            const navContainer = document.querySelector('nav .container');
            const submitDiv = navContainer.querySelector('div:last-child');
            if (navContainer && submitDiv) {
                navContainer.insertBefore(menuToggle, submitDiv);
            }
        }
        
        // Toggle menu on click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
                
                // Change icon
                const icon = this.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const nav = document.querySelector('nav');
            
            if (navMenu && navMenu.classList.contains('active') && !nav.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a menu item
        const menuLinks = document.querySelectorAll('.nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // STICKY NAVIGATION
    
    const nav = document.querySelector('nav');
    let navOffset = nav.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
    
    // SMOOTH SCROLLING FOR NAVIGATION
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // PROPERTY TABS FUNCTIONALITY
    
    const tabButtons = document.querySelectorAll('.tab-btn, .rent-btn, .sell-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Only handle if it's in a tab context
            const parentButtons = this.parentElement.querySelectorAll('.rent-btn, .sell-btn');
            if (parentButtons.length > 0) {
                parentButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                console.log('Tab changed to:', this.textContent);
            }
        });
    });
    
    // HEART/FAVORITE BUTTON FUNCTIONALITY
    
    const heartButtons = document.querySelectorAll('.heart-btn');
    
    heartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.backgroundColor = '#6ba72e';
                this.style.color = 'white';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.backgroundColor = '#f8f9fa';
                this.style.color = '#333';
            }
        });
    });
    
    // TESTIMONIAL SLIDER
    
    const testimonials = [
        {
            name: "Sarif Jaya Miprut",
            text: "consecte Lorem ipsum dolor sit amet, Lorem ipsum dolor dolor sit amet, consectetuer do eiusmod tempor incididunt dolore magna consectetuer adipisicing elit.",
            rating: 4,
            image: "http://localhost/hubble/wp-content/uploads/2025/11/4.png"
        },
        {
            name: "John Anderson",
            text: "Amazing service! They helped me find my dream home. The team was professional and responsive throughout the entire process.",
            rating: 5,
            image: "http://localhost/hubble/wp-content/uploads/2025/11/1-3.png"
        },
        {
            name: "Maria Garcia",
            text: "Highly recommend! Found the perfect property within my budget. The agents were knowledgeable and patient.",
            rating: 5,
            image: "http://localhost/hubble/wp-content/uploads/2025/11/4.png"
        }
    ];
    
    let currentTestimonial = 0;
    
    function updateTestimonial() {
        const testimonialCard = document.querySelector('.testimonial-card');
        if (testimonialCard) {
            const testimonial = testimonials[currentTestimonial];
            
            testimonialCard.querySelector('h3').textContent = testimonial.name;
            testimonialCard.querySelector('p').textContent = `"${testimonial.text}"`;
            
            // Update avatar image
            const avatar = testimonialCard.querySelector('.client-avatar');
            if (avatar) {
                avatar.src = testimonial.image;
            }
            
            // Update rating stars
            const ratingDiv = testimonialCard.querySelector('.rating');
            ratingDiv.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('i');
                star.className = i <= testimonial.rating ? 'fas fa-star' : 'far fa-star';
                ratingDiv.appendChild(star);
            }
        }
    }
    
    // Previous button
    const prevBtn = document.querySelector('.slider-btn.prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
    }
    
    // Next button
    const nextBtn = document.querySelector('.slider-btn.next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });
    }
    
    // Auto-advance testimonials every 5 seconds
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
    
    // SEARCH FUNCTIONALITY
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const keyword = document.querySelector('.search-inputs input')?.value || '';
            const category = document.querySelector('.search-inputs select')?.value || '';
            const type = document.querySelector('input[name="type"]:checked')?.parentElement.textContent.trim() || 'All';
            
            console.log('Search:', { keyword, category, type });
            
            if (keyword || category) {
                alert(`Searching for ${type} properties in ${category} category with keyword: ${keyword}`);
            } else {
                alert('Please enter a keyword or select a category to search.');
            }
        });
    }
    
    // NEWSLETTER SUBSCRIPTION
    
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.newsletter input')?.value || '';
            
            if (email && email.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                document.querySelector('.newsletter input').value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // PLAY VIDEO BUTTON
    
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // You can integrate with actual video player here
            alert('Video would play here. You can integrate with YouTube, Vimeo, or custom video player.');
            // Example: Open YouTube video in modal
            // window.open('https://youtube.com/watch?v=YOUR_VIDEO_ID', '_blank');
        });
    }
    
    // ANIMATE ON SCROLL
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.category-card, .property-card, .agent-card, .news-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // WINDOW RESIZE HANDLER
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                const navMenu = document.querySelector('.nav-menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
            
            // Recalculate nav offset for sticky header
            navOffset = nav.offsetTop;
        }, 250);
    });
    
    // PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(navMenu, { attributes: true });
    }
    
    console.log('MINGRAND Real Estate Website Loaded Successfully! 🏠');
    console.log('Mobile menu initialized ✓');
});