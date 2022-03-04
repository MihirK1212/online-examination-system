const reducer = (exam=[],action) => {
    switch(action.type){
        case "SET_EXAM":
            console.log("setExam reducer called",action.payload)
            return [...action.payload]
        default:
            return exam
    }
}

export default reducer