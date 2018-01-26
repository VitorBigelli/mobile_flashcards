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

class NewDeck extends Component {

	constructor(props) {
		super(props)
		this.state = { input: '',}
	}

	submitDeck = () => {
		const { input } = this.state

		if (input) {
			saveDeckTitle(input)
				.then( () => {
					this.setState( () => ({
						input: '',
					}))
					this.props.navigation.navigate('Home')
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

			this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
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
				<SubmitBtn handle={this.submitDeck} />
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
		marginTop: 10,
		width: 300, 
		height: 40,
		padding: 5, 
		borderWidth: 1, 
		borderColor: gray,
	},
})

export default connect()(NewDeck)