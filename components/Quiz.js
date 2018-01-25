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
import { red, lightGreen, lightRed, green, white} from '../utils/colors'


class Quiz extends Component {

	constructor(props) {
		super(props)
		this.state = { score: 0, currentQuestion: 0, showAnswer: false }
	}

	flipCard = () => {
		this.setState( (state) => ({
			showAnswer: !state.showAnswer,
		}))
	}
	changeCard = () => {
		const { currentQuestion } = this.state
		const { deck } = this.props 

		if ( (currentQuestion+1) === deck.length) {
			navigation.navigate( QuizResult, { title: 'Result', result: { score, deck }})
		} else {
			this.setState( (state) => ({
				currentQuestion: state.currentQuestion+1,
			}))
		}
	}
	incrementScore = () => {
		this.setState( (state) => ({
			score: state.score+1,
		}))
		this.changeCard()
	}
	decrementScore = () => {
		this.setState( (state) => ({
			score: state.score-1,
		}))
		this.changeCard()

	}
	render() {
		const { deck } = this.props
		const { currentQuestion, showAnswer } = this.state

		return (
			<View style={styles.container} > 
				<View style={styles.scoreContainer}> 
					<Text style={styles.score}> { currentQuestion+1 } / {deck.questions.length} </Text>
				</View>

				{ !showAnswer && 
				<View style={styles.questionContainer}>
					<Text style={styles.question} adjustFontSizeToFit={true}> 
						{ deck && deck.questions[currentQuestion].question }
					</Text>

					<TouchableOpacity  
						style={styles.flipCardBtn} 
						onPress={ () => this.flipCard() }
					>
						<Text style={styles.flipBtnText} > Answer </Text>
					</TouchableOpacity>
				</View>
				}

				{ showAnswer && 
				<View style={styles.questionContainer}>
					<Text style={styles.answer} adjustFontSizeToFit={true}> 
						{ deck && deck.questions[currentQuestion].answer }
					</Text>
					<View style={styles.flipCardBtnContainer} >
						<TouchableOpacity  
							style={styles.flipCardBtn} 
							onPress={ () => this.flipCard() }
						>
							<Text style={styles.flipBtnText} > Question </Text>
						</TouchableOpacity>
					</View>
				</View>
				}


				<View style={styles.buttonsContainer} >
					<TouchableOpacity 
						style={[styles.correctBtn, styles.button]} 
						onPress={ () => this.incrementScore()}
					>
						<Text style={styles.correctBtnText} > Correct </Text>
					</TouchableOpacity>

					<TouchableOpacity 
						style={[styles.incorrectBtn, styles.button]}
						onPress={ () => this.decrementScore()}
					>
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
		height: 250,
		marginTop: 30,
	}, 
	question: {
		fontSize: 42,
		maxHeight: 200,
		backgroundColor: white,
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