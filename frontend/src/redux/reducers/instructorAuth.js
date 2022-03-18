const reducer =  (auth = {
    isAuthenticated: localStorage.getItem('instructor_token') ? true : false,
    token: localStorage.getItem('instructor_token'),
},action) => {
switch (action.type) {
    case "INSTRUCTOR_LOGIN":
        return {...auth,isAuthenticated: localStorage.getItem('instructor_token') ? true : false,
        token: localStorage.getItem('instructor_token')}

    case "INSTRUCTOR_LOGOUT":
        return {...auth,isAuthenticated: false,
        token: false}

    default:
        return auth
}
}

export default reducer
