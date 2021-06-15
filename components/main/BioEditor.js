import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	Button,
	TextInput,
} from "react-native";

import { uploadBio } from "../../redux/actions";

import firebase from "firebase/app";
require("firebase/firestore");

export default function BioEditor({ navigation, userBio }) {
	const dispatch = useDispatch();

	const [bio, setBio] = useState("");
	const [textareaVisible, setTextInputVisible] = useState(false);

	if (textareaVisible === false) {
		if (bio || userBio) {
			return (
				<View>
					<Text>About me</Text>
					{userBio ? (
						userBio.map((item, idx) => (
							<Text key={idx}>{item.bio}</Text>
						))
					) : (
						<Text>{bio}</Text>
					)}
					<Button
						title="Edit"
						onPress={() => setTextInputVisible(true)}
					/>
				</View>
			);
		} else if (!bio) {
			return (
				<View>
					<Text>Tell us something about yourself</Text>
					<Button
						title=" Add your bio now"
						onPress={() => setTextInputVisible(true)}
					/>
				</View>
			);
		}
	} else {
		return (
			<View>
				<TextInput
					onChangeText={(text) => setBio(text)}
					value={bio}
					placeholder="write something here"
				/>
				<Button
					title="Upload"
					onPress={() => dispatch(uploadBio(bio))}
				/>
			</View>
		);
	}

	// return !user ? (
	// 	<View>
	// 		<Text>loading</Text>
	// 	</View>
	// ) : (
	// 	<View>
	// 		<Text>{user.firstName}</Text>
	// 		<Text>{user.lastName}</Text>
	// 		<Text>{user.email}</Text>
	// 		<Button title="Logout" onPress={() => onLogout()} />
	// 	</View>
	// );
	// <View style={styles.container}>
	// 	<View style={styles.containerInfo}>
	// 		{/* <Text>{user.name}</Text>
	// 		<Text>{user.email}</Text> */}

	// 		{props.route.params.uid !== firebase.auth().currentUser.uid ? (
	// 			<View>
	// 				{following ? (
	// 					<Button
	// 						title="Following"
	// 						onPress={() => onUnfollow()}
	// 					/>
	// 				) : (
	// 					<Button title="Follow" onPress={() => onFollow()} />
	// 				)}
	// 			</View>
	// 		) : (
	// 			<Button title="Logout" onPress={() => onLogout()} />
	// 		)}
	// 	</View>

	// 	<View style={styles.containerGallery}>
	// 		<FlatList
	// 			numColumns={3}
	// 			horizontal={false}
	// 			data={props.posts}
	// 			renderItem={({ item }) => (
	// 				<View style={styles.containerImage}>
	// 					<Image
	// 						style={styles.image}
	// 						source={{ uri: item.downloadURL }}
	// 					/>
	// 				</View>
	// 			)}
	// 		/>
	// 	</View>
	// </View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerInfo: {
		margin: 20,
	},
	containerGallery: {
		flex: 1,
	},
	containerImage: {
		flex: 1 / 3,
	},
	image: {
		flex: 1,
		aspectRatio: 1 / 1,
	},
});
