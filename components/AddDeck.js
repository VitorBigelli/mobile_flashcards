import React, { Component } from 'react'
import { FormLabel, FormInput } from 'react-native-elements'
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
import { saveDeckTitle } from '../utils/api'
import { gray, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import SubmitBtn from './SubmitBtn'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class AddDeck extends Component {

	constructor(props) {
		super(props)
		this.state = { input: '',}
	}

	submitDeck = () => {
		const { input } = this.state
		const { dispatch, navigation } = this.props
 
		if (input) {
			const deck = {
				title: input, 
				questions: []
			}

			saveDeckTitle(input)
				.then( () => dispatch(addDeck(deck)))
				.then( () => {
					this.setState( () => ({
						input: '',
					}))
					const reset = NavigationActions.reset({
						index: 1,
						actions: [
							NavigationActions.navigate({routeName: 'Home'}),
							NavigationActions.navigate({routeName: 'Deck', params: { title: deck.title} })
						]
					})
					navigation.dispatch(reset)
				})
		}
		else {
			Alert.alert(
				'Required field',
				'You need to fill all the fields in order to submit a new card', 
				[
					{text: 'Ok'}
				]
			)
		}

		Keyboard.dismiss()
	}

	render() {
		const { input } = this.state

		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}> 
				<Text style={styles.header} > What is the title of your deck? </Text>
				<TextInput 
					style={styles.textInput}
					value={this.state.input}
					onChangeText={ (input) => this.setState({input})}
				/>
				<SubmitBtn 
					handle={this.submitDeck}
					backgroundColor={gray}
					color={white} 
					fontSize={20}
				/>
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
		marginBottom: 20,
		marginTop: 20,
		width: 300, 
		height: 40,
		padding: 5, 
		borderWidth: 1, 
		borderColor: gray,
	},
})

export default connect()(AddDeck)