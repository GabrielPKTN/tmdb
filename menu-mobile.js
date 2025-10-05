const menuBurguer = document.getElementById('mobile-menu')
const closeMenuBurguer = document.getElementById('mobile-close-menu')

function toggleMenu() {
    const nav = document.getElementById('menu-lateral')
    console.log(nav)

    nav.classList.toggle('active')
}

menuBurguer.addEventListener('click', toggleMenu)
closeMenuBurguer.addEventListener('click', toggleMenu)