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

		if (currentQuestion !== deck.questions.length) {
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
		return (
			<View style={styles.container}>
				<SubmitBtn 
					text={'See result'}
					handle={ () => navigation.navigate('QuizResult', { title: 'Result', score, deck: deck.title })}
				/>
			</View>
		)
		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params

	return {
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(Quiz)