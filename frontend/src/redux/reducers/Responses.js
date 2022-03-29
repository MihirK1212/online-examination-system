const setResponses = (Questions)=>{
    let res = []
    Questions.map(question=>res.push({questionNumber:question.questionNumber,status:'NotSeen',questionGivenAnswer:'',questionSelectedOptions:[]}))
    return res
}
const saveResponse = (responses,responseData,questionNumber) => {
    let res = responses
    let index = res.findIndex(response => response.questionNumber === questionNumber)
    console.log("index ",index)
    res[index] = responseData
    return res
}

const reducer = (responses=[],action) => {
    switch(action.type){
        case "SET_INITIAL_RESPONSES":
            console.log("setInitialResponses reducer called",action.payload)
            responses = setResponses(action.payload)
            return [...responses]
        case "SAVE_QUESTION_RESPONSE":
            console.log("saveQuestionResponse reducer called",action.payload.responseData,action.payload.questionNumber)
            responses = saveResponse(responses,action.payload.responseData,action.payload.questionNumber)
            return [...responses]
        default:
            return responses
    }
}

export default reducer