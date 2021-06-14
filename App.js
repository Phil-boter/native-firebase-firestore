import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import apiKeys from "./config/keys";

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

// import WelcomeScreen from "./screens/WelcomeScreen";
// import SignUp from "./screens/SignUp";
// import SignIn from "./screens/SignIn";
// import LoadingScreen from "./screens/LoadingScreen";
// import DrawerNavigator from "./navigators/DrawerNavigator";

const Stack = createStackNavigator();

export default function App() {
	if (!firebase.apps.length) {
		console.log("Connected with Firebase");
		firebase.initializeApp(apiKeys.firebaseConfig);
	}

	const [loggedIn, setLogin] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				setLogin(false);
				setLoaded(true);
			} else {
				setLoaded(true);
				setLogin(true);
			}
		});
	});
	if (!loaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text>Loading</Text>
			</View>
		);
	}
	if (!loggedIn) {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
						/>
						<Stack.Screen name="Login" component={LoginScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				{/* <Stack.Navigator initialRouteName="Main">
					<Stack.Screen name="Main" component={MainScreen} />
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
					/>
				</Stack.Navigator> */}
				<Text>Hello</Text>
			</NavigationContainer>
		</Provider>
	);
}
