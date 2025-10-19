'use strict'

// URLSearchParams -> é um construtor, portanto deve ser chamado com o operador new
const URL = new URLSearchParams(window.location.search)

// Pega o parâmetro id na URL
const idFilme = URL.get('id')

