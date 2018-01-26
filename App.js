import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Platform,
  StatusBar
} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import { white, red } from './utils/colors'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider  } from 'react-redux'
import reducer from './reducers'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import QuizResult from './components/QuizResult'

const store = createStore(reducer)

function FlashcardsStatusBar ({backgroundColor, barStyle, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }} >
      <StatusBar translucent backgroundColor={backgroundColor} barStyle='dark-content' {...props} />
    </View>
  ) 
}


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
    activeTintColor: Platform.OS === 'ios' ? red : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : red, 
    }
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs, 
  },
  Deck: {
    screen: Deck, 
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  },
  AddCard: {
    screen: AddCard, 
    navigationOptions: {
      headerTintColor: white, 
      headerStyle: {
        backgroundColor: red,
      }
    }
  },
  Quiz: {
    screen: Quiz, 
    navigationOptions: {
      headerTintColor: white, 
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      headerTintColor: white, 
      headerStyle: {
        backgroundColor: red,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}} > 
        <FlashcardsStatusBar  backgroundColor={white} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}