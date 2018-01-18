import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { getDecks } from './utils/api'

export default class App extends React.Component {

  state = {
    decks: {},
  }

  componentDidMount() {
    getDecks()
      .then( (data) => {
        this.setState( (state) => ({
          decks: data
        }))
      })
  }

  render() {
    const { decks } = this.state

    return (
      <View style={styles.container}>
        { Object.keys(decks).map( (deck) => {
              return (
                <View key={decks[deck].title} >
                  <Text> { decks[deck].title } </Text>
                  <Text> { decks[deck].questions.length } questions </Text>
                </View>
              )
            })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})