import { 
	RECEIVE_DECKS, 
	ADD_DECK, 
	ADD_CARD_TO_DECK, 
	REMOVE_DECK,
	MODIFY_DECK,
	REMOVE_CARD_FROM_DECK 
} from '../actions'

function decks (state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS: 
			return {
				...state, 
				...action.data
			}
		case ADD_DECK: 
			return {
				...state, 
				[action.deck.title]: action.deck
			}
		case ADD_CARD_TO_DECK: 
			return {
				...state,
				...state.decks, 
				[action.deck]: action.card
			}
		case REMOVE_DECK: 
			let decks = state.decks
			delete decks[action.deck]

			return {
				...state, 
				...decks
			}
		case MODIFY_DECK: 
			const { prevDeck, newDeck } = action
			let updatedDeck = {
				title: newDeck,
				questions: state.decks[prevDeck]
			}

			delete state.decks[prevDeck]

			return {
				...state, 
				...state.decks,
				[newDeck]: updatedDeck
			}

		case REMOVE_CARD_FROM_DECK:
			console.log(state.decks)
			console.log(action.deck)
			let questions = state.decks[action.deck]['questions']
			delete questions[action.card]
			
			return {
				...state, 
				...state.decks, 
				...state.decks[action.deck],
				['questions']: questions
			}
		default:
			return state
	}
}

export default decks