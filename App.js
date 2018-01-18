import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks, 
    navigationOptions: {
      tabBarLabel: 'Decks', 
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck', 
      tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    backgroundColor: "#333",
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs, 
  },
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}} > 
        <MainNavigator />
      </View>
    )
  }
}