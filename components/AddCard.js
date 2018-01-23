import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native'
import { gray } from '../utils/colors'
import SubmitBtn from './SubmitBtn'

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
		this.setState( (state) => ({
			question: input
		}))
	}

	handleAnswerChange = (input) => {
		this.setState( (state) => ({
			answer: input
		}))
	}

	submitCard = () => {
		
	}

	render() {
		const { question, answer } = this.state

		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container} > 
				<TextInput
					value={question}
					style={styles.textInput}
					onChange={this.handleQuestionChange}
					placeholder='Question'
				/> 

				<TextInput 
					value={answer}
					style={styles.textInput}
					onChange={this.handleAnswerChange}
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
		justifyContent: 'center',
	},
	textInput: {
		height: 50, 
		width: 200,
		borderColor: gray, 
		borderWidth: 1, 
		marginTop: 20, 
		marginBottom: 20,
	}
})

export default AddCard