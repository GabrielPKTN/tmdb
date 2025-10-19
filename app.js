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

    json.forEach(manipulaDadosFilme)
}

async function manipulaDadosFilme(json) {

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
    const divClassificacaoIndicativa = document.createElement("div")
    const imgClassificacaoIndicativa = document.createElement("img")

    divBackgroundFilme.classList.add("item")

    divContainerInfoFilmeSlider.classList.add("container-slide-info-filme")
    divInfoFilme.classList.add("info-filme")
    divSinopseClassificacao.classList.add("sinopse-classificacao")
    divInfoImgSlide.classList.add("img-filme-slideshow")
    sinopse.classList.add("sinopse-filme-slideshow")
    divClassificacaoFilmeSlide.classList.add("classificacao-filme-slideshow")
    divClassificacao.classList.add("classificacao-slideshow")
    divClassificacaoIndicativa.classList.add("classificacao-indicativa-slideshow")

    let imgBackground = json.backdrop_path
    imgBackgroundFilme.src = `https://image.tmdb.org/t/p/w500/${imgBackground}`

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

        const spanClassificacao = document.createElement("span")
        spanClassificacao.textContent = `(${json.vote_average.toFixed(1)})`
        divClassificacao.appendChild(spanClassificacao)
    }
    defineClassificacaoFilme()

    divClassificacaoFilmeSlide.appendChild(divClassificacaoIndicativa)

    switch (await retornaDadosClassificacaoFilmes(json)) {
        case "L":
            imgClassificacaoIndicativa.src = "./assets/Livre.png"
            break;

        case "6":
            imgClassificacaoIndicativa.src = "./assets/6.png"
            break;

        case "12":
            imgClassificacaoIndicativa.src = "./assets/12.png"
            break;

        case "14":
            imgClassificacaoIndicativa.src = "./assets/14.png"
            break;

        case "16":
            imgClassificacaoIndicativa.src = "./assets/16.png"
            break;

        case "18":
            imgClassificacaoIndicativa.src = "./assets/18.png"
            break;

        default:
            imgClassificacaoIndicativa.src = "./assets/default.png"
            break;
    }

    divClassificacaoIndicativa.appendChild(imgClassificacaoIndicativa)
    divBackgroundFilme.appendChild(imgBackgroundFilme)

}

// **************************************

// **************************************Função para carregar a classificação indicativa do filme

async function jsonClassificacaoFilmes(json) {
    
    const url = `https://api.themoviedb.org/3/movie/${json.id}/release_dates?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosClassificacaoFilmes(jsonObject) {

    const json = await jsonClassificacaoFilmes(jsonObject)

    let result = manipulaDadosJsonClassificacao(json)

    return result
}

function manipulaDadosJsonClassificacao(json) {
    for (let classificacao of json) {

        if (classificacao.iso_3166_1 == 'BR') {
            
            let classificacaoBr

            classificacao.release_dates.forEach((object) => {
                
                /*
                O retorno não foi colocado diretamente dentro do forEach
                por conta que ele retorna referenciando o callback do objeto,
                sendo assim a função que retorna os dados para a aplicação
                sempre retornaria Undefined.
                */

                classificacaoBr = object.certification
                
            })

            return classificacaoBr
        }
    }
}

// **************************************

// **************************************Lançamentos

async function jsonFilmesLancamentos() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesLancamentos() {

    const json = await jsonFilmesLancamentos()

    manipulaDadosFilmeLancamentos(json)
}

function manipulaDadosFilmeLancamentos(json) {

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

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

        buttonVerMais.addEventListener('click', () => {
        window.location.href = `filmspage.html?genre-film=28`

    })

    containerCardFilmes.appendChild(buttonVerMais)

}

// **************************************

// **************************************Animação

async function jsonFilmesAnimacao() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesAnimacao() {

    const json = await jsonFilmesAnimacao()

    manipulaDadosFilmeAnimacao(json)

}

function manipulaDadosFilmeAnimacao(json) {

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

        const divClickFilme = document.createElement('div')
        divClickFilme.classList.add('filmeClick')
        divClickFilme.id = filme.id

        divFilme.appendChild(divClickFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)
    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

        buttonVerMais.addEventListener('click', () => {
        window.location.href = `filmspage.html?genre-film=16`

    })

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

        const divClickFilme = document.createElement('div')
        divClickFilme.classList.add('filmeClick')
        divClickFilme.id = filme.id

        divFilme.appendChild(divClickFilme)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        divFilme.appendChild(posterFilm)
    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

    buttonVerMais.addEventListener('click', () => {
        window.location.href = `filmspage.html?genre-film=27`

    })

    containerCardFilmes.appendChild(buttonVerMais)
    addClickFilmes()
}

// **************************************

function addClickFilmes() {
    const filmes = document.querySelectorAll(".filmeClick")
    filmes.forEach((filme) => {
        filme.addEventListener('click', () => {
            //Redireciona o usuário para a página do filme que ele clicou
            window.location.href = `filmpage.html?id=${filme.id}`
        })
    })
}

retornaDadosFilmes()
retornaDadosFilmesLancamentos()
retornaDadosFilmesAcao()
retornaDadosFilmesAnimacao()
retornaDadosFilmesTerror()