//store/reducers/favoriteReducer.js

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    //console.log("Je veux savoir quand je rentre dans cette super methode !!!!!!! " + initialState.favoritesFilm[0])
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if(favoriteFilmIndex !== -1) {
                // le film est déjà dans les favoris, on le supprime de la liste
                nextState = { ...state, favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex ) }
            } else {
                // le film n'est pas dans les favoris, on l'ajoute dans la liste
                nextState = { ...state, favoritesFilm: [...state.favoritesFilm, action.value] }
            }
            return nextState || state;
    
        default:
            return state;
    }
    //console.log("Sortie de la méthode " + state.favoritesFilm[0])
}


export default toggleFavorite