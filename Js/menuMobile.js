const btnMobile = document.querySelector(".mobile-btn");
const btnMobileClose = document.querySelector(".close-menu-mobile");

function toggleMenu() {
    const navMenu = document.querySelector(".nav-menu");
    navMenu.classList.toggle("active");
}
btnMobile.addEventListener("click", toggleMenu);
btnMobileClose.addEventListener("click", toggleMenu);