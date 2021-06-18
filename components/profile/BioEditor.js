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
	Alert,
} from "react-native";

import ProfilePic from "./ProfilePic";

import {
	fetchUser,
	fetchUserBio,
	fetchUserPic,
	uploadBio,
} from "../../redux/actions";

import firebase from "firebase/app";
require("firebase/firestore");

export default function BioEditor({ navigation }) {
	// console.log("userbio", userBio);
	const dispatch = useDispatch();

	const [bio, setBio] = useState("");
	const [textareaVisible, setTextInputVisible] = useState(false);

	const handleUpload = (bio) => {
		console.log("BIO", bio);
		// dispatch(uploadBio(bio));
		bioUpload(bio);
		setTextInputVisible(false);
		// dispatch(fetchUserBio());
		// dispatch(fetchUserPic());
	};

	const bioUpload = (bio) => {
		console.log("bio in bioUpload", bio);
		firebase
			.firestore()
			.collection("userBio")
			.doc(firebase.auth().currentUser.uid)
			.set({
				bio: bio,
				creation: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				console.log("bio upload succefull");
				dispatch(fetchUserBio());
				Alert.alert(`New Bio uploaded!`);
				navigation.popToTop();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<View>
			<ProfilePic navigation={navigation} />
			{textareaVisible === true ? (
				<View>
					<Button title="Upload" onPress={() => handleUpload(bio)} />
					<Button
						title="ProImg"
						onPress={() =>
							navigation.navigate("ProfilePicUploader")
						}
					/>
				</View>
			) : (
				<View>
					<TextInput
						onChangeText={(text) => setBio(text)}
						value={bio}
						placeholder="write new bio here"
					/>
					<Button title="Upload" onPress={() => handleUpload(bio)} />
					<Button
						title="ProImg"
						onPress={() =>
							navigation.navigate("ProfilePicUploader")
						}
					/>
				</View>
			)}
		</View>
	);
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
