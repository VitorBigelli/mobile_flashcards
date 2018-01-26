import React, { Component } from 'react'
import {
	Text,
	View, 
	StyleSheet, 
	TouchableOpacity, 
} from 'react-native'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'

class QuizResult extends Component{

	static navigationOptions = ({navigation}) => {
		const { deck } = navigation.state.params

		return {
			title: deck + ' Quiz Result', 
			headerLeft: null
		}
	}

	render() {
		const { score, deck, navigation } = this.props

		return (
			<View style={styles.container} > 
				<Text style={styles.header}> Quiz Result </Text> 
				<Text style={styles.preResult} > 
					You hit 
				</Text>
				<Text style={styles.result}>
						{ (score/deck.questions.length)*100 }% 
				</Text>
				<Text style={styles.posResult} > 
					of the { deck.title } quiz. 
				</Text> 
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate(
						'Quiz',
						{title: deck.title}
					)}
				>
					<Text style={styles.btnText} > Restart Quiz </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.btn, {backgroundColor: gray}]}
					onPress={() => navigation.navigate('Deck', { title: deck.title })}
				>
					<Text style={[styles.btnText, { color: white}]} > Back to Deck </Text>
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
	preResult: {
		fontSize: 20, 
		marginTop: 30, 
	},
	posResult: {
		fontSize: 20, 
		marginBottom: 30,
	},
	result: {
		fontSize: 35,
		fontWeight: 'bold',
		margin: 10,
	},
	btn: {
		height: 50, 
		width: 150, 
		borderRadius: 7, 
		padding: 8, 
		alignItems: 'center', 
		justifyContent: 'center',
		borderColor: gray,
		borderRadius: 7, 
		padding: 8, 
		borderWidth: 1,
		marginBottom: 5
	}, 
	btnText: {
		fontSize: 15
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