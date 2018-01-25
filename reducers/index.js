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
			let questions = state[action.deck].questions
			questions = questions.push(action.card)
			return {
				...state, 
				...[action.deck],
				['questions']: questions
			}
		default: 
			return state
	}
}

export default decks