import React, { Component } from 'react'
import {
	View, 
	Text,
	StyleSheet, 
	TouchableOpacity
} from 'react-native'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'

class Quiz extends Component {

	constructor(state) {
		super(props)
		this.state = { currentQuestion: 0, showAnswer: false }
	}

	componentDidMount() {
		const { deck } = this.props

		getDeck(deck)
			.then( (data) => {
				this.setState( (state) => ({
					deck: data
				}))
			})
	}

	render() {
		const { deck } = this.state

		return (
			<View> 
				<Text> {deck.title} </Text>
			</View>
		)
	}
}

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params

	return {
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)