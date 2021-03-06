// components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi'
import { TouchableOpacity } from 'react-native-gesture-handler';


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText  = ""
        this.page = 0
        this.totalPages = 0
        this.state = { films: [], isloading: false, isFocused: false }
        this._loadFilms = this._loadFilms.bind(this)
    }

    handleFocus = event => {
        this.setState({ isFocused: true })
        if(this.props.onFocus){
            this.props.onFocus(event)
        }
    }

    handleBlur = event => {
        this.setState({ isFocused: false })
        if(this.props.onBlur){
            this.props.onBlur(event)
        }
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isloading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
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
        this.searchedText = text
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
        this.page = 0
        this.totalPages = 0
        this.setState({ 
            films: [] 
        }, () => {
                //console.log("page : "+this.page+" / totalpages : "+this.totalPages+" / Nombre de films : "+this.state.films.length)
                this._loadFilms()
             
        })
    }

    render() {
        //console.log(this.props)
        const { isFocused } = this.state
        return (
            //return les éléments grahiques
            <View style={styles.main_container}>
                <TextInput style={styles.textInput} placeholder='Titre du film' underlineColorAndroid={isFocused ? '#00BFFF' : '#D3D3D3'} onFocus={this.handleFocus} onBlur={this.handleBlur} onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._searchFilms() } />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._searchFilms() }
                >
                    <Text style={styles.couleurbutton}>Rechercher</Text>
                </TouchableOpacity>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
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
        height: 40, 
        paddingLeft: 6
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      button: {
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 10
      },
      couleurbutton: {
        color: "#00BFFF"
      }
})

export default Search