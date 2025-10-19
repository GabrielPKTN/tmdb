"use strict"

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

// URLSearchParams -> é um construtor, portanto deve ser chamado com o operador new
const URL = new URLSearchParams(window.location.search)

// Pega o parâmetro id na URL
const idGenero = URL.get('genre-film')

async function jsonFilmes() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idGenero}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmes() {

    const json = await jsonFilmes()

    manipulaDadosFilme(json)

}

async function manipulaDadosFilme(json) {

    const listaFilmes = []

    for (let i = 0; i < json.length; i++) {
        listaFilmes.push(json[i])
    }

    const containerFilmes = document.getElementById('container-filmes')

    const spanGeneroFilmes = document.createElement('span')
    const genero = await retornaGenreFilmes()
    spanGeneroFilmes.textContent = genero.toUpperCase()

    spanGeneroFilmes.classList.add('genero-filmes')
    
    containerFilmes.appendChild(spanGeneroFilmes)

    const divFilmes = document.createElement('div')
    divFilmes.classList.add('page-filme')
    
    containerFilmes.appendChild(divFilmes)

    const urlImages = "https://image.tmdb.org/t/p/w200"

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        divFilme.id = filme.id

        divFilmes.appendChild(divFilme)

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

async function jsonGenre() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    
    return data.genres
}

async function retornaGenreFilmes() {

    const json = await jsonGenre()

    const result = manipulaJsonGenres(json)

    return result

}

function manipulaJsonGenres(json) {

    let generoFilmes

    json.forEach((genero) => {
        if (genero.id == idGenero) {
            generoFilmes = genero.name
        }
    })

    return generoFilmes

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
        window.location.href = "index.html"
    })

})


retornaDadosFilmes()