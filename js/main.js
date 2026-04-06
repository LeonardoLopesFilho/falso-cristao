/* ===========================================
   MAIN.JS — Site público
   Carrega notícias do localStorage (dados.js)
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Init AOS ----
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.innerWidth < 480
    });

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const sy = window.scrollY;
        navbar.classList.toggle('scrolled', sy > 50);
        scrollTopBtn.classList.toggle('visible', sy > 500);

        let cur = '';
        sections.forEach(s => {
            if (sy >= s.offsetTop - 100) cur = s.id;
        });
        navLinksAll.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(l => {
        l.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Particles ----
    const pc = document.getElementById('particles');
    if (pc && window.innerWidth >= 768) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            const sz = (2 + Math.random() * 3) + 'px';
            p.style.width = sz;
            p.style.height = sz;
            pc.appendChild(p);
        }
    }

    // ---- Share ----
    const url = window.location.href;
    const txt = 'Antes de votar em 2026, conheça os fatos que eles não querem que você veja:';

    const shareMap = {
        shareWhatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(txt + ' ' + url)}`,
        shareTelegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(txt)}`,
        shareTwitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${encodeURIComponent(url)}`,
        shareFacebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    Object.entries(shareMap).forEach(([id, link]) => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link, '_blank');
        });
    });

    document.getElementById('copyLink')?.addEventListener('click', () => {
        navigator.clipboard.writeText(url).then(() => {
            const btn = document.getElementById('copyLink');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i><span>Copiado!</span>';
            setTimeout(() => { btn.innerHTML = orig; }, 2000);
        });
    });

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const t = document.querySelector(this.getAttribute('href'));
            if (t) {
                e.preventDefault();
                window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // CARREGAR NOTÍCIAS DO LOCALSTORAGE
    // ============================================
    carregarSite();
});

// ---- Helpers ----
function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

// ---- Carregar tudo ----
function carregarSite() {
    const noticias = getNoticias().sort((a, b) => (a.ordem || 99) - (b.ordem || 99));

    renderCards(noticias);
    renderTimeline(noticias);
    atualizarContadores(noticias);
    setupFiltros();
    setupCardHover();
}

// ---- Cards ----
function renderCards(news) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    if (news.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#8A9A8A;">Nenhuma notícia cadastrada ainda.</p>';
        return;
    }

    grid.innerHTML = news.map((n, i) => {
        const sevClass = n.severidade === 'critico' ? 'severity-critical' : 'severity-high';
        const sevIcon = n.severidade === 'critico' ? 'fas fa-skull-crossbones' : 'fas fa-exclamation-triangle';
        const sevLabel = n.severidade === 'critico' ? 'CRÍTICO' : 'GRAVE';
        const delay = ((i % 3) + 1) * 100;
        const tags = (n.tags || '').split(',').map(t => t.trim()).filter(Boolean);

        return `
        <article class="news-card" data-category="${esc(n.filtro)}" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="card-severity ${sevClass}">
                <i class="${sevIcon}"></i> ${sevLabel}
            </div>
            <div class="card-category">
                <i class="${esc(n.icone || 'fas fa-newspaper')}"></i> ${esc(n.categoria)}
            </div>
            <h3 class="card-title">${esc(n.titulo)}</h3>
            <p class="card-body">${n.resumo || ''}</p>
            <div class="card-evidence">
                <i class="fas fa-link"></i>
                <a href="${esc(n.link)}" target="_blank" rel="noopener">
                    ${esc(n.fonte)} — Ver fonte
                </a>
            </div>
            <div class="card-footer">
                ${tags.map(t => `<span class="card-tag"><i class="fas fa-tag"></i> ${esc(t)}</span>`).join('')}
            </div>
        </article>`;
    }).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();
}

// ---- Timeline ----
function renderTimeline(news) {
    const el = document.getElementById('timelineContainer');
    if (!el) return;

    const items = news.filter(n => n.timeline_titulo && n.ano);
    if (items.length === 0) {
        el.innerHTML = '<p style="text-align:center;padding:40px;color:#8A9A8A;">Nenhum item na timeline.</p>';
        return;
    }

    el.innerHTML = items.map((n, i) => `
        <div class="timeline-item" data-aos="${i % 2 === 0 ? 'fade-right' : 'fade-left'}">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="timeline-date">${esc(n.ano)}</span>
                <h4>${esc(n.timeline_titulo)}</h4>
                <p>${esc(n.timeline_desc)}</p>
            </div>
        </div>`).join('');

    if (typeof AOS !== 'undefined') AOS.refresh();
}

// ---- Contadores ----
function atualizarContadores(news) {
    const el1 = document.getElementById('statEscandalos');
    const el2 = document.getElementById('statFontes');

    if (el1) animaNumero(el1, news.length);

    const fontes = new Set(news.map(n => n.fonte).filter(Boolean));
    if (el2) animaNumero(el2, fontes.size);
}

function animaNumero(el, alvo) {
    let atual = 0;
    const inc = alvo / 30;
    const timer = setInterval(() => {
        atual += inc;
        if (atual >= alvo) {
            el.textContent = alvo;
            clearInterval(timer);
        } else {
            el.textContent = Math.ceil(atual);
        }
    }, 50);
}

// ---- Filtros ----
function setupFiltros() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            document.querySelectorAll('.news-card').forEach(card => {
                if (f === 'all' || card.dataset.category === f) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInCard 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ---- 3D Hover ----
function setupCardHover() {
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const r = card.getBoundingClientRect();
            const rx = (e.clientY - r.top - r.height / 2) / 20;
            const ry = (r.width / 2 - (e.clientX - r.left)) / 20;
            card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ---- Animação fadeIn ----
const st = document.createElement('style');
st.textContent = '@keyframes fadeInCard{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(st);
