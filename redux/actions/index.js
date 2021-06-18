import {
	GET_USER_DATA,
	GET_USER_BIO,
	USER_POSTS_STATE_CHANGE,
	USER_FOLLOWING_STATE_CHANGE,
	USERS_DATA_STATE_CHANGE,
	USERS_POSTS_STATE_CHANGE,
	USERS_LIKES_STATE_CHANGE,
	GET_USER_PIC,
} from "../constants/index";
import { Alert } from "react-native";
import firebase from "firebase";
import { SnapshotViewIOSComponent } from "react-native";
require("firebase/firestore");

// export function clearData() {
// 	return { type: CLEAR_DATA };
// }

export async function fetchUser() {
	console.log("action fetchUser");
	try {
		const data = await firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.uid)
			.get();

		if (data.exists) {
			console.log("data user", data.data());
			return {
				type: GET_USER_DATA,
				currentUser: data.data(),
			};
		} else {
			console.log("does not exist");
		}
	} catch (err) {
		console.log("no user");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function fetchUserBio() {
	console.log("action fetchuserBio");
	try {
		const bio = await firebase
			.firestore()
			.collection("userBio")
			.doc(firebase.auth().currentUser.uid)
			.get();
		console.log("BIO", bio.data());

		return {
			type: GET_USER_BIO,
			bio: bio.data(),
		};
	} catch (err) {
		console.log("bio fetch NOT succefull");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function fetchUserPic() {
	console.log("action fetchUserPic");
	try {
		const userPic = await firebase
			.firestore()
			.collection("userPic")
			.doc(firebase.auth().currentUser.uid)
			.get();

		if (userPic) {
			console.log("action GET UserPic success");
			return {
				type: GET_USER_PIC,
				userPic: userPic.data(),
			};
		} else {
			console.log("UserPic does not exist");
		}
	} catch (err) {
		console.log("fetch userPic NOT succefull");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function fetchUserPosts() {
	console.log("action fetchUserPosts", firebase.auth().currentUser.uid);
	try {
		const snapPost = await firebase
			.firestore()
			.collection("posts")
			.doc(firebase.auth().currentUser.uid)
			.collection("userPosts")
			.orderBy("creation", "asc")
			.get();
		console.log("snapshgot in posts");
		let posts = snapPost.docs.map((doc) => {
			const data = doc.data();
			console.log("doc,data", data);
			const id = doc.id;
			return { id, ...data };
		});
		console.log("posts in fectUserPosts", posts);
		return { type: USER_POSTS_STATE_CHANGE, posts: posts };
	} catch (err) {
		console.log("no user");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function fetchUserFollowing() {
	try {
		firebase
			.firestore()
			.collection("following")
			.doc(firebase.auth().currentUser.uid)
			.collection("userFollowing")
			.onSnapshot((snapshot) => {
				let following = snapshot.docs.map((doc) => {
					const id = doc.id;
					return id;
				});
				console.log("f0llowing", following);

				for (let i = 0; i < following.length; i++) {
					return {
						type: USER_FOLLOWING_STATE_CHANGE,
						following: fetchUsersData(following[i], true),
					};
				}
			});
	} catch (err) {
		console.log("error in following user action");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function fetchUsersData(uid, getPosts) {
	const found = getState().usersState.users.some((el) => el.uid === uid);
	if (!found) {
		const snapshot = await firebase
			.firestore()
			.collection("users")
			.doc(uid)
			.get();

		if (snapshot.exists) {
			let user = snapshot.data();
			user.uid = snapshot.id;

			return { type: USERS_DATA_STATE_CHANGE, user: user };
		} else {
			console.log("does not exist");
		}

		if (getPosts) {
			fetchUsersFollowingPosts(uid);
		}
	}
}

export function fetchUsersFollowingPosts(uid) {
	firebase
		.firestore()
		.collection("posts")
		.doc(uid)
		.collection("userPosts")
		.orderBy("creation", "asc")
		.get()
		.then((snapshot) => {
			const uid = snapshot.query.EP.path.segments[1];
			const user = getState().usersState.users.find(
				(el) => el.uid === uid
			);

			let posts = snapshot.docs.map((doc) => {
				const data = doc.data();
				const id = doc.id;
				return { id, ...data, user };
			});

			for (let i = 0; i < posts.length; i++) {
				// fetchUsersFollowingLikes(uid, posts[i].id);
				return {
					type: USERS_POSTS_STATE_CHANGE,
					posts: fetchUsersFollowingLikes(uid, posts[i].id),
				};
			}
		});
}

export function fetchUsersFollowingLikes(uid, postId) {
	firebase
		.firestore()
		.collection("posts")
		.doc(uid)
		.collection("userPosts")
		.doc(postId)
		.collection("likes")
		.doc(firebase.auth().currentUser.uid)
		.onSnapshot((snapshot) => {
			const postId = snapshot.ZE.path.segments[3];

			let currentUserLike = false;
			if (snapshot.exists) {
				currentUserLike = true;
			}

			return {
				type: USERS_LIKES_STATE_CHANGE,

				currentUserLike: currentUserLike,
			};
		});
}
