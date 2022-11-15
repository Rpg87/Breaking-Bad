'use strict';

// querys
const listCharacters = document.querySelector('.js_characters'); //ul
const btnSearch = document.querySelector('.js-btn');
const inputSearch = document.querySelector('.js-input');
const favoritesList = document.querySelector('.js_favoritesList');
const btnDelete = document.querySelector('.js-btnDelete');



// variables for arrays
let charactersApi = [];
let userSearch = [];
let favoritesCharacters = [];