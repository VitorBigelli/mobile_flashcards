import React, { Component } from 'react'
import { getDecks } from '../utils/api'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  deckButton: {
    flex: 1,
    alignSelf: 'stretch',
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  }, 
  deckTitle: {
    fontSize: 42, 
    color: '#333'
  },
  deckQuestions: {
    fontSize: 20, 
    color: '#666'
  }
})

export default Decks