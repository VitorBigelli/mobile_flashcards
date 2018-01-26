import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Animated
} from 'react-native'
import { connect } from 'react-redux'
import { red, lightGreen, lightRed, green } from '../utils/colors'

class Card extends Component{

	constructor(props) {
		super(props)
		this.state = { opacity: this.props.opacity }
	}

	componentDidMount() {
		const { opacity } = this.state

		Animated.timing(opacity, { toValue: 1, duration:1000})
				.start()
	}

	render() {
		const { currentQuestion, deck, showAnswer, changeCard, flipCard } = this.props	
		const { opacity } = this.state

		return (
			<Animated.View style={[styles.container, { opacity }]} > 
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
						onPress={ () => flipCard() }
					>
						<Text style={styles.flipBtnText} > Answer </Text>
					</TouchableOpacity>
				</View>
				}

				{ showAnswer &&
				<View>
					<View style={styles.questionContainer}>
						<Text style={styles.answer} adjustFontSizeToFit={true}> 
							{ deck && deck.questions[currentQuestion].answer }
						</Text>
						<View style={styles.flipCardBtnContainer} >
							<TouchableOpacity  
								style={styles.flipCardBtn} 
								onPress={ () => flipCard() }
							>
								<Text style={styles.flipBtnText} > Question </Text>
							</TouchableOpacity>
						</View>

					</View>
					<View style={styles.buttonsContainer} >
						<TouchableOpacity 
							style={[styles.correctBtn, styles.button]} 
							onPress={ () => changeCard('correct')}
						>
							<Text style={styles.correctBtnText} > Correct </Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={[styles.incorrectBtn, styles.button]}
							onPress={ () => changeCard('incorrect')}
						>
							<Text style={styles.incorrectBtnText} > Incorrect </Text>
						</TouchableOpacity>
					</View>
				</View>
				}				
			</Animated.View>
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

export default Card