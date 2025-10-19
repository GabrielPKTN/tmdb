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

    tituloFilme.classList.add('titulo-filme')
    containerTrailer.classList.add('container-trailer')

    imgBackgroundTrailer.src = `https://image.tmdb.org/t/p/w500/${object.backdrop_path}`

    tituloFilme.textContent = object.original_title

    containerFilme.appendChild(tituloFilme)
    containerFilme.appendChild(containerTrailer)
    containerTrailer.appendChild(imgBackgroundTrailer)

}

retornaDadosJsonFilme()