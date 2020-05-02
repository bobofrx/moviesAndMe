// components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, Button } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDBApi';
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _toggleFavorite() {
        // définition de l'action
        //console.log("Normalement je dois être appelé entre les deux autres peut-être ?????!!!!!!")
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFilm() {
        const { film } = this.state
        if(film != undefined) {
            return (
                <ScrollView style={styles.scrollView_container}>
                    <Image style={styles.image} source={{uri : getImageFromApi(film.backdrop_path)}}></Image>
                    <Text style={styles.titre}>{film.title}</Text>
                    <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>{this._displayFavoriteImage()}</TouchableOpacity>
                    <Text style={styles.description_text} >{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombres de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){ return genre.name; }).join(" / ")} </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){ return company.name; }).join(" / ")} </Text>
                </ScrollView>
            )
        }
    }

    _displayFavoriteImage() {
        var sourceImage = require('../images/ic_favorite_border.png')
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            // film dans les favoris
            sourceImage = require('../images/ic_favorite.png')
        }
        return (
            <Image style={styles.favorite_image} source={sourceImage} />
        )
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            })
    }

    componentDidUpdate() {
       // console.log("componentdidupdate : ")
        //console.log(this.props.favoritesFilm)
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView_container : {
        flex: 1
    },
    image : {
        height: 169,
        margin: 5
    },
    titre : {
        textAlign: "center",
        alignItems: "center",
        fontWeight: 'bold',
        fontSize: 20
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginTop: 10
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    //console.log("test mapStateToProps ::: " + state.favoritesFilm[0])
    return {
        favoritesFilm: state.favoritesFilm
    }
}
//connect(mapStateToProps)
//const test_export = connect(mapStateToProps)(FilmDetail);
export default connect(mapStateToProps)(FilmDetail)