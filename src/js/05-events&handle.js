'use strict';

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

function handleClickFavorite(event) {
    event.currentTarget.classList.toggle('selected')
    const currentTarget = parseInt(event.currentTarget.id);
    const selectedFavorite = charactersApi.find((eachChar) => eachChar.char_id === currentTarget);
    const removeOrNotFavorites = favoritesCharacters.findIndex((eachChar) => eachChar.char_id === currentTarget); //relacionate with splice

    if (removeOrNotFavorites === -1) { //console.log(removeOrNotFavorites) = 0 -- find = undefined
        favoritesCharacters.push(selectedFavorite);
    } else {
        favoritesCharacters.splice(removeOrNotFavorites, 1);
    }

    localStorage.setItem('storageFavorites', JSON.stringify(favoritesCharacters)); //saves it on the computer

    renderFavoritesChar();
}
//function favorites + listener
function addCharFavorites() {
    const markFavorites = document.querySelectorAll('.js_liCard'); //mandatory created inside function because if we create outside appears empty
    for (let i = 0; i < markFavorites.length; i++) {
        markFavorites[i].addEventListener('click', handleClickFavorite);
    }
}

btnSearch.addEventListener('click', handleClickSearch);
