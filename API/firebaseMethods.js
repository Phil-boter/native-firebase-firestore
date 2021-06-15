import firebase from "firebase";
import "firebase/firestore";

import { Alert } from "react-native";

export async function registration(email, password, lastName, firstName) {
	try {
		await firebase.auth().createUserWithEmailAndPassword(email, password);
		const currentUser = firebase.auth().currentUser;

		const db = firebase.firestore();
		db.collection("users").doc(currentUser.uid).set({
			userId: currentUser.uid,
			email: currentUser.email,
			lastName: lastName,
			firstName: firstName,
		});
	} catch (err) {
		console.log("no user");
		Alert.alert("There is something wrong!!!!", err.message);
	}
}

export async function signIn(email, password) {
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password);
		console.log("logged in success");
	} catch (err) {
		console.log("logged in error");
		Alert.alert("There is something wrong!", err.message);
	}
}

export async function loggingOut() {
	try {
		await firebase.auth().signOut();
	} catch (err) {
		console.log("loggedOut");
		Alert.alert("There is something wrong!", err.message);
	}
}
