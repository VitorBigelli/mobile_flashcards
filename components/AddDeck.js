import React, { Component } from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { gray, white } from '../utils/colors'

class NewDeck extends Component {

	state = {
		input: '', 
	}

	handleTextChange = (input) => {

		this.setState( () => ({
			input
		}))
	}

	submitDeck() {
		saveDeckTitle(this.state.input)

		this.setState( () => ({
			input: '',
		}))

		this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
	}

	render() {
		const { input } = this.state

		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}> 
				<Text style={styles.header} > What's is the title of your deck? </Text>
				<TextInput 
					style={styles.textInput}
					value={input}
					onChange={this.handleTextChange}
				/>
				<TouchableOpacity onPress={ () => this.submitDeck() } style={styles.submitBtn} >
					<Text style={styles.submitBtnText} > Submit </Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center', 
		backgroundColor: '#fff'
	},
	header: {
		fontSize: 40,
		color: gray,
		textAlign: 'center',
	},
	textInput: {
		width: 300, 
		height: 40,
		padding: 5, 
		borderWidth: 1, 
		borderColor: gray,
		margin: 30,
	},
	submitBtn: {
		backgroundColor: gray, 
		borderRadius: 7,
		height: 50,
		width: 150,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	submitBtnText: {
		color: white,
		fontSize: 20,
	}
})

export default NewDeck