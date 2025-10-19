'use strict'

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

// URLSearchParams -> é um construtor, portanto deve ser chamado com o operador new
const URL = new URLSearchParams(window.location.search)

// Pega o parâmetro id na URL
const idFilme = URL.get('id')

console.log(idFilme)

async function jsonFilme(){
    const url = `https://api.themoviedb.org/3/movie/${idFilme}?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    console.log(url)

    return data
}

async function retornaDadosJsonFilme() {
    
    const object = await jsonFilme()

    const containerFilme = document.getElementById('container-filme')

    const tituloFilme = document.createElement('span')
    const containerTrailer = document.createElement('div')
    const imgBackgroundTrailer = document.createElement('img')
    const sinopseFilme = document.createElement('p')

    tituloFilme.classList.add('titulo-filme')
    containerTrailer.classList.add('container-trailer')
    sinopseFilme.classList.add('filme-sinopse')
    
    imgBackgroundTrailer.src = `https://image.tmdb.org/t/p/w500/${object.backdrop_path}`

    tituloFilme.textContent = object.title
    sinopseFilme.textContent = object.overview

    containerFilme.appendChild(tituloFilme)
    containerFilme.appendChild(containerTrailer)
    containerTrailer.appendChild(imgBackgroundTrailer)
    containerFilme.appendChild(sinopseFilme)

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

    const divFilmes = document.getElementById('recomendacoes')

    const spanLancamentos = document.createElement('span')
    spanLancamentos.textContent = "RECOMENDADO"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    divFilmes.appendChild(spanLancamentos)
    divFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        divFilme.id = filme.id

        containerCardFilmes.appendChild(divFilme)

        const divClickFilme = document.createElement('div')
        divClickFilme.classList.add('filmeClick')
        divClickFilme.id = filme.id

        divFilme.appendChild(divClickFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)

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


const homePage = document.getElementById('logo')
homePage.addEventListener('click', () => {
    window.location.href = "index.html"
})




retornaDadosJsonFilme()
retornaDadosFilmesRecomendados()