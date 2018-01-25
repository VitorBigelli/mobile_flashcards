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
			<View style={styles.container} > 
				<Text style={styles.header}> Quiz Result </Text> 
				<Text style={styles.result} > You hit { (score/deck.questions.length)*100 }% of the { deck.title } quiz. </Text> 
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate(
						'Quiz',
						{title: deck.title}
					)}
				>
					<Text style={styles.btnText} > Try again </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate('Home')}
				>
					<Text style={styles.btnText} > Another quiz </Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 40,
	}, 
	result: {
		fontSize: 20, 
	},
	btn: {
		height: 50, 
		width: 150, 
		borderRadius: 7, 
		padding: 8, 
		alignItems: 'center', 
		justifyContent: 'center'
	}, 
	btnText: {
		fontSize: 20
	}
})

function mapStateToProps(state, {navigation}) {
	const { score, deck } = navigation.state.params

	return {
		score, 
		deck: state.decks[deck]
	}
}

export default connect(mapStateToProps)(QuizResult)