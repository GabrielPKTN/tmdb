"use strict"

// ********************************slider

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

async function filmesSlider() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesSlider() {

    const filmes = await filmesSlider()

    filmes.forEach(manipulaDadosFilmeSlider)
}

async function manipulaDadosFilmeSlider(filmeObject) {

    const containerFilmesSliderHomePage = document.getElementById('container-filmes-slider')

    const containerFilmeSlider = document.createElement("div")
    containerFilmeSlider.classList.add("container-filme-slider")

    const imagemBackgroundFilmeSlider = document.createElement("img")
    let imgBackground = filmeObject.backdrop_path
    imagemBackgroundFilmeSlider.src = `https://image.tmdb.org/t/p/w500/${imgBackground}`

    const containerLabelFilmeSlider = document.createElement("div")
    containerLabelFilmeSlider.classList.add("container-label-filme-slider")

    const containerInformacoesFilmeSlider = document.createElement("div")
    containerInformacoesFilmeSlider.classList.add("container-informacoes-filme-slider")
    
    const containerPosterFilmeInformacoesSlider = document.createElement("div")
    containerPosterFilmeInformacoesSlider.classList.add("poster-filme-informacoes-slider")

    const imagemPosterFilmeInformacoesSlider = document.createElement("img")
    let posterFilm = filmeObject.poster_path
    imagemPosterFilmeInformacoesSlider.src = `https://image.tmdb.org/t/p/w200/${posterFilm}`
 
    const sinopseContainerInformacoesSlider = document.createElement("p")
    sinopseContainerInformacoesSlider.classList.add("sinopse-filme-slider")
    
    const containerClassificacaoFilmeSlider = document.createElement("div")
    containerClassificacaoFilmeSlider.classList.add("classificacao-filme-slider")

    const containerClassificacaoSlider = document.createElement("div")
    containerClassificacaoSlider.classList.add("classificacao-slider")

    const containerClassificacaoIndicativaSlider = document.createElement("div")
    containerClassificacaoIndicativaSlider.classList.add("classificacao-indicativa-slider")

    const imageContainerClassificacaoIndicativaslider = document.createElement("img")

    sinopseContainerInformacoesSlider.textContent = filmeObject.overview

    const limiteCaracteresSinopse = 150
    let textoSinopse = sinopseContainerInformacoesSlider.textContent

    if (textoSinopse.length > limiteCaracteresSinopse) {
        sinopseContainerInformacoesSlider.textContent = textoSinopse.substring(0, limiteCaracteresSinopse) + "..."
    }

    containerFilmesSliderHomePage
    .appendChild(containerFilmeSlider)

    containerFilmeSlider
    .appendChild(containerLabelFilmeSlider)

    containerLabelFilmeSlider
    .appendChild(containerInformacoesFilmeSlider)

    containerInformacoesFilmeSlider
    .appendChild(containerPosterFilmeInformacoesSlider)

    containerPosterFilmeInformacoesSlider
    .appendChild(imagemPosterFilmeInformacoesSlider)

    containerInformacoesFilmeSlider
    .appendChild(sinopseContainerInformacoesSlider)

    containerInformacoesFilmeSlider
    .appendChild(containerClassificacaoFilmeSlider)

    containerClassificacaoFilmeSlider
    .appendChild(containerClassificacaoSlider)

    function defineClassificacaoFilme() {

        const classificacaoMaxima = 5

        let classificacaoFilme = (filmeObject.vote_average.toFixed(0) / 2).toFixed(0)

        for (let i = 1; i <= classificacaoFilme; i++) {

            const estrelaPreenchida = document.createElement("i")
            estrelaPreenchida.classList.add("fa-solid")
            estrelaPreenchida.classList.add("fa-star")

            containerClassificacaoSlider.appendChild(estrelaPreenchida)

        }

        while (classificacaoFilme < classificacaoMaxima) {

            const estrelaVazia = document.createElement("i")
            estrelaVazia.classList.add('fa-solid')
            estrelaVazia.classList.add('fa-star')
            estrelaVazia.classList.add('estrelaVazia')

            containerClassificacaoSlider.appendChild(estrelaVazia)
            classificacaoFilme++

        }

        const spanClassificacao = document.createElement("span")
        spanClassificacao.textContent = `(${filmeObject.vote_average.toFixed(1)})`
        containerClassificacaoSlider.appendChild(spanClassificacao)
    }

    defineClassificacaoFilme()

    containerClassificacaoFilmeSlider
    .appendChild(containerClassificacaoIndicativaSlider)

    switch (await retornaDadosClassificacaoFilmes(filmeObject)) {
        case "L":
            imageContainerClassificacaoIndicativaslider.src = "../assets/Livre.png"
            break;

        case "6":
            imageContainerClassificacaoIndicativaslider.src = "../assets/6.png"
            break;

        case "12":
            imageContainerClassificacaoIndicativaslider.src = "../assets/12.png"
            break;

        case "14":
            imageContainerClassificacaoIndicativaslider.src = "../assets/14.png"
            break;

        case "16":
            imageContainerClassificacaoIndicativaslider.src = "../assets/16.png"
            break;

        case "18":
            imageContainerClassificacaoIndicativaslider.src = "../assets/18.png"
            break;

        default:
            imageContainerClassificacaoIndicativaslider.src = "../assets/default.png"
            break;
    }

    containerClassificacaoIndicativaSlider
    .appendChild(imageContainerClassificacaoIndicativaslider)

    containerFilmeSlider
    .appendChild(imagemBackgroundFilmeSlider)

}

