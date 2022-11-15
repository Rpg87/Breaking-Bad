'use strict';

fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
        charactersApi = data; // we need id, img, name and status
        renderCharacters(charactersApi)
    })