import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ImageBackground,
	StyleSheet,
	View,
	Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// -------------- setup firebase ---------------------

import firebase from "firebase/app";
import apiKeys from "./config/keys";
import "firebase/auth";

if (!firebase.apps.length) {
	console.log("Connected with Firebase");
	firebase.initializeApp(apiKeys.firebaseConfig);
}
// -------------- setup firebase/END ---------------------

//---------------- setup Redux ----------------------
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import rootReducer from "./redux/reducers";
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(reduxPromise))
);
//---------------- setup Redux/END ----------------------

import LandingScreen from "./components/auth/Landing";
import LoginScreen from "./components/auth/Login";
import RegisterScreen from "./components/auth/Register";

import MainScreen from "./screens/Main";
import AddScreen from "./components/main/Add";
import CommentScreen from "./components/main/Comment";
import SaveScreen from "./components/main/Save";
import SaveProfilePicScreen from "./components/profile/SaveProfilePic";
import ProfilePicUploaderScreen from "./components/profile/ProfilePicUploader";
import ProfileEditorScreen from "./components/profile/BioEditor";

const Stack = createStackNavigator();

export default function App() {
	const [loggedIn, setLogin] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		console.log("useEffect");
		firebase.auth().onAuthStateChanged((user) => {
			console.log("user", user);
			if (!user) {
				console.log("logged out");
				setLoaded(true);
				setLogin(false);
			} else {
				console.log("logged in");
				setLogin(true);
				setLoaded(true);
			}
		});
	}, [loggedIn]);

	if (!loaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return !loggedIn ? (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Landing">
				<Stack.Screen
					name="Landing"
					component={LandingScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	) : (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen name="Main" component={MainScreen} />
					{/* <Stack.Screen
						name="Add"
						component={AddScreen}
						options={{ navigation: Navigator.navigation }}
					/> */}
					{/* <Stack.Screen
						name="Save"
						component={SaveScreen}
						options={{ navigation: Navigator.navigation }}
					/> */}
					{/* <Stack.Screen
						name="Comment"
						component={CommentScreen}

						// navigation={navigation}
					/>

					*/}
					<Stack.Screen
						name="ProfileEditor"
						component={ProfileEditorScreen}
					/>
					<Stack.Screen
						name="SaveProfilePic"
						component={SaveProfilePicScreen}
						// options={{ navigation: Navigator.navigation }}
					/>
					<Stack.Screen
						name="ProfilePicUploader"
						component={ProfilePicUploaderScreen}
						// options={{ navigation: Navigator.navigation }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
