import React, { Component } from 'react'
import {
	Text,
	View, 
	StyleSheet, 
	TouchableOpacity, 
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class QuizResult extends Component{

	static navigationOptions = ({navigation}) => {
		const { deck } = navigation.state.params

		return {
			title: deck + ' Quiz Result',
			headerLeft: null,
		}
	}

	componentDidMount() {
		clearLocalNotifications() 
			.then(setLocalNotification())
	}

	restart = () => {
		const { deck, navigation } = this.props

		const reset = NavigationActions.reset({
			index: 2,
			actions: [
				NavigationActions.navigate({routeName: 'Home'}),
				NavigationActions.navigate({routeName: 'Deck', params: { title: deck.title } }),
				NavigationActions.navigate({routeName: 'Quiz', params: { title: deck.title } })
			]
		})
		navigation.dispatch(reset)	
	}

	goToDeck = () => {
		const { deck, navigation } = this.props

		const reset = NavigationActions.reset({
			index: 1,
			actions: [
				NavigationActions.navigate({routeName: 'Home'}),
				NavigationActions.navigate({routeName: 'Deck', params: { title: deck.title } }),
			]
		})

		navigation.dispatch(reset)
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
					onPress={() => this.restart()}
				>
					<Text style={styles.btnText} > Restart Quiz </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.btn, {backgroundColor: gray}]}
					onPress={ () => this.goToDeck()}
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

function mapStateToProps(state, { navigation }) {
	const { score, deck } = navigation.state.params

	return {
		score, 
		deck: state.decks[deck]
	}
}

export default connect(mapStateToProps)(QuizResult)