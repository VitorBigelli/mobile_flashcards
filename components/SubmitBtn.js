import React from 'react'
import {
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
import { gray, white } from '../utils/colors'

export default function SubmitBtn ({handle, backgroundColor = gray, borderColor = gray, color = white, fontSize = 15, text='Submit'}) {
	return (
		<TouchableOpacity onPress={ () => handle() } style={[styles.submitBtn, { borderColor, backgroundColor }]} >
			<Text style={{fontSize, color}} > {text} </Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	submitBtn: {
		borderRadius: 7,
		height: 50,
		width: 200,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		borderRadius: 7,
		borderWidth: 1,
	}
})