"use strict"

const menuBurguer = document.getElementById('mobile-menu-icon')
const closeMenuBurguer = document.getElementById('mobile-close-menu-icon')

function toggleMenu() {
    const nav = document.getElementById('menu-lateral')

    nav.classList.toggle('active')
}

function genreFilmsPages() {
    const dropMenu = document.querySelector('.drop')
    const linksDropMenu = dropMenu.children
    for (let tag of linksDropMenu) {
        
        tag.href = `./filmspage.html?genre-film=${tag.id}&page=1`
        
    }
}

menuBurguer.addEventListener('click', toggleMenu)
closeMenuBurguer.addEventListener('click', toggleMenu)

genreFilmsPages()