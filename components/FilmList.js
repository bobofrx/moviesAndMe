// components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film " + idFilm)
        this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
    }
// ATTENTION ==> extradata={this.props.favoritesFilm} pour la gestion des favoris
    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <FilmItem
                        film={item}
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                    />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) {
                        // On appelle la méthode loadFilm du component Search pour charger plus de films
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}
//test test
const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)