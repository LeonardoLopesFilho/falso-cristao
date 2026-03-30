/* ===========================================
   O FALSO PRESIDENTE CRISTÃO
   JavaScript — Interatividade e Animações
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Inicializar AOS ----
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.innerWidth < 480
    });

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Scroll to top button
        scrollTop.classList.toggle('visible', scrollY > 500);

        // Active nav link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Scroll to top click
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Filter Cards ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            newsCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- Animated Counter ----
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 50);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // ---- Particles ----
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        if (!particlesContainer || window.innerWidth < 768) return;
        
        const count = 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${6 + Math.random() * 6}s`;
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ---- Share Buttons ----
    const shareUrl = window.location.href;
    const shareTitle = 'O Falso Presidente Cristão — A verdade sobre Flávio Bolsonaro';
    const shareText = 'Antes de votar em 2026, conheça os fatos que eles não querem que você veja. Acesse:';

    document.getElementById('shareWhatsapp')?.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        window.open(url, '_blank', 'noopener');
    });

    document.getElementById('shareTelegram')?.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'noopener');
    });

    document.getElementById('shareTwitter')?.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener');
    });

    document.getElementById('shareFacebook')?.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener');
    });

    document.getElementById('copyLink')?.addEventListener('click', () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            const btn = document.getElementById('copyLink');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i><span>Copiado!</span>';
            btn.style.borderColor = '#00C853';
            btn.style.color = '#00C853';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ---- Card hover parallax effect ----
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});

// ---- Fade In Card Animation ----
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInCard {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
