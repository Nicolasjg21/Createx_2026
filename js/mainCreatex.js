/* ================================================
   CREATEX 2026 — main.js
   Actividad Académica 3 · Sitio Web Bilingüe
================================================ */

/* ---- Language Toggle ---- */
function setLang(lang) {
    const b = document.body;
    const btns = {
        both: document.getElementById('btnBoth'),
        es:   document.getElementById('btnEs'),
        en:   document.getElementById('btnEn')
    };
    b.classList.remove('show-es', 'show-en');
    Object.values(btns).forEach(btn => btn.classList.remove('active'));
    if (lang === 'es') {
        b.classList.add('show-es');
        btns.es.classList.add('active');
    } else if (lang === 'en') {
        b.classList.add('show-en');
        btns.en.classList.add('active');
    } else {
        btns.both.classList.add('active');
    }
    try { localStorage.setItem('createx-lang', lang); } catch(e) {}
}

/* ---- Mobile Menu ---- */
function toggleMenu() {
    const links = document.getElementById('navLinks');
    const ham   = document.getElementById('ham');
    const open  = links.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
}

/* ---- Glossary Real-Time Filter ---- */
function filterGlossary() {
    const q    = document.getElementById('gsearch').value.toLowerCase();
    const rows = document.querySelectorAll('#gtable tbody tr');
    let n = 0;
    rows.forEach(r => {
        const match = r.textContent.toLowerCase().includes(q);
        r.classList.toggle('hide', !match);
        if (match) n++;
    });
    document.getElementById('gcount').textContent = n + ' term' + (n !== 1 ? 's' : '');
}

/* ---- Scroll Reveal ---- */
const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ---- Smooth Scroll (offset for fixed nav) ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('ham').setAttribute('aria-expanded', 'false');
    });
});

/* ---- Init: restore language preference ---- */
(function init() {
    let saved = 'both';
    try { saved = localStorage.getItem('createx-lang') || 'both'; } catch(e) {}
    setLang(saved);
})();
