import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

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

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params

	return {
		title,
		deck: state[title]
	}
}

export default connect(mapStateToProps)(Deck)