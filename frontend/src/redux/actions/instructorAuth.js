export const loginInstructor = () => async(dispatch) =>{
    dispatch({type:"INSTRUCTOR_LOGIN"})
}

export const logoutInstructor = () => async(dispatch) =>{
    dispatch({type:"INSTRUCTOR_LOGOUT"})
}

