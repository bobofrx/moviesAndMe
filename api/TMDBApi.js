

// api/TMDBApi.js

const API_TOKEN = "d6e502a6ee6e46e0f3e1eb4decbde1a6";

export function getFilmsFromApiWithSearchedText (text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}