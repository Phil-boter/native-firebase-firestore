import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import firebase from "firebase/app";
require("firebase/firestore");
import { useSelector } from "react-redux";
import BioEditor from "./BioEditor";

import ProfilePic from "./ProfilePic";

export default function Profile({ navigation }) {
	const user = useSelector((state) => {
		return state.userState.currentUser;
	});
	const userBio = useSelector((state) => {
		return state.userState.bio;
	});
	const [userImage, setUserImage] = useState("");

	useEffect(() => {
		// const uid = firebase.auth().currentUser.uid;
		if (user) {
			firebase
				.firestore()
				.collection("profile")
				.doc(user.userId)
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						console.log("data", snapshot.data());
						setUserImage(snapshot.data());
					} else {
						console.log("does not exist");
					}
				});
		}
	}, [user]);

	const onLogout = () => {
		firebase.auth().signOut();
	};

	return !user ? (
		<View>
			<Text>loading</Text>
		</View>
	) : (
		<View>
			<Text>{user.firstName}</Text>
			<Text>{user.lastName}</Text>
			<ProfilePic userImage={userImage} />
			<Text>{user.email}</Text>
			<BioEditor userBio={userBio} />
			{/* <Button title="proImg" onPress={() => setUploader(true)}></Button> */}
			<Button
				title="ProImg"
				onPress={() => navigation.navigate("ProfilePicUploader")}
			/>
			{/* <Button title="ProImg" onPress={() => setUploader(true)} /> */}
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
// const mapStateToProps = (store) => ({
// 	currentUser: store.userState.currentUser,
// 	posts: store.userState.posts,
// 	following: store.userState.following,
// });
// export default connect(mapStateToProps, null)(Profile);
