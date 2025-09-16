const reducer = (
	auth = {
		isAuthenticated: localStorage.getItem("instructor_token") ? true : false,
		token: localStorage.getItem("instructor_token"),
	},
	action
) => {
	switch (action.type) {
		case "INSTRUCTOR_LOGIN":
			return {
				...auth,
				isAuthenticated: localStorage.getItem("instructor_token") ? true : false,
				token: localStorage.getItem("instructor_token"),
			};
		case "LOGOUT":
			localStorage.removeItem("instructor_token");
			return { ...auth, isAuthenticated: false, token: null };
		case "INSTRUCTOR_LOGOUT":
			return { ...auth, isAuthenticated: false, token: false };

		default:
			return auth;
	}
};

export default reducer;
