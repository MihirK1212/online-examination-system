const reducer =  (auth = {
    isAuthenticated: localStorage.getItem('admin_token') ? true : false,
    token: localStorage.getItem('admin_token'),
},action) => {
switch (action.type) {
    case "ADMIN_LOGIN":
        return {...auth,isAuthenticated: localStorage.getItem('admin_token') ? true : false,
        token: localStorage.getItem('admin_token')}
    case "LOGOUT":
        localStorage.removeItem('admin_token');
        return {...auth,isAuthenticated: false, token: null}
    case "ADMIN_LOGOUT":
        return {...auth,isAuthenticated: false,
        token: false}

    default:
        return auth
}
}

export default reducer
