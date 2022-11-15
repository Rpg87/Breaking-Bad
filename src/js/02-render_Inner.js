'use strict';

// inner li 
function renderListCharacters(characters) {
    let innerlist = `<li  class="listCharacters js_liCard js-removeColor" id="${characters.char_id}">
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
// inner fav
function renderFavoritesChar() {
    let htmlFav = '';
    for (let i = 0; i < favoritesCharacters.length; i++) {
        htmlFav += renderListCharacters(favoritesCharacters[i])
    }
    favoritesList.innerHTML = htmlFav;
}