const reducer = (
	auth = {
		isAuthenticated: localStorage.getItem("student_token") ? true : false,
		token: localStorage.getItem("student_token"),
	},
	action
) => {
	switch (action.type) {
		case "STUDENT_LOGIN":
			return {
				...auth,
				isAuthenticated: localStorage.getItem("student_token") ? true : false,
				token: localStorage.getItem("student_token"),
			};
		case "LOGOUT":
			localStorage.removeItem("student_token");
			return { ...auth, isAuthenticated: false, token: null };
		case "STUDENT_LOGOUT":
			return { ...auth, isAuthenticated: false, token: false };

		default:
			return auth;
	}
};

export default reducer;
