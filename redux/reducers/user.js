import {
	GET_USER_DATA,
	UPDATE_USER_BIO,
	USER_POSTS_STATE_CHANGE,
	USER_FOLLOWING_STATE_CHANGE,
	GET_USER_BIO,
} from "../constants";

// const initialState = {
// 	currentUser: null,
// 	posts: [],
// 	following: [],
// };

export const user = (state = {}, action) => {
	switch (action.type) {
		case GET_USER_DATA:
			console.log("action current user", action.currentUser);
			return {
				...state,
				currentUser: action.currentUser,
			};
		case UPDATE_USER_BIO:
			console.log("action upadte bio", action.bio);
			return {
				...state,
				bio: action.bio,
			};

		case GET_USER_BIO:
			console.log("action get bio", action.bio);
			return {
				...state,
				bio: action.bio,
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
