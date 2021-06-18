import React, { useState } from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";

import firebase from "firebase";
import { useDispatch } from "react-redux";
import { fetchUserPic } from "../../redux/actions";
import { useSelector } from "react-redux";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function SaveProfilePic(props) {
	const userPic = useSelector((state) => {
		return state.userState.userPic;
	});

	const dispatch = useDispatch();

	const uploadImage = async () => {
		const uri = props.route.params.image;
		const childPath = `post/${
			firebase.auth().currentUser.uid
		}/${Math.random().toString(36)}`;
		console.log(childPath);

		const response = await fetch(uri);
		const blob = await response.blob();

		const task = firebase.storage().ref().child(childPath).put(blob);

		const taskProgress = (snapshot) => {
			console.log(`transferred: ${snapshot.bytesTransferred}`);
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				saveUserImage(snapshot);
			});
		};

		const taskError = (snapshot) => {
			console.log(snapshot);
		};
		task.on("state_changed", taskProgress, taskError, taskCompleted);
	};

	const saveUserImage = (downloadURL) => {
		firebase
			.firestore()
			.collection("userPic")
			.doc(firebase.auth().currentUser.uid)
			.set({
				userPic: downloadURL,
				creation: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				console.log("New Image uploaded");
				Alert.alert("New Image uploaded");
				dispatch(fetchUserPic());
				props.navigation.popToTop();
			})
			.catch((error) => {
				console.log("upload userImage NOT succefull");
				Alert.alert("There is something wrong!!!!", err.message);
			});
	};

	return (
		<View
			style={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				source={{ uri: props.route.params.image }}
				style={{
					width: 250,
					height: 250,
					marginLeft: "auto",
					marginRight: "auto",
				}}
			/>
			<Button
				title="retake"
				onPress={() => props.navigation.navigate("ProfileEditor")}
			/>

			<Button title="Save" onPress={() => uploadImage()} />
		</View>
	);
}
