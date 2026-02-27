/* =============================================
   SIVAMURUGAN PORTFOLIO — script.js
   ============================================= */

/* ---------- CUSTOM CURSOR ---------- */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
  // Dot follows immediately
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';

  // Ring follows with a slight delay
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 80);
});

// Expand cursor on interactive elements
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '20px';
    cursor.style.height     = '20px';
    cursorRing.style.width  = '60px';
    cursorRing.style.height = '60px';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursorRing.style.width  = '40px';
    cursorRing.style.height = '40px';
  });
});

/* ---------- TYPEWRITER ANIMATION ---------- */
const words = ['Web Developer', 'Programmer', 'Problem Solver', 'CSE Student'];
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typeEl = document.getElementById('typeText');

function type() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // Typing forward
    typeEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      // Pause before deleting
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    // Deleting
    typeEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

// Start typewriter
type();

/* ---------- SCROLL FADE-IN (About, Footer, etc.) ---------- */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in-section').forEach((el) => {
  fadeObserver.observe(el);
});

/* ---------- SKILL CARDS SCROLL ANIMATION ---------- */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);

        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);

        // Stop observing once animated
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-card').forEach((el) => {
  skillObserver.observe(el);
});
