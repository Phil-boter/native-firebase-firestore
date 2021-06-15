import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";

import firebase from "firebase";
require("firebase/firestore");

import { useDispatch, useSelector } from "react-redux";

import { fetchUsersData, fetchUser } from "../../redux/actions/index";

export default function Comment(props) {
	console.log("props in commentScreen", props);
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => {
		console.log("state", state.userState.currentUser.uid);
		return state.userState.currentUser;
	});
	console.log("currentuser", currentUser);
	const [comments, setComments] = useState([]);
	const [postId, setPostId] = useState("");
	const [text, setText] = useState("");
	function matchUserToComment(comments) {
		console.log("comments", comments);
		for (let i = 0; i < comments.length; i++) {
			if (comments[i].hasOwnProperty("user")) {
				continue;
			}

			const user = currentUser.find((x) => x.uid === comments[i].creator);
			console.log("user in comment ", user);
			if (user == undefined) {
				dispatch(fetchUsersData(comments[i].creator, false));
			} else {
				comments[i].user = user;
			}
		}
		setComments(comments);
	}

	useEffect(() => {
		dispatch(fetchUser());
		if (props.route.params.postId !== postId) {
			firebase
				.firestore()
				.collection("posts")
				.doc(props.route.params.uid)
				.collection("userPosts")
				.doc(props.route.params.postId)
				.collection("comments")
				.get()
				.then((snapshot) => {
					let comments = snapshot.docs.map((doc) => {
						const data = doc.data();
						const id = doc.id;
						return { id, ...data };
					});
					matchUserToComment(comments);
				});
			setPostId(props.route.params.postId);
		} else {
			matchUserToComment(comments);
		}
	}, [props.route.params.postId, props.users]);

	const onCommentSend = () => {
		firebase
			.firestore()
			.collection("posts")
			.doc(props.route.params.uid)
			.collection("userPosts")
			.doc(props.route.params.postId)
			.collection("comments")
			.add({
				creator: firebase.auth().currentUser.uid,
				text,
			});
	};

	return (
		<View>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={comments}
				renderItem={({ item }) => (
					<View>
						{item.user !== undefined ? (
							<Text>{item.user.name}</Text>
						) : null}
						<Text>{item.text}</Text>
					</View>
				)}
			/>

			<View>
				<TextInput
					placeholder="comment..."
					onChangeText={(text) => setText(text)}
				/>
				<Button onPress={() => onCommentSend()} title="Send" />
			</View>
		</View>
	);
}

// const mapStateToProps = (store) => ({
// 	users: store.usersState.users,
// });
// const mapDispatchProps = (dispatch) =>
// 	bindActionCreators({ fetchUsersData }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(Comment);
