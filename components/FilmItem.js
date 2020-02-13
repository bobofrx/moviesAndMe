// components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class FilmItem extends React.Component{
  render() {
    return (
      <View style={styles.main_container}>
        <Image style={styles.image_style} />
        <Text style={styles.title_text}>
            Titre du film
        </Text>
        <Text >Vote</Text>
        <Text >Description</Text>
        <Text >Date de sortie</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red'
    } ,
    title_text: {
        flex: 1
    } ,
    image_style: {
        flex: 3,
        height: 30
    }

})

export default FilmItem