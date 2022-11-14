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
<article class= "article">
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
    let htmlFav = '';
    for (let i = 0; i < favoritesCharacters.length; i++) {
        htmlFav += renderListCharacters(favoritesCharacters[i])
    }
    favoritesList.innerHTML = htmlFav;

}
/*function renderFavoritesChar() {
    favoritesList.innerHTML = '';
    for (const favoriteCharList of favoritesCharacters) {
        favoritesList.innerHTML += renderListCharacters(favoriteCharList)
        // si quiero que se pinte en favoritos debo trabajar desde aquí
    }
}*/


function handleClickFavorite(event) {
    event.currentTarget.classList.toggle('selected');

    const currentTarget = parseInt(event.currentTarget.id);

    const selectedFavorite = charactersApi.find((eachChar) => eachChar.char_id === currentTarget);

    const removeOrNotFavorites = favoritesCharacters.findIndex((eachChar) => eachChar.char_id === currentTarget);

    if (removeOrNotFavorites === -1) { //console.log(removeOrNotFavorites) = 0
        favoritesCharacters.push(selectedFavorite);
    } else {
        favoritesCharacters.splice(removeOrNotFavorites, 1);
    }
    /*const charInFavorite = favoritesCharacters.find((eachChar) => eachChar.char_id === currentTarget);

    //only one find -- push  // if same id filter -- concat 


    if (!charInFavorite) { // same of charInFavorite === undefined -- undefined = not in the list
        favoritesCharacters.push(selectedFavorite);

    }*/
    localStorage.setItem('storageFavorites', JSON.stringify(favoritesCharacters)); //saves it on the computer


    renderFavoritesChar();



}
//local
const savedFavorites = JSON.parse(localStorage.getItem('storageFavorites'));
console.log(savedFavorites);
if (savedFavorites !== null) { // !== diferent of null, IF is necessary to avoid errors on page startup
    favoritesCharacters = savedFavorites;
    renderFavoritesChar();
};



btnSearch.addEventListener('click', handleClickSearch);

