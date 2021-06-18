import {
	GET_USER_DATA,
	USER_POSTS_STATE_CHANGE,
	USER_FOLLOWING_STATE_CHANGE,
	GET_USER_BIO,
	GET_USER_PIC,
} from "../constants";

// const initialState = {
// 	currentUser: null,
// 	posts: [],
// 	following: [],
// };

export const user = (state = {}, action) => {
	switch (action.type) {
		case GET_USER_DATA:
			// console.log("action current user", action.currentUser);
			return {
				...state,
				currentUser: action.currentUser,
			};

		case GET_USER_BIO:
			console.log("reducer get bio");
			return {
				...state,
				bio: action.bio,
			};

		case GET_USER_PIC:
			console.log("reducer get userPic");
			return {
				...state,
				userPic: action.userPic,
			};

		case USER_POSTS_STATE_CHANGE:
			console.log("action posts", state);
			return {
				...state,
				posts: action.posts,
			};
		case USER_FOLLOWING_STATE_CHANGE:
			console.log("action following", action.following);
			return {
				...state,
				following: action.following,
			};

		default:
			return state;
	}
};
