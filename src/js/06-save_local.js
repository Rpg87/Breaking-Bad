'use strict';

//local
const savedFavorites = JSON.parse(localStorage.getItem('storageFavorites'));
console.log(savedFavorites);
if (savedFavorites !== null) { // !== diferent of null, IF is necessary to avoid errors on page startup
    favoritesCharacters = savedFavorites;
    renderFavoritesChar();
};