export const loginAdmin = () => async(dispatch) =>{
    dispatch({type:"ADMIN_LOGIN"})
}

export const logoutAdmin = () => async(dispatch) =>{
    dispatch({type:"ADMIN_LOGOUT"})
}

