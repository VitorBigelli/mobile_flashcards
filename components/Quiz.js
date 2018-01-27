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
import Card from './Card'
import { red, lightGreen, lightRed, green, white} from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

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

	componentDidMount() {
		clearLocalNotifications() 
			.then(setLocalNotification())
	}

	flipCard = () => {
		this.setState( (state) => ({
			showAnswer: !state.showAnswer,
		}))
	}
	changeCard = (result) => {
		const { currentQuestion, score } = this.state
		const { deck, navigation } = this.props 

		if ( currentQuestion === (deck.questions.length-1)) {
			switch(result) {
				case 'correct': 
					navigation.navigate( 'QuizResult', { title: 'Result', score: score+1, deck: deck.title } )
					break
				case 'incorrect': 
					navigation.navigate( 'QuizResult', { title: 'Result', score: score, deck: deck.title } )
					break
				default:
					return
			}
		} else {
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
						showAnswer: false,						currentQuestion: state.currentQuestion+1,
					}))					
					break
				default:
					return
			}
		}
	}

	render() {
		const { deck } = this.props
		const { currentQuestion, showAnswer } = this.state

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