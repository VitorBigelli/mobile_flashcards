import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { gray, lightGray, white } from '../utils/colors'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params

		return {
			title: title,
		}
	}

	render() {
	  	const { title, deck } = this.props

		return (
			<View style={styles.container} >
				<View  style={styles.headerContainer} >
					<Text style={styles.header} > { title } </Text>
					<Text style={styles.subHeader} > { deck.questions.length } cards </Text>
				</View>
				<View style={styles.buttonsContainer} >
					<TouchableOpacity 
						style={[styles.btn, {backgroundColor: white }]}
						onPress={ () => this.props.navigation.navigate(
							'AddCard', 
							{'title': 'Add Card', deck: deck })
						}
					> 
						<Text style={{color: gray}}> Add Card </Text>
					</TouchableOpacity> 

					<TouchableOpacity 
						style={[styles.btn, {backgroundColor: gray }]}
						onPress={ () => this.props.navigation.navigate(
							'Quiz',
							{'title': title})}
					> 
						<Text style={{color: white}} > Start Quiz </Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center',
		backgroundColor: white,
	},
	headerContainer: {
		flex: 1, 
		alignItems: 'center', 
		marginTop: 70, 
		marginRight: 20, 
		marginLeft: 20,
		padding: 10,
		justifyContent: 'center',
	},
	buttonsContainer: {
		flex: 1, 
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 50, 
		marginRight: 20, 
		marginLeft: 20, 
		padding: 5, 
	}, 
	btn: {
		borderRadius: 7, 
		borderWidth: 1, 
		borderColor: gray,
		height: 50,
		width: 150, 
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
	}, 
	header: {
		fontSize: 42, 
		color: gray,
	}, 
	subHeader: { 
		fontSize: 20, 
		color: lightGray,
	}
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params

	return {
		title,
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(Deck)