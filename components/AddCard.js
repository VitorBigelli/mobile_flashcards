import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Keyboard,
	Alert
} from 'react-native'
import { gray } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import { addCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { addCard } from '../actions'

class AddCard extends Component {

	constructor(props) {
		super(props)
		this.state = { question: '', answer: ''}
	}

	static navigationOptions ({navigation}) {
		const { title } = navigation.state.params

		return {
			title
		}
	}

	handleQuestionChange = (input) => {
		this.setState( () => ({
			question: input
		}))
	}

	handleAnswerChange = (input) => {
		this.setState( (state) => ({
			answer: input
		}))
	}

	submitCard = () => {
		const { question, answer } = this.state
		const { deck, dispatch } = this.props

		const card = {
			question,
			answer,
		}

		deck.questions.push(card)

		if (question && answer) {
			addCardToDeck( deck )
				.then( (data) => dispatch(addCard(deck.title, card)))
				.then( () => {
					this.setState( () => ({
						question: '', 
						answer: '',
					}))
				})
				.then( () => {
					Alert.alert(
						'Done',
						'Card added to ' + deck.title,
						[
							{ 
								text: 'Add another card', 
								onPress: () => this.render()
							}, 
							{
								text: 'Ok', 
								onPress: () => this.props.navigation.navigate('Home')
							}
						]
					)
				})
		}

		else {
			Alert.alert(
				'Required field',
				'You need to fill all the fields in order to submit a new card', 
				[
					{text: 'Ok', onPress: () => this.render() }
				]
			)
		}

		Keyboard.dismiss()
	}

	render() {
		const { question, answer } = this.state

		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container} > 
				<TextInput
					value={question}
					style={[styles.textInput, {marginTop: 50}]}
					onChangeText={ (text) => this.handleQuestionChange(text)}
					placeholder='Question'
				/> 

				<TextInput 
					value={answer}
					style={styles.textInput}
					onChangeText={ (text) => this.handleAnswerChange(text)}
					placeholder='Answer'
				/>
				<SubmitBtn handle={this.submitCard} />
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	textInput: {
		height: 50, 
		borderColor: gray, 
		borderWidth: 1, 
		marginBottom: 5, 
		marginRight: 20, 
		marginLeft: 20,
		width: 250,

	}
})

function mapStateToProps(state, { navigation })  {
	const { deck } = navigation.state.params

	return {
		deck: deck,
	}
}

export default connect(mapStateToProps)(AddCard)