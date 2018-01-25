import React, { Component } from 'react'
import {
	Text,
	View, 
	StyleSheet, 
	TouchableOpacity, 
} from 'react-native'
import { connect } from 'react-redux'

class QuizResult extends Component{
	render() {
		const { score, deck, navigation } = this.props

		return (
			<View > 
				<Text> Quiz Result </Text> 
				<Text> You hit { (score/deck.questions.length)*100 }% of the { deck.title } quiz. </Text> 
				<TouchableOpacity
					onmPress={() => navigation.navigate('Home')}
				>
					<Text> Go back to Decks page </Text>
				</TouchableOpacity>
			</View>
		)
	}
}

function mapStateToProps(state, {navigation}) {
	const { score, deck } = navigation.state.params

	return {
		score, 
		deck: state.decks[deck]
	}
}

export default connect(mapStateToProps)(QuizResult)