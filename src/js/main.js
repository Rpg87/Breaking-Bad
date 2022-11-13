'use strict';

// querys
const listCharacters = document.querySelector('.js_characters'); //ul
const btnSearch = document.querySelector('.form_btn');
const inputSearch = document.querySelector('.js-input');

// variables for fecth
let charactersApi = [];
let userSearch = [];


// inner li
function renderListCharacters(characters) {
    let innerlist = `<li class="listCharacters">
<article id="${characters.char_id}">
    <img class="listCharacters__img" src="${characters.img}" alt="${characters.name}">
    <h3 class="listCharacters__name">${characters.name}</h3>
    <h4 class="listCharacters__status">${characters.status}</h4>
</article>
</li>`
    return innerlist;
}

// iner characters
function renderCharacters() {
    listCharacters.innerHTML = '';
    for (const charactersList of charactersApi) {
        listCharacters.innerHTML += renderListCharacters(charactersList);
    }

}

//fetch

fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
        charactersApi = data; // we need id, img, name and status
        renderCharacters()
    })

// search
function handleClickSearch(event) {
    event.preventDefault();
    const userValue = inputSearch.value;
    fetch(`https://breakingbadapi.com/api/characters?name=${userValue}`)
        .then((response) => response.json())
        .then((data) => {
            userSearch = data;
            renderCharacters() // no pinta pero sí aparece en consola
            console.log(userSearch);


        })

}


btnSearch.addEventListener('click', handleClickSearch);