// **************************************

// **************************************Função para carregar a classificação indicativa do filme

async function classificacaoFilmeSlider(filme) {
    
    const url = `https://api.themoviedb.org/3/movie/${filme.id}/release_dates?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosClassificacaoFilmes(filme) {

    const arrayClassificacao = await classificacaoFilmeSlider(filme)

    let result = manipulaArrayClassificacaoSlider(arrayClassificacao)

    return result
}

function manipulaArrayClassificacaoSlider(json) {
    
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

async function filmesLancamentos() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmesLancamentos() {

    const jsonFilmes = await filmesLancamentos()

    manipulaDadosFilmeLancamentos(jsonFilmes)
}

function manipulaDadosFilmeLancamentos(jsonFilmes) {

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(jsonFilmes[i])
    }

    const containerFilmes = document.getElementById('lancamento')

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImagens = "https://image.tmdb.org/t/p/w200"

    containerFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const containerFilme = document.createElement('div')
        containerFilme.classList.add('filme')
        containerFilme.id = filme.id

        containerCardFilmes.appendChild(containerFilme)

        const filmeClick = document.createElement('div')
        filmeClick.classList.add('filmeClick')
        filmeClick.id = filme.id

        containerFilme.appendChild(filmeClick)

        const posterFilme = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilme.src = urlImagens + imagemPoster

        containerFilme.appendChild(posterFilme)

    }


}

// **************************************



// **************************************Todos container da section filmes


async function filmes(idGeneroFilme) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idGeneroFilme}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    return data.results
}

async function retornaDadosFilmes() {

    const idsGenerosFilmesHomePage = [28, 16, 27]

    for (let idGeneroFilme of idsGenerosFilmesHomePage) {

        const jsonFilmes = await filmes(idGeneroFilme)

        manipulaDadosFilme(jsonFilmes, idGeneroFilme)
    }
    
}

function manipulaDadosFilme(jsonFilmes, genero) {

    let generoContainerSectionFilme

    if (genero == 28) {
        generoContainerSectionFilme = 'acao'

    } else if (genero == 16) {
        generoContainerSectionFilme = 'animacao'

    } else {
        generoContainerSectionFilme = 'terror'

    }

    const listaFilmes = []

    for (let i = 0; i < 9; i++) {
        listaFilmes.push(jsonFilmes[i])
    }

    const containerFilmes = document.getElementById(generoContainerSectionFilme)

    const containerCardFilmes = document.createElement('div')
    containerCardFilmes.classList.add('container-card-filmes')

    const urlImagens = "https://image.tmdb.org/t/p/w200"

    containerFilmes.appendChild(containerCardFilmes)

    for (let filme of listaFilmes) {

        const containerFilme = document.createElement('div')
        containerFilme.classList.add('filme')
        containerFilme.id = filme.id

        containerCardFilmes.appendChild(containerFilme)

        const filmeClick = document.createElement('div')
        filmeClick.classList.add('filmeClick')
        filmeClick.id = filme.id

        containerFilme.appendChild(filmeClick)

        const posterFilme = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilme.src = urlImagens + imagemPoster

        containerFilme.appendChild(posterFilme)

    }

    const buttonVerMais = document.createElement("button")
    buttonVerMais.textContent = "VER MAIS..."

        buttonVerMais.addEventListener('click', () => {
        window.location.href = `filmspage.html?genre-film=${genero}`

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
            console.log(`./filmpage.html?id=${filme.id}`)
            window.location.href = `./filmpage.html?id=${filme.id}`
        })
    })
}

retornaDadosFilmesSlider()
retornaDadosFilmesLancamentos()
retornaDadosFilmes()