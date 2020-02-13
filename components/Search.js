// components/Search.js
import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import films from '../helpers/FilmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {
    render() {
        return (
            //return les éléments grahiques
            <View style={styles.main_container}>
                <TextInput style={styles.textInput} placeholder='Titre du film' />
                <Button title='Rechercher' onPress={() => {}} />

                <FlatList 
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem/>}
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