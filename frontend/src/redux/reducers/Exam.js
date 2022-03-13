
const newQuestion = (newQuestionNum) => {
    return {"questionType":"MCQ","questionNo":newQuestionNum,"questionContent":"","questionOptions":[],"questionAnswer":[]}
}

const reducer = (exam=[],action) => {
    switch(action.type){
        case "SET_EXAM":
            console.log("setExam reducer called",action.payload)
            return [{...action.payload}]
        case "ADD_QUESTION":
            console.log("add question called")
            exam[0].Questions.push(newQuestion(exam[0].Questions.length+1))
            return [...exam]
        default:
            return exam
    }
}

export default reducer