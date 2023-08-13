const header = document.querySelector(".header");
const toggler = header.querySelector(".toggler");
const menu = header.querySelector(".header__menu");

let scrollBlocked = false;

(function () {
  toggler.addEventListener('click', () => {
    toggleToggler();
    toggleMenu();

    scrollToTop();
    toggleScroll();
  });
})();

function toggleMenu() {
  const menuOpenClass = 'header__menu_open';
  menu.classList.toggle(menuOpenClass);
}

function toggleToggler() {
  const togglerActiveClass = 'toggler_active';
  toggler.classList.toggle(togglerActiveClass);
}

function toggleScroll() {
  if (scrollBlocked) {
    unblockScroll();
  } else {
    blockScroll();
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function blockScroll() {
  scrollBlocked = true;
  window.addEventListener('scroll', scrollToTop);
}

function unblockScroll() {
  scrollBlocked = false;
  window.removeEventListener('scroll', scrollToTop);
}
