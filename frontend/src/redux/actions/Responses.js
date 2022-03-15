export const setExam = (examData) => async (dispatch) => {
    console.log("setExam action called",examData)
    try {
      dispatch({type:"SET_EXAM",payload:examData})
    } catch (error) {
        console.log(error)
    }
}