import React, { Component } from 'react'
import { initAPI, DECKS_STORAGE_KEY } from '../utils/api'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native'
import { white, red, gray } from '../utils/colors'
import Deck from './Deck'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

class Decks extends Component {

  state = {
    decks: {},
  }

  componentDidMount() {

    const { dispatch } = this.props

    AsyncStorage.removeItem(DECKS_STORAGE_KEY)

    initAPI()
      .then( (decks) => dispatch(receiveDecks(decks)))
      .then( (data) => {
        this.setState( (state) => ({
          decks: data
        }))
      })
  }

  render() {
    const { decks } = this.props

    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'stretch'}}>

        { Object.keys(decks).map( (deck) => {
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
                      { decks[deck].questions.length } { decks[deck].questions.length === 1 ? 'question' : 'questions' } 
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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)