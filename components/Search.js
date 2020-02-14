// components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchText = ""
        this.state = { films: [] }
    }

    _loadFilms() {
        if (this.searchText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchText).then(data => {
                this.setState({ films: data.results })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchText = text
    }

    render() {
        console.log("RENDER")
        return (
            //return les éléments grahiques
            <View style={styles.main_container}>
                <TextInput style={styles.textInput} placeholder='Titre du film' onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._loadFilms() } />
                <Button title='Rechercher' onPress={() => this._loadFilms()} />

                <FlatList 
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 25
    },
    textInput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    }
})

export default Search