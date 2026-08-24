/* ============================================================
   FOREVER STILL BEAUTY — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. NAV — Scroll-based background
  -------------------------------------------------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* --------------------------------------------------
     2. MOBILE NAV — Hamburger toggle
  -------------------------------------------------- */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileNav  = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link is tapped
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------
     3. ACTIVE NAV LINK
  -------------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------
     4. SCROLL REVEAL — IntersectionObserver
  -------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers — just show everything
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* --------------------------------------------------
     5 + 6. NEWSLETTER / FOOTER FORMS
     Lead capture now lives in js/courier.js (posts to The
     Courier). Do not re-wire those forms here or they double-fire.
  -------------------------------------------------- */

  /* --------------------------------------------------
     7. CONTACT FORM
  -------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      // REPLACE: Send form data to your backend or service (Formspree, Netlify Forms, etc.)
      // Example: fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(contactForm) })

      contactForm.style.display = 'none';
      const success = document.querySelector('.form-success');
      if (success) success.style.display = 'block';
    });
  }

  /* --------------------------------------------------
     8. SHOP FILTER BUTTONS
  -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.product-card').forEach(card => {
          const show = filter === 'all' || card.dataset.cat === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* --------------------------------------------------
     9. ADD TO BAG — Placeholder interaction
  -------------------------------------------------- */
  document.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.textContent;
      this.textContent = 'Added ✓';
      this.style.background = '#9A7A50';
      this.style.borderColor = '#9A7A50';
      setTimeout(() => {
        this.textContent = original;
        this.style.background = '';
        this.style.borderColor = '';
      }, 1800);
    });
  });

  /* --------------------------------------------------
     10. SMOOTH SCROLL for in-page anchor links
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
