import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK, REMOVE_DECK } from '../actions'

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
		default:
			return state
	}
}

export default decks