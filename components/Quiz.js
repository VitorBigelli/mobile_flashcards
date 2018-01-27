import React, { Component } from 'react'
import {
	View, 
	Text,
	StyleSheet, 
	TouchableOpacity,
	Animated
} from 'react-native'
import { getDeck } from '../utils/api'
import { connect } from 'react-redux'
import SubmitBtn from './SubmitBtn'
import QuizResult from './QuizResult'
import Card from './Card'
import { red, lightGreen, lightRed, green, white} from '../utils/colors'

class Quiz extends Component {

	constructor(props) {
		super(props)
		this.state = {
			score: 0, 
			currentQuestion: 0, 
			showAnswer: false ,
		}
	}

	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title: title + ' Quiz', 
		}
	}



	flipCard = () => {
		this.setState( (state) => ({
			showAnswer: !state.showAnswer,
		}))
	}
	changeCard = (result) => {
		const { currentQuestion, score } = this.state
		const { deck, navigation } = this.props 

		switch(result) {
			case 'correct': 
				this.setState( (state) => ({
					showAnswer: false,
					currentQuestion: state.currentQuestion+1,
					score: state.score+1,
				}))
				break
			case 'incorrect': 
				this.setState( (state) => ({
					showAnswer: false,						
					currentQuestion: state.currentQuestion+1,
				}))					
				break
			default:
				return
		}
	}

	render() {
		const { deck, navigation } = this.props
		const { currentQuestion, showAnswer, score } = this.state

		if (currentQuestion === deck.questions.length) {
			return (
				<QuizResult 
					score={score}
					deck={deck.title}
				/>
			)
		} else {
			return (
				<Card 
					currentQuestion={currentQuestion}
					showAnswer={showAnswer}
					deck={deck}
					changeCard={(result) => this.changeCard(result)}
					flipCard={() => this.flipCard()}
				/>
			)
		}

		
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
		height: 250,
		marginTop: 30,
	}, 
	question: {
		fontSize: 42,
		maxHeight: 200,
	},
	answer: {
		fontSize: 25, 
	},
	flipCardBtnContainer: {
		alignItems: 'center',
		justifyContent: 'center', 
		height: 50,
	},
	flipCardBtn: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	flipBtnText: {
		fontSize: 15,
		color: red,
	},
	buttonsContainer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
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
})

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params

	return {
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)