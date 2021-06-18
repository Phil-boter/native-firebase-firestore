import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	Button,
	TouchableOpacity,
} from "react-native";
import background from "../../assets/background.jpg";

export default function ProfilePic({ navigation }) {
	console.log("navigation", navigation);
	const userImage = useSelector((state) => {
		return state.userState.userPic;
	});

	return userImage ? (
		<TouchableOpacity
			title="Edit Profile"
			onPress={() => navigation.navigate("ProfileEditor")}
		>
			<Image
				source={{ uri: userImage.userPic }}
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
				}}
			/>
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			title="Edit Profile"
			onPress={() => navigation.navigate("ProfileEditor")}
		>
			<Image
				source={{ uri: "../../assets/background.jpg" }}
				style={{ width: 100, height: 100, borderRadius: 50 }}
			/>
		</TouchableOpacity>
	);
}
