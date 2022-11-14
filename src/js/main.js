'use strict';

// querys
const listCharacters = document.querySelector('.js_characters'); //ul
const btnSearch = document.querySelector('.form_btn');
const inputSearch = document.querySelector('.js-input');
const favoritesList = document.querySelector('.js_favoritesList');



// variables for fecth
let charactersApi = [];
let userSearch = [];
let favoritesCharacters = [];


// inner li => next step DOM
function renderListCharacters(characters) {
    let innerlist = `<li  class="listCharacters js_liCard" id="${characters.char_id}">
<article>
    <img class="listCharacters__img" src="${characters.img}" alt="${characters.name}">
    <h3 class="listCharacters__name">${characters.name}</h3>
    <h4 class="listCharacters__status">${characters.status}</h4>
</article>
</li>`
    return innerlist;
}

// iner characters
function renderCharacters(charactersApi) { // characterApi is a parameter
    listCharacters.innerHTML = '';
    for (const charactersList of charactersApi) {
        listCharacters.innerHTML += renderListCharacters(charactersList);
    }
    addCharFavorites()
}

//fetch

fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
        charactersApi = data; // we need id, img, name and status
        renderCharacters(charactersApi)
    })

// search
function handleClickSearch(event) {
    event.preventDefault();
    const userValue = inputSearch.value;
    fetch(`https://breakingbadapi.com/api/characters?name=${userValue}`)
        .then((response) => response.json())
        .then((data) => {
            userSearch = data;
            renderCharacters(userSearch) //i forgot to set a parameter and it did not work until now
            console.log(userSearch);
        })
}

//function favorites + listener
function addCharFavorites() {
    const markFavorites = document.querySelectorAll('.js_liCard'); //mandatory created inside function because if we create outside appears empty
    for (let i = 0; i < markFavorites.length; i++) {
        markFavorites[i].addEventListener('click', handleClickFavorite);
    }
}


function renderFavoritesChar() {
    favoritesList.innerHTML = '';
    for (const favoriteCharList of favoritesCharacters) {
        favoritesList.innerHTML += renderListCharacters(favoriteCharList)
    }
}


function handleClickFavorite(event) {
    event.currentTarget.classList.toggle('selected');
    console.log(event.currentTarget.id);

    const currentTarget = parseInt(event.currentTarget.id);

    const selectedFavorite = charactersApi.find((eachChar) => eachChar.char_id === currentTarget);

    const charInFavorite = favoritesCharacters.find((eachChar) => eachChar.char_id === currentTarget);
    console.log(charInFavorite);
    if (!charInFavorite) { // same of charInFavorite === undefined -- undefined = not in the list
        favoritesCharacters.push(selectedFavorite);
    }

    console.log(selectedFavorite);

    renderFavoritesChar();

    //only one find -- push  // if same id filter -- concat 

}
//local



btnSearch.addEventListener('click', handleClickSearch);

