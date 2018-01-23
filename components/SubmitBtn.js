import React from 'react'
import {
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
import { gray, white } from '../utils/colors'

export default function SubmitBtn (handle) {
	return (
		<TouchableOpacity onPress={ () => handle() } style={styles.submitBtn} >
			<Text style={styles.submitBtnText} > Submit </Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	submitBtn: {
		backgroundColor: gray, 
		borderRadius: 7,
		height: 50,
		width: 150,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	submitBtnText: {
		color: white,
		fontSize: 20,
	}
})