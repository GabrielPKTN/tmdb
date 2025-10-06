"use strict"

// ********************************slider

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

async function jsonFilmes() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmes() {

    const json = await jsonFilmes()

    json.forEach(manipulaDadosFilme);
}

function manipulaDadosFilme(json) {

    const sliderItems = document.getElementById('container-items')

    const divBackgroundFilme = document.createElement("div")
    const imgBackgroundFilme = document.createElement("img")
    
    divBackgroundFilme.classList.add("item")

    let imgBackground = json.backdrop_path
    imgBackgroundFilme.src =  `https://image.tmdb.org/t/p/w500/${imgBackground}`

    sliderItems.appendChild(divBackgroundFilme)
    divBackgroundFilme.appendChild(imgBackgroundFilme)

}

// **************************************

// **************************************lançamentos

async function jsonFilmesLancamentos() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesLancamentos() {

    const json = await jsonFilmesLancamentos()

    manipulaDadosFilmeLancamento(json)
}

function manipulaDadosFilmeLancamento(json) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(json[i])
    }

    const divFilmes = document.getElementById('lancamento')

    const spanLancamentos = document.createElement('span')
    spanLancamentos.textContent = "LANÇAMENTOS"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    divFilmes.appendChild(spanLancamentos)
    divFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        
        containerCardFilmes.appendChild(divFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)

    }
     
    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

    containerCardFilmes.appendChild(buttonVerMais)
    

}

// **************************************

// **************************************Ação

async function jsonFilmesAcao() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesAcao() {
    
    const json = await jsonFilmesAcao()

    manipulaDadosFilmeAcao(json)

}

function manipulaDadosFilmeAcao(json) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(json[i])
    }

    const divFilmes = document.getElementById('acao')

    const spanLancamentos = document.createElement('span')
    spanLancamentos.textContent = "AÇÃO EXPLOSIVA!!!"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    divFilmes.appendChild(spanLancamentos)
    divFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        
        containerCardFilmes.appendChild(divFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)
    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

    containerCardFilmes.appendChild(buttonVerMais)

}

// **************************************

// **************************************Animação

async function jsonFilmesComedia() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesComedia() {
    
    const json = await jsonFilmesComedia()

    manipulaDadosFilmeComedia(json)

}

function manipulaDadosFilmeComedia(json) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(json[i])
    }

    const divFilmes = document.getElementById('animacao')

    const spanLancamentos = document.createElement('span')
    spanLancamentos.textContent = "ANIMAÇÃO"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    divFilmes.appendChild(spanLancamentos)
    divFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        
        containerCardFilmes.appendChild(divFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)
    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

    containerCardFilmes.appendChild(buttonVerMais)

}

// **************************************

// **************************************Terror

async function jsonFilmesTerror() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesTerror() {
    
    const json = await jsonFilmesTerror()

    manipulaDadosFilmeTerror(json)

}

function manipulaDadosFilmeTerror(json) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(json[i])
    }

    const divFilmes = document.getElementById('terror')

    const spanLancamentos = document.createElement('span')
    spanLancamentos.textContent = "TERROR"

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImages = "https://image.tmdb.org/t/p/w200"

    divFilmes.appendChild(spanLancamentos)
    divFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const divFilme = document.createElement('div')
        divFilme.classList.add('imagem')
        
        containerCardFilmes.appendChild(divFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)
    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

    containerCardFilmes.appendChild(buttonVerMais)

}

// **************************************


retornaDadosFilmes()
retornaDadosFilmesLancamentos()
retornaDadosFilmesAcao()
retornaDadosFilmesComedia()
retornaDadosFilmesTerror()