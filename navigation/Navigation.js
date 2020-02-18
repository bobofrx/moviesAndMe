// navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
    Search: { 
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail : {
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)