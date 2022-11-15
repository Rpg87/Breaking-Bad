'use strict';

// btn delete
function handleDelete(event) {
    event.preventDefault();
    favoritesList.innerHTML = '';
    favoritesCharacters = [];
    localStorage.removeItem('storageFavorites');
    const removeSelected = document.querySelectorAll('.js-removeColor'); //il 
    for (const cardSelected of removeSelected) {
        cardSelected.classList.remove('selected');
    }
}


btnDelete.addEventListener('click', handleDelete);