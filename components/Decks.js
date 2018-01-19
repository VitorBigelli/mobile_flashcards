import React, { Component } from 'react'
import { getDecks } from '../utils/api'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { white, red, gray } from '../utils/colors'

class Decks extends Component {

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
                <TouchableOpacity 
                  key={decks[deck].title} 
                  style={styles.deckButton}
                >
                  <Text style={styles.deckTitle} > { decks[deck].title } </Text>
                  <Text style={styles.deckQuestions} > 
                    { decks[deck].questions.length } { decks[deck].questions.length === 1 ? 'question' : 'questions' } 
                  </Text>
                </TouchableOpacity>
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
    backgroundColor: white,
    alignItems: 'stretch',
  },
  deckButton: {
    flex: 1,
    height: 30,
    backgroundColor: white, 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: gray,
    borderBottomWidth: 1,
  }, 
  deckTitle: {
    fontSize: 42, 
    color: gray,
  },
  deckQuestions: {
    fontSize: 20, 
    color: gray
  }
})

export default Decks