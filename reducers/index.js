import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

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
		default: 
			return state
	}
}

export default decks