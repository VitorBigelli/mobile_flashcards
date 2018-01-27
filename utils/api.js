import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = "MobileFlashcards:decks"

const defaultDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: 'What is a reducer?',
        answer: "Reducers specify how the application's state changes in response to actions sent to the store."
      }
    ]
  }
}

export function initAPI() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
            .then( (result) => {
              if (result) {
                console.log('Getting Decks')
                return getDecks()
              }
              else {
                console.log('Setting default decks')
                setDefaultDecks()
                console.log('Getting Decks')
                return getDecks()
              }
            })

}

function setDefaultDecks() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultDecks))
}

export function getDecks () { 
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then( (data) => {
        return JSON.parse(data)
    })
}

export function getDeck(id) {
	return getDecks().then( (decks) => {
    return decks[id]
  })
}

export function saveDeckTitle(title) {
  
  const deck = {
    title: title,
    questions: []
  }

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck,
  }))

}

export function addCardToDeck(deck) {
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [deck.title]: deck }))
}

export function deleteDeck(deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then( (result) => {
            let data = JSON.parse(result)
            delete data[deck]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          })
}

export function deleteCard(deck, index) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then( (result) => {
            let data = JSON.parse(result)
            delete data[deck]['questions'][index]
            data[deck].questions = data[deck]['questions'].filter( (item) => item != null )
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          })
}

export function modifyDeck(deck, newDeck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then( (result) => {
            let data = JSON.parse(result)
            data[newDeck] = {
              title: newDeck,
              questions: data[deck].questions
            }
            delete data[deck]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          })
}