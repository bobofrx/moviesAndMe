// components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi'
import {connect} from 'react-redux'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchText = ""
        this.page = 0
        this.totalPages = 0
        this.state = { films: [], isloading: false }
    }

    _loadFilms() {
        if (this.searchText.length > 0) {
            this.setState({ isloading: true })
            getFilmsFromApiWithSearchedText(this.searchText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],
                    isloading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchText = text
    }

    _displayLoading() {
        if(this.state.isloading){
            return (
                <View style={styles.loading_container} >
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchFilms() {
        this.page=0
        this.totalPages=0
        this.setState({ 
            films: [] 
        }, () => {
                //console.log("page : "+this.page+" / totalpages : "+this.totalPages+" / Nombre de films : "+this.state.films.length)
                this._loadFilms()
             
        })
    }

    _displayDetailForFilm = (idFilm) => {
        //console.log("Display film with id : "+idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        //console.log(this.props)
        return (
            //return les éléments grahiques
            <View style={styles.main_container}>
                <TextInput style={styles.textInput} placeholder='Titre du film' onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._searchFilms() } />
                <Button title='Rechercher' onPress={() => this._searchFilms() } />

                <FlatList 
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textInput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)