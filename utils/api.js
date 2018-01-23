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
                return getDecks()
              }
              else {
                setDefaultDecks()
                return getDecks()
              }
            })

}

function setDefaultDecks() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultDecks))
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

  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[title]:deck}))
}

export function addCardToDeck({ title, card }) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then( (results) => {
			const { data } = JSON.parse(results)
			data[title] = data[title].questions.push(card)
			AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
		})
}