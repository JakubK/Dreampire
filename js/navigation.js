const burger = document.querySelector('.navigation__burger');
const navigationClose = document.querySelector('.navigation__close');
const navigationContent = document.querySelector('.navigation__content');

const navigation = document.querySelector('.navigation');

const toggleNavigation = () => navigation.classList.toggle('navigation--active');

burger.addEventListener('click', () => toggleNavigation());
navigationClose.addEventListener('click', () => toggleNavigation());
