import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/Dashboard";
import GalleryScreen from "../screens/GalleryScreen";

export default function DrawerNavigator() {
	const Drawer = createDrawerNavigator();
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Dashboard" component={Dashboard} />
			<Drawer.Screen name="Gallery" component={GalleryScreen} />
		</Drawer.Navigator>
	);
}
