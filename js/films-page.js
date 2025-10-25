"use strict"

const apiKey = "3d789a9185a6ba77b7362aae44dd32ea"

// URLSearchParams -> é um construtor, portanto deve ser chamado com o operador new
const URL = new URLSearchParams(window.location.search)

// Pega o parâmetro id na URL
const idGenero = URL.get('genre-film')

// Pega a página de filmes na URL
const paginaFilmes = URL.get('page')

async function jsonFilmes() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idGenero}&page=${paginaFilmes}`
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

    const containerFilmesFilmsPage = document.getElementById('container-filmes-film-page')

    const spanGeneroFilmes = document.createElement('span')
    const genero = await retornaGenreFilmes()
    spanGeneroFilmes.textContent = genero.toUpperCase()

    spanGeneroFilmes.classList.add('genero-filmes')
    
    containerFilmesFilmsPage.appendChild(spanGeneroFilmes)

    const containerFilmes = document.createElement('div')
    containerFilmes.classList.add('page-filme')
    
    containerFilmesFilmsPage.appendChild(containerFilmes)

    const urlImages = "https://image.tmdb.org/t/p/w200"

    for (let filme of listaFilmes) {

        const containerFilme = document.createElement('div')
        containerFilme.classList.add('filme')
        containerFilme.id = filme.id

        containerFilmes.appendChild(containerFilme)

        const filmeClick = document.createElement('div')
        filmeClick.classList.add('filmeClick')
        filmeClick.id = filme.id

        containerFilme.appendChild(filmeClick)

        const posterFilm = document.createElement('img')

        const imagemPoster = filme.poster_path
        posterFilm.src = urlImages + imagemPoster

        containerFilme.appendChild(posterFilm)

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

const state = {
    page: Number(paginaFilmes),
    total_pages: 500,
    maxVisibleButtons: 5
    
}

const controls = {

    next() {
        state.page++


        const ultimaPagina = state.page > state.total_pages

        //Se eu passar da última página
        if(ultimaPagina) {
            state.page--
        }

    },

    prev() {
        state.page--

        if (state.page < 0) {
            state.page++
        }

    },

    goTo(pageNumber) {
        if (pageNumber < 1) {
            pageNumber = 1
        }

        if (pageNumber > state.total_pages) {
            pageNumber = state.total_pages
        }

        window.location.href = `filmspage.html?genre-film=${idGenero}&page=${pageNumber}`
    },

    createListeners() {

        const iconFirstPage = document.getElementById('first')
        iconFirstPage.addEventListener('click', () => {
            controls.goTo(1)
        })

        const iconNextPage = document.getElementById('next')
        iconNextPage.addEventListener('click', () => {
            controls.next()
            controls.goTo(state.page)
        })

        const iconPreviousPage = document.getElementById('previous')
        iconPreviousPage.addEventListener('click', () => {
            controls.prev()
            controls.goTo(state.page)
        })

        const iconLastPage = document.getElementById('last')
        iconLastPage.addEventListener('click', () => {
            const lastPage = state.total_pages
            controls.goTo(lastPage)
        })


    }

}

const buttons = {

    create(number) {
        const containerButtons = document.getElementById('buttons-pages')

        const buttonPage = document.createElement('div')
        buttonPage.classList.add('button-page')
        buttonPage.textContent = number

        if(state.page == number) {
            buttonPage.classList.add('active')
        }

        buttonPage.addEventListener('click', (object) => {
            const page = object.target.innerText

            controls.goTo(page)

            buttons.update()
        })

        containerButtons.appendChild(buttonPage)
    },

    //Função para atualizar, e limitar o número de botões de paginação
    //que aparecem na página.
    update() {

        //Container onde ficam os botões
        const containerButtons = document.getElementById('buttons-pages')
        
        //Limpa o container toda vez que a função update roda
        containerButtons.innerHTML = ""
        
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()

        /*
         * page = botão que representa a página 
         * 
         * Enquanto o intervalo de maxLeft até maxRight não for prenchido,
         * ele cria os botões dentro da div buttons-pages
         * 
         */
        for(let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }

    },

    calculateMaxVisible() {

        // Desestruturando o objeto state, e tirando o atributo maxVisibleButtons
        // para utilizar no calculo de botões visíveis
        const { maxVisibleButtons } = state

        /*
         *
         * maxLeft/maxRight   ->   Quantidade de botões que terei para a esquerda/direita
         *                         nesse caso como foi definido que o número total
         *                         de botões seria 5, dividimos por 2, 2.5
         * 
         * Math.floor       ->     Retorna o menor inteiro que é maior ou igual a 5/2
         *                         nesse caso, 2
         * 
         */

        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))
        
        /*
         * Se o valor do primeiro botão que aparecer na esquerda for menor do que 1
         * então o primeiro botão da esquerda recebe 1 e o último 5, respeitando o
         * intervalo de botões que podem aparecer.
         */ 
        if(maxLeft < 1) {
            maxLeft = 1
            maxRight = 5
        }

        /*
         * Se o último botão que representa a página atual for maior que a quantidade
         * de páginas máximas definidas, então o primeiro botão da esquerda vai receber
         * o valor de 500 - (5 - 1), que é 496, e o último botão da direita recebe 500.
         */ 
        if (maxRight > state.total_pages) {
            maxLeft = state.total_pages - ( maxVisibleButtons - 1 )
            maxRight = state.total_pages

            if(maxRight < 1) {
                maxLeft = 1
            }

        }

        return {maxLeft, maxRight}

    }
}

function init() {

    buttons.update()
    controls.createListeners()
    retornaDadosFilmes()

}

document.addEventListener('DOMContentLoaded', () => {
    
    const homePage = document.getElementById('logo')
    
    homePage.addEventListener('click', () => {
        window.location.href = "../index.html"
    })

    init()

})
