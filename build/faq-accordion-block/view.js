/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/faq-accordion-block/view.js ***!
  \*****************************************/
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.faq-accordion');
  accordions.forEach(accordion => {
    const activeColor = accordion.dataset.activeColor || '#0073aa';
    const questions = accordion.querySelectorAll('.faq-question');
    questions.forEach(button => {
      button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        const answer = document.getElementById(button.getAttribute('aria-controls'));

        // Close all others
        questions.forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
          btn.querySelector('.faq-icon').textContent = '+';
          btn.style.color = '';
          const ans = document.getElementById(btn.getAttribute('aria-controls'));
          if (ans) ans.hidden = true;
        });

        // Toggle current
        if (!isOpen) {
          button.setAttribute('aria-expanded', 'true');
          button.querySelector('.faq-icon').textContent = '-';
          button.style.color = activeColor;
          if (answer) answer.hidden = false;
        }
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map