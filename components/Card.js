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
import SubmitBtn from './SubmitBtn'

class Card extends Component{

	constructor(props) {
		super(props)
		this.state = { opacity: new Animated.Value(0) }
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
			<Animated.View style={[styles.container, { opacity }]} ref={ci => this.animatedTextRef = ci} > 
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
						<TouchableOpacity  
							style={styles.flipCardBtn} 
							onPress={ () => flipCard() }
						>
							<Text style={styles.flipBtnText} > Question </Text>
						</TouchableOpacity>


					</View>
					<View style={styles.buttonsContainer} >
						<SubmitBtn 
							text={'Correct'}
							borderColor={green}
							backgroundColor={green}
							color={lightGreen}
							handle={() => changeCard('correct')}
						/>
						<SubmitBtn 
							text={'Incorrect'}
							borderColor={red}
							backgroundColor={red}
							color={lightRed}
							handle={() => changeCard('incorrect')}
						/>
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
		marginRight: 10,
		marginLeft: 10,
	}, 
	question: {
		fontSize: 42,
		maxHeight: 200,
	},
	answer: {
		fontSize: 25, 
	},
	flipCardBtn: {
		height: 50,
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
	}
})

export default Card