'use strict'

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

// URLSearchParams -> é um construtor, portanto deve ser chamado com o operador new
const URL = new URLSearchParams(window.location.search)

// Pega o parâmetro id na URL
const idFilme = URL.get('id')

async function filme(){
    const url = `https://api.themoviedb.org/3/movie/${idFilme}?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

async function retornaDadosFilme() {
    
    const object = await filme()

    const containerFilme = document.getElementById('container-filmpage-filme')

    const tituloFilme = document.createElement('span')
    tituloFilme.classList.add('titulo-filme')

    const containerTrailer = document.createElement('div')
    containerTrailer.classList.add('container-trailer')

    const imgBackgroundTrailer = document.createElement('img')
    imgBackgroundTrailer.src = `https://image.tmdb.org/t/p/w500/${object.backdrop_path}`

    const sinopseFilme = document.createElement('p')
    sinopseFilme.classList.add('filme-sinopse')
    
    tituloFilme.textContent = object.title
    sinopseFilme.textContent = object.overview

    containerFilme
    .appendChild(tituloFilme)

    containerFilme
    .appendChild(containerTrailer)

    containerTrailer
    .appendChild(imgBackgroundTrailer)

    containerFilme
    .appendChild(sinopseFilme)

}

async function jsonFilmesRecomendados() {
    const url = `https://api.themoviedb.org/3/movie/${idFilme}/recommendations?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesRecomendados() {

    const json = await jsonFilmesRecomendados()

    manipulaDadosFilmeRecomendados(json)
}

function manipulaDadosFilmeRecomendados(json) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(json[i])
    }

    const containerFilmes = document.getElementById('recomendacoes')

    const spanRecomendados = document.createElement('span')
    spanRecomendados.textContent = "RECOMENDADO"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    containerFilmes.appendChild(spanRecomendados)
    containerFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const containerFilme = document.createElement('div')
        containerFilme.classList.add('filme')
        containerFilme.id = filme.id

        containerCardFilmes.appendChild(containerFilme)

        const clickFilme = document.createElement('div')
        clickFilme.classList.add('filmeClick')
        clickFilme.id = filme.id

        containerFilme.appendChild(clickFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        containerFilme.appendChild(posterFilm)

    }

    addClickFilmes()
}

function addClickFilmes() {
    const filmes = document.querySelectorAll(".filmeClick")
    filmes.forEach((filme) => {
        filme.addEventListener('click', () => {
            //Redireciona o usuário para a página do filme que ele clicou
            window.location.href = `filmpage.html?id=${filme.id}`
        })
    })
}


document.addEventListener('DOMContentLoaded', () => {
    
    const homePage = document.getElementById('logo')
    
    homePage.addEventListener('click', () => {
        window.location.href = "../index.html"
    })

})




retornaDadosFilme()
retornaDadosFilmesRecomendados()