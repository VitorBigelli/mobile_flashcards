import React, { Component } from 'react'
import {
	View, 
	Text,
	StyleSheet, 
	TouchableOpacity
} from 'react-native'
import { getDeck } from '../utils/api'

class Quiz extends Component {

	state = {
		deck: {},
	}

	componentDidMount() {
		const { deck } = this.props

		getDeck(deck)
			.then( (data) => {
				this.setState( (state) => ({
					deck: data
				}))
			})
	}

	render() {

		const { deck } = this.state

		return (
			<View> 
				<Text> {deck.title} </Text>
			</View>
		)
	}
}

export default Quiz