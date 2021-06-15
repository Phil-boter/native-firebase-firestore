import {
	USERS_DATA_STATE_CHANGE,
	USERS_POSTS_STATE_CHANGE,
	USERS_LIKES_STATE_CHANGE,
	CLEAR_DATA,
} from "../constants";

// const initialState = {
// 	users: [],
// 	feed: [],
// 	usersFollowingLoaded: 0,
// };

export const users = (state = {}, action) => {
	switch (action.type) {
		case USERS_DATA_STATE_CHANGE:
			return {
				...state,
				users: [...state.users, action.user],
			};
		case USERS_POSTS_STATE_CHANGE:
			console.log("action following", action.usersFollowingLoaded);
			return {
				...state,
				usersFollowingLoaded: action.usersFollowingLoaded + 1,
				feed: action.posts,
			};
		case USERS_LIKES_STATE_CHANGE:
			return {
				...state,
				feed: state.feed.map((post) =>
					post.id == action.postId
						? { ...post, currentUserLike: action.currentUserLike }
						: post
				),
			};

		default:
			return state;
	}
};
