// navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'

const SearchStackNavigator = createStackNavigator({
    Search: { 
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail : {
        screen: FilmDetail,
        navigationOptions: {
            title: ''
        }
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Favorites : {
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        } 
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search : {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require('../images/ic_search.png')} style={styles.icon} />
            }
        }
    },
    Favorites : {
        screen: FavoriteStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image source={require('../images/ic_favorite.png')} style={styles.icon} />
            }
        }
    }
},
{
    tabBarOptions: {
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
        showLabel: false,
        showIcon: true
    }
}
)

const styles = StyleSheet.create({
  icon: {
      width: 20,
      height: 20
  }  
})

export default createAppContainer(MoviesTabNavigator)