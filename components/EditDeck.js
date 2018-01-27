import React, { Component } from 'react' 
import {
	Text,
	View, 
	StyleSheet,
	TextInput,
	FlatList,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
	Alert
} from 'react-native'
import SubmitBtn from './SubmitBtn'
import { modifyDeck, deleteCard } from '../utils/api'
import { removeCard, receiveDecks, editDeck } from '../actions'
import { white, gray, red } from '../utils/colors'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'


class EditDeck extends Component {

	constructor(props) {
		const { title } = props.navigation.state.params
		super(props)
		this.state = { deckTitle: title, reRender: false}
	}

	static navigationOptions = ({navigation}) => {
		const { title } = navigation.state.params

		return {
			title
		}
	}

	_keyExtractor = (item, index) => index

	handleTextChange = (input) => {
		this.setState( (state) => ({
			deckTitle: input
		}))
	}

	remove = (deck, question) => {
		const { dispatch, navigation} = this.props

		deleteCard(deck, question)
			.then( () => {
				navigation.navigate('Home')
				dispatch(removeCard(deck, question))
			})
			.then( () => {
				Alert.alert(
					'Done', 
					'The question has been deleted',
					[
						{
							text: 'Ok',
							onPress: () => navigation.navigate('Deck', { title: deck })
						}
					]
				)
			})
	}

	submit() {
		const { deckTitle } = this.state
		const { deck, dispatch, navigation } = this.props

		modifyDeck(deck.title, deckTitle)
			.then( () => {
				editDeck(deck.title, deckTitle)
				navigation.navigate('Home')
			})


		Keyboard.dismiss()
	}

	render() {
		const { deckTitle } = this.state
		const { deck, navigation} = this.props

		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container} > 
				<View style={styles.deckTitle} >
					<TextInput 
						value={deckTitle}
						onChangeText={ (input) => this.handleTextChange(input)}
						style={styles.textInput}
					/>
					<SubmitBtn 
						backgroundColor={gray} 
						borderColor={gray} 
						color={white}
						handle={ () => this.submit()}
						text={'Update title'}
					/>
				</View>
				{ deck && deck.questions[0] &&
					<View style={styles.questions}>
						<Text style={styles.questionsHeader}> Deck questions </Text>
						<ScrollView>
							<FlatList
								keyExtractor={this._keyExtractor}
								style={styles.questionsList}
								data={deck.questions ? deck.questions : []}
								renderItem={ ({item, index}) =>
									<View style={styles.questionsItem}>
										<View style={styles.questionsItemHeader}>
											<Text style={{color: white, alignSelf: 'flex-start'}}> Question {index+1} </Text>
										</View>
										<Text> Q: {item.question} </Text>
										<Text> A: {item.answer} </Text>
										<TouchableOpacity
											onPress={() => this.remove(navigation.state.params.title, index)}
										>
											<MaterialIcons name='delete' size={25} color={red} style={{alignSelf: 'flex-end'}}/>
										</TouchableOpacity>
									</View>
								}
							/>
						</ScrollView>
					</View>
				}
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
		marginBottom: 10,
		marginTop: 20,
		width: 250, 
		height: 40,
		padding: 5, 
		borderWidth: 1, 
		borderColor: gray,
		alignItems: 'center',
		fontSize: 20,
		alignSelf: 'center'
	},
	deckTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	questionsHeader: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 20,
		marginBottom: 10,
	},
	questions: {
		flex: 1,
		alignItems: 'center', 
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		width: 300,
	},
	questionsList: {
		flex: 1,
		width: 250
	},
	questionsItemHeader: {
		backgroundColor: gray,
		height: 30,
		justifyContent: 'center'
	},
	questionsItem: {
		flex: 1,
		borderColor: gray,
		borderWidth: 1,
	}
})

function mapStateToProps(state, {navigation}) {
	const { title } = navigation.state.params

	return {
		deck: state.decks[title]
	}
}

export default connect(mapStateToProps)(EditDeck)