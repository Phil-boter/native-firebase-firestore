import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import background from "../../assets/background.jpg";

export default function ProfilePic({ navigation, userImage }) {
	console.log("userImage", userImage);
	return userImage ? (
		<View>
			<Image
				source={{ uri: userImage.image }}
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
				}}
			/>
		</View>
	) : (
		<View>
			<Image
				source={{ uri: background }}
				style={{ width: 100, height: 100, borderRadius: 50 }}
			/>
		</View>
	);
}
