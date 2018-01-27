export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK'
export const MODIFY_DECK = 'MODIFY_DECK'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		data: {
			decks
		},
	}
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function addCard(deck, card) {
	return {
		type: ADD_CARD_TO_DECK,
		deck,
		card
	}
}

export function removeDeck(deck) {
	return {
		type: REMOVE_DECK,
		deck
	}
}

export function removeCard(deck, card) {
	return {
		type: REMOVE_CARD_FROM_DECK,
		deck,
		card
	}
}

export function editDeck(prevDeck, newDeck) {
	return {
		type: MODIFY_DECK,
		prevDeck: prevDeck,
		newDeck: newDeck
	}
}