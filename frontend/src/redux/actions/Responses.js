import * as api from "../../api";

export const setInitialResponses = (exam) => async (dispatch) => {
    console.log("setInitialResponses action called",exam)
    try {
      const {data} = await api.getResponses(exam)
      dispatch({type:"SET_INITIAL_RESPONSES",payload:data.initialResponses})
    } catch (error) {
        console.log(error)
    }
}

export const saveQuestionResponse = (responseData) => async (dispatch) => {
  console.log("setQuestionResponse action called",responseData)
  try {
    dispatch({type:"SAVE_QUESTION_RESPONSE",payload:{responseData:responseData,questionNumber:responseData.questionNumber}})
  } catch (error) {
      console.log(error)
  }
}

export const saveResponses = (responseData) => async (dispatch) => {
  console.log("saveResponses action called",responseData)
  try {
    await api.saveResponses(responseData)
  } catch (error) {
      console.log(error)
  }
}