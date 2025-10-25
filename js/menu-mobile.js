"use strict"

const menuBurguer = document.getElementById('mobile-menu-icon')
const closeMenuBurguer = document.getElementById('mobile-close-menu-icon')
const dropMenu = document.getElementById('categorias')
const nav = document.querySelector('.container-side-bar')

function toggleMenu() {

    const backgroundDesfocado = document.getElementById('background')
    const body = document.querySelector('body')

    backgroundDesfocado.classList.toggle('active')
    nav.classList.toggle('active')
    body.classList.toggle('scroll-desativado')

    backgroundDesfocado.addEventListener('click', () => {

        nav.classList.remove('active')
        backgroundDesfocado.classList.remove('active')
        body.classList.remove('scroll-desativado')

    })

}

function genreFilmsPages() {

    const URL = window.location.pathname

    const dropMenu = document.getElementById('drop-hover')
    const linksDropMenu = dropMenu.children

    let tagsA = []

    for(let divLink of linksDropMenu) {
        tagsA.push(divLink.children)
    }

    if (URL.includes('pages')) {
        
        for (let tag of tagsA) {
            
            
            tag[0].href = `./filmspage.html?genre-film=${tag[0].id}&page=1`


        }

    } else {

        for (let tag of tagsA) {
        
            tag[0].href = `./pages/filmspage.html?genre-film=${tag[0].id}&page=1`
            
        }

    }

    for (let link of linksDropMenu) {
        link.addEventListener('click', () => {
            let tagA = link.children[0]
            window.location.href = tagA
        })
    }
    
}

function toggleCategorias() {

    const buttonCategoria = document.getElementById('categorias')
    buttonCategoria.classList.toggle('active')

    const categorias = document.querySelector('.drop-hover')
    categorias.classList.toggle('active')

}


menuBurguer.addEventListener('click', toggleMenu)
closeMenuBurguer.addEventListener('click', toggleMenu)
dropMenu.addEventListener('click',toggleCategorias )


genreFilmsPages()