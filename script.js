    // Global Variables
    let mousePosition = { x: 0, y: 0 };
    let particles = [];
    let currentTestimonial = 0;
    let activeService = null;
    let isMenuOpen = false;

    // Testimonials Data
    const testimonials = [
        {
            text: "Elite8 Digital transformed our digital presence completely. Their creative approach exceeded all expectations and delivered phenomenal results.",
            author: "Sarah Johnson",
            company: "TechStart Inc.",
            rating: 5
        },
        {
            text: "The team's attention to detail and innovative solutions helped us achieve 300% growth in online engagement within just 3 months.",
            author: "Michael Chen",
            company: "GrowthCorp",
            rating: 5
        },
        {
            text: "Working with Elite8 was seamless. They delivered beyond what we imagined possible and transformed our entire business model.",
            author: "Emma Rodriguez",
            company: "Creative Studios",
            rating: 5
        }
    ];

    // Initialize particles
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        particles = [];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const particleData = {
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.1
            };
            
            particle.style.left = particleData.x + 'px';
            particle.style.top = particleData.y + 'px';
            particle.style.opacity = particleData.opacity;
            particle.style.animation = `twinkle 3s infinite ${i * 0.1}s`;
            
            particlesContainer.appendChild(particle);
            particles.push(particleData);
        }
    }

    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
    }

    // Custom cursor
    function initCursor() {
        const cursor = document.getElementById('cursor');
        
        document.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
            
            cursor.style.left = (e.clientX - 12) + 'px';
            cursor.style.top = (e.clientY - 12) + 'px';
            
            // Update hero blobs based on mouse position
            updateHeroBlobs();
        });
    }

    // Update hero blobs position based on mouse
    function updateHeroBlobs() {
        const blob1 = document.getElementById('blob1');
        const blob2 = document.getElementById('blob2');
        const blob3 = document.getElementById('blob3');
        
        if (blob1) {
            blob1.style.transform = `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`;
        }
        if (blob2) {
            blob2.style.transform = `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`;
        }
        if (blob3) {
            blob3.style.transform = `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`;
        }
    }

    // Navigation scroll effect
    function initNavigation() {
        const nav = document.getElementById('nav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('open', isMenuOpen);
            menuIcon.textContent = isMenuOpen ? '✕' : '☰';
            menuIcon.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });
        
        // Mobile menu links
        document.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.remove('open');
                menuIcon.textContent = '☰';
                menuIcon.style.transform = 'rotate(0deg)';
            });
        });
    }

    // Hero section loading animation
    function initHero() {
        const heroContent = document.getElementById('heroContent');
        
        setTimeout(() => {
            heroContent.classList.add('hero-loaded');
        }, 100);
    }

    // Services section interactions
    function initServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        const cursor = document.getElementById('cursor');
        
        serviceCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                activeService = index;
                cursor.style.transform = 'scale(2)';
            });
            
            card.addEventListener('mouseleave', () => {
                activeService = null;
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // Testimonials carousel
    function initTestimonials() {
        const testimonialText = document.getElementById('testimonialText');
        const testimonialName = document.getElementById('testimonialName');
        const testimonialCompany = document.getElementById('testimonialCompany');
        const testimonialAvatar = document.getElementById('testimonialAvatar');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        
        function updateTestimonial(index) {
            const testimonial = testimonials[index];
            
            testimonialText.textContent = testimonial.text;
            testimonialName.textContent = testimonial.author;
            testimonialCompany.textContent = testimonial.company;
            testimonialAvatar.textContent = testimonial.author.charAt(0);
            
            // Update dots
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Dot click handlers
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial(currentTestimonial);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 5000);
    }

    // Smooth scrolling for navigation
    function initSmoothScrolling() {
        const navItems = document.querySelectorAll('.nav-item');
    
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;
    
            item.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
    
                // If href starts with '#', it's an in-page anchor
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.slice(1);
                    const targetElement = document.getElementById(targetId);
    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
                // Otherwise, let the link work normally (navigate pages)
            });
        });
    }
    
    // Button interactions
    function initButtons() {
        const buttons = document.querySelectorAll('button');
        const cursor = document.getElementById('cursor');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#ec4899';
            });
            
            button.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#a855f7';
            });
            
            button.addEventListener('click', () => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .cta-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    }

    // Stats counter animation
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const text = stat.textContent;
                    const number = parseInt(text);
                    const suffix = text.replace(/[0-9]/g, '');
                    
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + suffix;
                    }, 50);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }

    // Parallax effects
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax for hero blobs
            const heroBlobs = document.querySelectorAll('.hero-blob');
            heroBlobs.forEach((blob, index) => {
                const speed = 0.5 + (index * 0.2);
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Parallax for floating elements
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Resize handler
    function handleResize() {
        window.addEventListener('resize', () => {
            // Reinitialize particles on resize
            const particlesContainer = document.getElementById('particles');
            particlesContainer.innerHTML = '';
            initParticles();
        });
    }

    // Error handling
    function handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('An error occurred:', e.error);
        });
    }

    // Performance optimization
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll);
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
    }

    // Social media handlers
    function initSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        const socialLinks = {
            'L': 'https://linkedin.com/company/elite8digital',
            'T': 'https://twitter.com/elite8digital',
            'I': 'https://instagram.com/elite8digital',
            'D': 'https://dribbble.com/elite8digital'
        };
        
        socialButtons.forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.textContent;
                const url = socialLinks[platform];
                if (url) {
                    window.open(url, '_blank');
                }
            });
        });
    }

    // Easter eggs and hidden features
    function initEasterEggs() {
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length && 
                konamiCode.every((code, index) => code === konamiSequence[index])) {
                // Activate easter egg
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 3000);
            }
        });
    }

    // Main initialization function
    function init() {
        // Check if DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        try {
            // Initialize all components
            initParticles();
            initCursor();
            initNavigation();
            initHero();
            initServices();
            initTestimonials();
            initSmoothScrolling();
            initButtons();
            initScrollAnimations();
            initStatsCounter();
            initParallax();
            initSocialButtons();
            initEasterEggs();
            optimizePerformance();
            handleErrors();
            
            // Start particle animation
            function animate() {
                animateParticles();
                requestAnimationFrame(animate);
            }
            animate();
            
            console.log('Elite8 Digital website initialized successfully! 🚀');
            
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Start initialization
    init();

    // Cleanup function for memory management
    function cleanup() {
        particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        particles = [];
    }

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when page is not visible
            document.body.style.animationPlayState = 'paused';
        } else {
            // Resume animations when page becomes visible
            document.body.style.animationPlayState = 'running';
        }
    });

    // Handle page unload
    window.addEventListener('beforeunload', cleanup);

    // Initialize particles
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        particles = [];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const particleData = {
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.1
            };
            
            particle.style.left = particleData.x + 'px';
            particle.style.top = particleData.y + 'px';
            particle.style.opacity = particleData.opacity;
            particle.style.animation = `twinkle 3s infinite ${i * 0.1}s`;
            
            particlesContainer.appendChild(particle);
            particles.push(particleData);
        }
    }

    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
    }

    // Custom cursor
    function initCursor() {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
            
            cursor.style.left = (e.clientX - 12) + 'px';
            cursor.style.top = (e.clientY - 12) + 'px';
            
            // Update hero blobs based on mouse position
            updateHeroBlobs();
        });
    }

    // Update hero blobs position based on mouse
    function updateHeroBlobs() {
        const blob1 = document.getElementById('blob1');
        const blob2 = document.getElementById('blob2');
        const blob3 = document.getElementById('blob3');
        
        if (blob1) {
            blob1.style.transform = `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`;
        }
        if (blob2) {
            blob2.style.transform = `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`;
        }
        if (blob3) {
            blob3.style.transform = `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`;
        }
    }

    // Navigation scroll effect
    function initNavigation() {
        const nav = document.getElementById('nav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');
        
        if (!nav) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        if (mobileMenuBtn && mobileMenu && menuIcon) {
            mobileMenuBtn.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                mobileMenu.classList.toggle('open', isMenuOpen);
                menuIcon.textContent = isMenuOpen ? '✕' : '☰';
                menuIcon.style.transform = isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            });
            
            // Mobile menu links
            document.querySelectorAll('.mobile-menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    isMenuOpen = false;
                    mobileMenu.classList.remove('open');
                    menuIcon.textContent = '☰';
                    menuIcon.style.transform = 'rotate(0deg)';
                });
            });
        }
    }

    // Hero section loading animation
    function initHero() {
        const heroContent = document.getElementById('heroContent');
        if (!heroContent) return;
        
        setTimeout(() => {
            heroContent.classList.add('hero-loaded');
        }, 100);
    }

    // Services section interactions (adapted for projects)
    function initServices() {
        const serviceCards = document.querySelectorAll('.service-card, .project-card');
        const cursor = document.getElementById('cursor');
        
        serviceCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                activeService = index;
                if (cursor) {
                    cursor.style.transform = 'scale(2)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                activeService = null;
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Button interactions
    function initButtons() {
        const buttons = document.querySelectorAll('button, .project-link-btn, .btn-secondary');
        const cursor = document.getElementById('cursor');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (cursor) {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.borderColor = '#ec4899';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = '#a855f7';
                }
            });
            
            button.addEventListener('click', () => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .cta-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    }

    // Stats counter animation
    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const text = stat.textContent;
                    const number = parseInt(text);
                    const suffix = text.replace(/[0-9]/g, '');
                    
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + suffix;
                    }, 50);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }

    // Parallax effects
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero blobs
            const heroBlobs = document.querySelectorAll('.hero-blob');
            heroBlobs.forEach((blob, index) => {
                const speed = 0.5 + (index * 0.2);
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Parallax for floating elements
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Contact Page Specific Functions
    function initContactPage() {
        // Form Handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';
                    
                    showNotification('Thank you! I\'ll get back to you soon.', 'success');
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'linear-gradient(to right, #8b5cf6, #ec4899)';
                    }, 3000);
                }, 2000);
            });
        }
        
        // Contact Method Click Handlers with Ripple Effect
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(168, 85, 247, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.height / 2 - size / 2) + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #8b5cf6, #ec4899)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 20rem;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${type === 'success' ? '✓' : 'ℹ'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Easter eggs and hidden features
    function initEasterEggs() {
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length && 
                konamiCode.every((code, index) => code === konamiSequence[index])) {
                // Activate easter egg
                document.body.style.filter = 'hue-rotate(180deg)';
                showNotification('🎉 Easter egg activated!', 'success');
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 3000);
            }
        });
    }

    // Resize handler
    function handleResize() {
        // Reinitialize particles on resize
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            initParticles();
        }
    }

    // Error handling
    function handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('An error occurred:', e.error);
        });
    }

    // Performance optimization
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll);
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
    }

    // Cleanup function for memory management
    function cleanup() {
        particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        particles = [];
    }

    // Main initialization function
    function init() {
        // Check if DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        try {
            // Initialize all components
            initParticles();
            initCursor();
            initNavigation();
            initHero();
            initServices();
            initButtons();
            initScrollAnimations();
            initStatsCounter();
            initParallax();
            initContactPage();
            initEasterEggs();
            optimizePerformance();
            handleErrors();
            
            // Start particle animation
            function animate() {
                animateParticles();
                requestAnimationFrame(animate);
            }
            animate();
            
            console.log('Contact page initialized successfully! 🚀');
            
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when page is not visible
            document.body.style.animationPlayState = 'paused';
        } else {
            // Resume animations when page becomes visible
            document.body.style.animationPlayState = 'running';
        }
    });

    // Handle page unload
    window.addEventListener('beforeunload', cleanup);

    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Start initialization
    init();