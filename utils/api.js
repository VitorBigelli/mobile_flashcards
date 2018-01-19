import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = "MobileFlashcards:decks"

const decks = {
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
    title: 'Reduxx',
    questions: [
      {
        question: 'What is a reducer?',
        answer: "Reducers specify how the application's state changes in response to actions sent to the store."
      }
    ]
  }
}

export function getDecks () { 

	AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))

	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then( (data) => {
			return JSON.parse(data)
		})
}

export function getDeck(id) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then( (data) => {
			return data[id]
		})
}

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem( DECKS_STORAGE_KEY, JSON.stringify({
				[title]: { title: title, questions: [] }
			}
			))
}

export function addCardToDeck({ title, card }) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then( (results) => {
			const { data } = JSON.parse(results)
			data[title] = data[title].questions.push(card)
			AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
		})
}