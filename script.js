document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.main-navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(255, 255, 255, 0.98)';
                navMenu.style.backdropFilter = 'blur(20px)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = 'var(--shadow-lg)';
                navMenu.style.zIndex = '1000';
                navMenu.style.gap = '8px';
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.padding = '0';
                navMenu.style.boxShadow = 'none';
                navMenu.style.background = 'transparent';
            }
        });
    }

    // Animated counter for hero stats
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.replace(/[0-9.]/g, '');
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = target >= 10 ? Math.floor(current) + suffix : current.toFixed(1) + suffix;
        }, duration / steps);
    });

    // Dashboard metric interactions
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('click', function () {
            metricItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update main dashboard based on selection
            const metricType = this.querySelector('span:not(.metric-value)').textContent;
            updateDashboardPreview(metricType);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Chart.js Implementation for Dashboard
    if (document.getElementById('flowChart')) {
        const ctx = document.getElementById('flowChart').getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 82, 204, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 82, 204, 0.05)');
        
        const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
        gradient2.addColorStop(0, 'rgba(0, 184, 217, 0.3)');
        gradient2.addColorStop(1, 'rgba(0, 184, 217, 0.05)');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Admissions',
                        data: [65, 78, 90, 85, 92, 88, 95],
                        borderColor: '#0052CC',
                        backgroundColor: gradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#0052CC',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    },
                    {
                        label: 'Discharges',
                        data: [45, 55, 65, 70, 68, 75, 72],
                        borderColor: '#00B8D9',
                        backgroundColor: gradient2,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#00B8D9',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#172B4D',
                        bodyColor: '#42526E',
                        borderColor: '#DFE1E6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        boxPadding: 6
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(223, 225, 230, 0.5)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6B778C',
                            font: {
                                size: 12,
                                weight: 500
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(223, 225, 230, 0.5)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6B778C',
                            font: {
                                size: 12,
                                weight: 500
                            }
                        }
                    }
                }
            }
        });
        
        // Simulate live data updates
        setInterval(() => {
            chart.data.datasets.forEach(dataset => {
                const lastValue = dataset.data[dataset.data.length - 1];
                const randomChange = Math.floor(Math.random() * 10) - 3;
                const newValue = Math.max(30, lastValue + randomChange);
                
                dataset.data.shift();
                dataset.data.push(newValue);
            });
            
            chart.update('none');
        }, 3000);
    }

    // Form submission
    const formButton = document.querySelector('.form-button');
    const formInput = document.querySelector('.form-input');
    
    if (formButton && formInput) {
        formButton.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (formInput.value && formInput.value.includes('@')) {
                // Success state
                formInput.value = '';
                formInput.placeholder = 'Demo scheduled! Check your email.';
                formButton.innerHTML = '<i class="fas fa-check"></i><span>Scheduled!</span>';
                formButton.style.background = 'var(--success)';
                
                setTimeout(() => {
                    formInput.placeholder = 'Enter your work email';
                    formButton.innerHTML = '<i class="fas fa-arrow-right"></i><span>Get Free Demo</span>';
                    formButton.style.background = 'var(--accent)';
                }, 3000);
            } else {
                // Error state
                formInput.style.boxShadow = '0 0 0 2px var(--danger)';
                formInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    formInput.style.boxShadow = '';
                    formInput.placeholder = 'Enter your work email';
                }, 2000);
            }
        });
    }

    // Hover effects for cards
    const cards = document.querySelectorAll('.module-card, .metric-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '1';
        });
    });

    // Update dashboard preview based on selected metric
    function updateDashboardPreview(metricType) {
        const metricValues = {
            'Bed Occupancy': '84%',
            'ER Wait Time': '12min',
            'Staff On Duty': '247',
            'Ambulance Active': '8'
        };
        
        // Update main dashboard values based on selection
        const mainValues = document.querySelectorAll('.metric-value-large');
        if (mainValues.length > 0) {
            mainValues.forEach((value, index) => {
                const baseValues = [1248, 89, 312, 18];
                const changes = [25, 3, -8, 2];
                
                // Simulate different values based on metric
                let newValue = baseValues[index];
                if (metricType === 'ER Wait Time') {
                    newValue += changes[index] * 2;
                } else if (metricType === 'Staff On Duty') {
                    newValue += changes[index] * 1.5;
                }
                
                value.textContent = index === 3 ? newValue + 'min' : newValue.toLocaleString();
                
                // Update trends
                const trend = value.parentElement.querySelector('.metric-trend');
                if (trend) {
                    const isUp = changes[index] > 0;
                    trend.className = `metric-trend ${isUp ? 'up' : 'down'}`;
                    trend.innerHTML = `<i class="fas fa-arrow-${isUp ? 'up' : 'down'}"></i> ${Math.abs(changes[index])}% from yesterday`;
                }
            });
        }
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add floating particles to hero background
    function createParticles() {
        const heroBg = document.querySelector('.hero-background');
        if (!heroBg) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(${Math.random() * 200 - 100}px) translateX(${Math.random() * 200 - 100}px); }
                }
            `;
            document.head.appendChild(style);
            
            heroBg.appendChild(particle);
        }
    }
    
    createParticles();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.overview-card, .module-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add animation classes on intersection
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.overview-card, .module-card, .feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    // Observe each section
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
});

// Initialize everything when DOM is loaded
window.addEventListener('load', function () {
    // Add loaded class for CSS transitions
    document.body.classList.add('loaded');
});