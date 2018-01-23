import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params

		return {
			title: title,
		}
	}

	render() {
	  	const { title } = this.props
		return (
			<View> 
				<Text> { title } deck </Text>
			</View>
		)
	}
}

export default Deck