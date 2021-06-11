import React from "react";
// 1.
import { GiftedChat } from "react-native-gifted-chat";
class Chat extends React.Component {
	// 2.
	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || "Chat!",
	});
	// 3.
	state = {
		messages: [],
	};

	render() {
		// 4.
		return <GiftedChat messages={this.state.messages} />;
	}
}
export default Chat;
