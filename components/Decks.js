import React, { Component } from 'react'
import { initAPI, getDecks, DECKS_STORAGE_KEY } from '../utils/api'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import { white, red, gray } from '../utils/colors'
import Deck from './Deck'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

class Decks extends Component {

  constructor(props) {
    super(props)
    this.state = { decks: {}, }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { decks } = this.state 

    if (decks != {}) {
      initAPI()
        .then( (data) => {
          this.setState( (state) => ({
            decks: data
          }))
        })
        .then( () => dispatch(receiveDecks(this.state.decks)))
    } else {
      getDecks()
        .then( (data) => {
          this.setState( (state) => ({
            decks: data
          })
        )})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.decks != this.state.decks
  }

  render() {
    const { decks } = this.state

    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'stretch'}}>

        { decks &&
            Object.keys(decks).map( (deck) => {

              return (
                  <TouchableOpacity 
                    key={decks[deck].title} 
                    style={styles.deckButton}
                    onPress={ () => this.props.navigation.navigate(
                      'Deck',
                      { title: decks[deck].title }
                      )}
                  >
                    <Text style={styles.deckTitle} > { decks[deck].title } </Text>
                    <Text style={styles.deckQuestions} > 
                      { decks[deck].questions.length } { decks[deck].questions.length === 1 ? 'card' : 'cards' } 
                    </Text>
                  </TouchableOpacity>
              )
            })
          }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deckButton: {
    flex: 1,
    height: 100,
    backgroundColor: white, 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: gray,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
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

export default connect()(Decks)