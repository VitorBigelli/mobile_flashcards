import React, { Component } from 'react'
import { initAPI, getDecks, DECKS_STORAGE_KEY } from '../utils/api'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import { white, red, gray } from '../utils/colors'
import Deck from './Deck'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class Decks extends Component {

  componentDidMount() {
    const { dispatch, decks } = this.props

   // AsyncStorage.removeItem(DECKS_STORAGE_KEY)

    if (!decks) {
      initAPI()
        .then( (data) => dispatch(receiveDecks(data)))
    } else {
      getDecks()
        .then( (data) => dispatch(receiveDecks(data)))
    }
  }

  render() {
    const { decks } = this.props

    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'stretch'}}>

        { decks &&
            Object.keys(decks).sort().map( (deck) => {

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

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Decks)