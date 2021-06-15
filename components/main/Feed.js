import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";

import firebase from "firebase";
import "firebase/firestore";
import { connect, useSelector } from "react-redux";

export default function Feed({ navigation }) {
	let wallPosts = [];

	const currentUser = useSelector((state) => {
		return state.userState.currentUser;
	});

	const feed = useSelector((state) => {
		return state.userState.posts;
	});

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});

	console.log("feed in feed state", feed);
	console.log("feed in curentUser state", currentUser);
	console.log("posts in wallPosts state", wallPosts);

	useEffect(() => {
		// 	console.log("props.feed", props);
		// 	if (
		// 		props.usersFollowingLoaded == props.following.length &&
		// 		props.following.length !== 0
		// 	) {
		// 		props.feed.sort(function (x, y) {
		// 			return x.creation - y.creation;
		// 		});
		setUser(currentUser);
		setPosts(feed);
	}, [feed, posts, user]);

	if (!feed) {
		return (
			<View>
				<Text>loading</Text>
			</View>
		);
	} else {
		wallPosts = feed.map((obj) => ({
			...obj,
			user: currentUser,
		}));
	}
	console.log("posts in feed state", wallPosts);

	const onLikePress = (userId, postId) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(userId)
			.collection("userPosts")
			.doc(postId)
			.collection("likes")
			.doc(firebase.auth().currentUser.uid)
			.set({});
	};
	const onDislikePress = (userId, postId) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(userId)
			.collection("userPosts")
			.doc(postId)
			.collection("likes")
			.doc(firebase.auth().currentUser.uid)
			.delete();
	};
	return (
		<View style={styles.container}>
			<View style={styles.containerGallery}>
				<FlatList
					numColumns={1}
					horizontal={false}
					data={wallPosts}
					renderItem={({ item }) => (
						<View style={styles.containerImage}>
							<Text style={styles.container}>
								{item.user.firstName}
							</Text>
							<Image
								style={styles.image}
								source={{ uri: item.downloadURL }}
							/>
							{item.currentUserLike ? (
								<Button
									title="Dislike"
									onPress={() =>
										onDislikePress(
											item.user.uid,
											item.creation.id
										)
									}
								/>
							) : (
								<Button
									title="Like"
									onPress={() =>
										onLikePress(item.user.uid, item.id)
									}
								/>
							)}
							<Text
								onPress={() =>
									navigation.navigate("Comment", {
										postId: item.id,
										uid: item.user.uid,
									})
								}
							>
								View Comments...
							</Text>
						</View>
					)}
				/>
			</View>
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
// const mapStateToProps = (store) => ({
// 	currentUser: store.userState.currentUser,
// 	following: store.userState.following,
// 	feed: store.usersState.feed,
// 	usersFollowingLoaded: store.usersState.usersFollowingLoaded,
// });
// export default connect(mapStateToProps, null)(Feed);
