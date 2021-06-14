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
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
//---------------- setup Redux/END ----------------------

import LandingScreen from "./components/auth/Landing";
import LoginScreen from "./components/auth/Login";
import RegisterScreen from "./components/auth/Register";

import Dashboard from "./screens/Dashboard";

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
	return loggedIn ? (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen name="Dashboard" component={Dashboard} />
					{/* <Stack.Screen name="Main" component={MainScreen} />
						<Stack.Screen
							name="Add"
							component={AddScreen}
							navigation={this.props.navigation}
						/>
						<Stack.Screen
							name="Save"
							component={SaveScreen}
							navigation={this.props.navigation}
						/>
						<Stack.Screen
							name="Comment"
							component={CommentScreen}
							navigation={this.props.navigation}
						/> */}
				</Stack.Navigator>
				<Text>Hello</Text>
			</NavigationContainer>
		</Provider>
	) : (
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
	);
}
