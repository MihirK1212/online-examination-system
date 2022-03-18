export const loginStudent = () => async(dispatch) =>{
    dispatch({type:"STUDENT_LOGIN"})
}

export const logoutStudent = () => async(dispatch) =>{
    dispatch({type:"STUDENT_LOGOUT"})
}

