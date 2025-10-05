"use strict"

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

retornaDadosFilmes()