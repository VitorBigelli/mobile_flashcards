import React, { Component } from 'react'
import {
	View, 
	Text,
	StyleSheet, 
	TouchableOpacity
} from 'react-native'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'
import SubmitBtn from './SubmitBtn'

class Quiz extends Component {

	constructor(props) {
		super(props)
		this.state = { score: 0, currentQuestion: 0, showAnswer: false }
	}

	render() {
		const { deck } = this.props
		const { currentQuestion, showAnswer } = this.state
		return (
			<View> 
				<View> 
					<Text> { currentQuestion } / {deck.questions.length} </Text>
				</View>
				<Text> 
					{ deck && deck.questions[currentQuestion].question }
				</Text>

				<TouchableOpacity> 
					<Text> Answer </Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text> Correct </Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text> Incorrect </Text>
				</TouchableOpacity>
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