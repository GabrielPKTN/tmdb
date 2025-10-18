"use strict"

// ********************************slider

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

async function jsonFilmes() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
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
    
    const divContainerInfoFilmeSlider = document.createElement("div")
    const divInfoFilme = document.createElement("div")
    const divSinopseClassificacao = document.createElement("div")
    const divInfoImgSlide = document.createElement("div")
    const imgInfoSlide = document.createElement("img")
    const sinopse = document.createElement("p")
    const divClassificacaoFilmeSlide = document.createElement("div")
    const divClassificacao = document.createElement("div")

    divBackgroundFilme.classList.add("item")

    divContainerInfoFilmeSlider.classList.add("container-slide-info-filme")
    divInfoFilme.classList.add("info-filme")
    divSinopseClassificacao.classList.add("sinopse-classificacao")
    divInfoImgSlide.classList.add("img-filme-slideshow")
    sinopse.classList.add("sinopse-filme-slideshow")
    divClassificacaoFilmeSlide.classList.add("classificacao-filme-slideshow")
    divClassificacao.classList.add("classificacao-slideshow")

    let imgBackground = json.backdrop_path
    imgBackgroundFilme.src =  `https://image.tmdb.org/t/p/w500/${imgBackground}`

    let posterFilm = json.poster_path
    imgInfoSlide.src = `https://image.tmdb.org/t/p/w200/${posterFilm}`

    sinopse.textContent = json.overview 

    const limiteCaracteresSinopse = 150

    let textoSinopse = sinopse.textContent
    if (textoSinopse.length > limiteCaracteresSinopse) {
        sinopse.textContent = textoSinopse.substring(0, limiteCaracteresSinopse) + "..."
    }

    sliderItems.appendChild(divBackgroundFilme)
    divBackgroundFilme.appendChild(divContainerInfoFilmeSlider)
    divContainerInfoFilmeSlider.appendChild(divInfoFilme)
    divInfoFilme.appendChild(divSinopseClassificacao)
    divSinopseClassificacao.appendChild(divInfoImgSlide)
    divInfoImgSlide.appendChild(imgInfoSlide)
    divSinopseClassificacao.appendChild(sinopse)
    divSinopseClassificacao.appendChild(divClassificacaoFilmeSlide)
    divClassificacaoFilmeSlide.appendChild(divClassificacao)

    function defineClassificacaoFilme() {

        const classificacaoMaxima = 5
        const classificacaoFilme = (json.vote_average.toFixed(0) / 2).toFixed(0)

        for (let i = 1; i <= classificacaoFilme; i++) {

            const estrelaPreenchida = document.createElement("i")
            estrelaPreenchida.classList.add("fa-solid")
            estrelaPreenchida.classList.add("fa-star")

            divClassificacao.appendChild(estrelaPreenchida)

        }

        /* 
        Por algum motivo, quando modificava o atributo classificacaoFilme
        diretamente, tinha problemas com promisses, tentei criar uma cópia
        com json.parse, e stringify mas ainda sim não tive êxito, somente
        quando fiz com que uma variavel recebesse o valor de classificacaoFilme.
        */ 
       
        let copyClassificacaoFilme = classificacaoFilme

        while (copyClassificacaoFilme < classificacaoMaxima) {
            
            const estrelaVazia = document.createElement("i")
            estrelaVazia.classList.add('fa-solid')
            estrelaVazia.classList.add('fa-star')
            estrelaVazia.classList.add('estrelaVazia')
            
            divClassificacao.appendChild(estrelaVazia)
            copyClassificacaoFilme++

        }

    } 
    defineClassificacaoFilme()

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
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=pt-BR`
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