import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import {
	fetchUser,
	fetchUserBio,
	fetchUserPic,
	// clearData,
} from "../../redux/actions";

import { useDispatch, useSelector } from "react-redux";

import firebase from "firebase/app";
require("firebase/firestore");

import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";

export default function Profile({ navigation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		return state.userState.currentUser;
	});
	const bio = useSelector((state) => {
		return state.userState.bio;
	});
	console.log("bio in profile", bio);
	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchUserBio());
		dispatch(fetchUserPic());
	}, []);

	const onLogout = () => {
		firebase.auth().signOut();
	};

	const renderBio = (bio) => {
		if (!bio) {
			return <Text>No bio yet</Text>;
		} else {
			return <Text>{bio.bio}</Text>;
		}
	};

	return !user ? (
		<View>
			<Text>loading</Text>
		</View>
	) : (
		<View>
			<Text>
				{user.firstName} {user.lastName}
			</Text>

			<ProfilePic navigation={navigation} />

			<Text>{user.email}</Text>
			<View>{renderBio(bio)}</View>
			<Button
				title="Edit Profile"
				onPress={() => navigation.navigate("ProfileEditor")}
			/>
			<Button title="Logout" onPress={() => onLogout()} />
		</View>
	);
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
