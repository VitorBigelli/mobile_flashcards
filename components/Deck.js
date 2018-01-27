import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Alert
} from 'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'
import { gray, lightGray, white, red } from '../utils/colors'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import SubmitBtn from './SubmitBtn'

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params

		return {
			title: title,
		}
	}

	edit = (deck) => {
		const { navigation } = this.props

		navigation.navigate( 'EditDeck', { title: deck })
	}

	deleteDeck = (deck) => {
		const { navigation, dispatch } = this.props

		Alert.alert(
			'Delete deck',
			'Sure you want delete the ' + deck + ' deck', 
			[
				{
					text: 'Cancel', 
					onPress: () => this.render()
				},
				{
					text: 'Confirm', 
					onPress: () => {
						deleteDeck(deck)
							.then( () => { 
								dispatch(removeDeck(deck))
								navigation.navigate('Home')
							})
					}
				}
			]
		)
	}

	render() {
	  	const { title, deck, navigation } = this.props
	  	console.log(deck)
	  	console.log(navigation.state.params.title)
		return (
			<View style={styles.container}>
			{ deck && 
				<View style={styles.container}>
					<View style={styles.options}>
						<TouchableOpacity
							onPress={() => this.edit(deck.title)}
						>
							<MaterialIcons name='edit' size={30} color={gray} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.deleteDeck(deck.title)}
						>
							<MaterialIcons name='delete' size={30} color={red} />
						</TouchableOpacity>
					</View>
					<View  style={styles.headerContainer} >
						<Text style={styles.header} > { title } </Text>
						<Text style={styles.subHeader} > { deck.questions.length } cards </Text>
					</View>
					<View style={styles.buttonsContainer} >

						<SubmitBtn 
							backgroundColor={white}
							color={gray}
							handle={ () => navigation.navigate(
								'AddCard', 
								{'title': 'Add Card', deck: deck })
							}
							text={'Create New Question'}
						/> 

						{ (deck.questions.length != 0) && 
							<SubmitBtn 
								backgroundColor={gray}
								color={white}
								handle={ () => navigation.navigate(
									'Quiz',
									{'title': title})
								}
								text={'Start Quiz'}
							/>
						}
					</View>
				</View>
			}
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
	options: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
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
	header: {
		fontSize: 42, 
		color: gray,
	}, 
	subHeader: { 
		fontSize: 20, 
		color: lightGray,
	}, 
	back: {
		flexDirection: 'row',
		marginLeft: 10,
		height: 30,
		alignItems: 'center', 
		justifyContent: 'center'
	},
	backText: {
		color: white, 
		fontSize: 16
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