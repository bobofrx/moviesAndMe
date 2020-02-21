// components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../api/TMDBApi';

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

    _displayFilm() {
        const { film } = this.state
        if(film != undefined) {
            return (
                <ScrollView style={styles.scrollView_container}>
                    <Image style={styles.image} source={{uri : getImageFromApi(film.backdrop_path)}}></Image>
                    <Text style={styles.titre}>{film.title}</Text>
                    <Text style={styles.description_text} >{film.overview}</Text>
                    <Text>Sorti le </Text>
                    <Text>Note :</Text>
                    <Text>Nombres de votes : </Text>
                    <Text>Budget : </Text>
                    <Text>Genre(s) : </Text>
                    <Text>Companie(s) : </Text>
                </ScrollView>
            )
        }
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
})

export default FilmDetail