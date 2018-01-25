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
import { red, lightGreen, lightRed, green } from '../utils/colors'


class Quiz extends Component {

	constructor(props) {
		super(props)
		this.state = { score: 0, currentQuestion: 0, showAnswer: false }
	}

	render() {
		const { deck } = this.props
		const { currentQuestion, showAnswer } = this.state
		return (
			<View style={styles.container} > 
				<View style={styles.scoreContainer}> 
					<Text style={styles.score}> { currentQuestion } / {deck.questions.length} </Text>
				</View>
				<View style={styles.questionContainer}>
					<Text style={styles.question} > 
						{ deck && deck.questions[currentQuestion].question }
					</Text>

					<TouchableOpacity  style={styles.answerBtn} > 
						<Text style={styles.answerBtnText} > Answer </Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer} >
					<TouchableOpacity style={[styles.correctBtn, styles.button]} >
						<Text style={styles.correctBtnText} > Correct </Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.incorrectBtn, styles.button]} >
						<Text style={styles.incorrectBtnText} > Incorrect </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
	},
	scoreContainer: {
		alignSelf: 'flex-start',
		height: 40,
		width: 50,
	}, 
	score: {
		fontSize: 18,
	}, 
	questionContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200,
		marginTop: 50,
	}, 
	question: {
		fontSize: 45,
	},
	buttonsContainer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 100,
	},
	button: {
		height: 50, 
		width: 150, 
		borderRadius: 7, 
		padding: 8,
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	correctBtn: {
		backgroundColor: green,
	},
	correctBtnText: {
		fontSize: 15,
		color: lightGreen,
	},
	incorrectBtn: {
		backgroundColor: red,	}, 
	incorrectBtnText: {
		fontSize: 15,
		color: lightRed,
	}, 
	answerBtn: {
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	answerBtnText: {
		fontSize: 15,
		color: red,
	},
})

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params

	return {
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)