import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import "firebase/auth";
import { loggingOut } from "../API/firebaseMethods";

export default function GalleryScreen({ navigation }) {
	const handlePress = () => {
		loggingOut();
		navigation.navigate("Home", { screen: "WelcomeScreen" });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Gallery</Text>

			<TouchableOpacity style={styles.button} onPress={handlePress}>
				<Text style={styles.buttonText}>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		width: 150,
		padding: 5,
		backgroundColor: "#ff9999",
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 15,
		alignSelf: "center",
	},
	buttonText: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: "#3FC5AB",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 20,
		fontStyle: "italic",
		marginTop: "2%",
		marginBottom: "10%",
		fontWeight: "bold",
		color: "black",
	},
	titleText: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
		color: "#2E6194",
	},
});
