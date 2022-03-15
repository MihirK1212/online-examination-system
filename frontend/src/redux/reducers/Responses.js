const reducer = (responses=[],action) => {
    switch(action.type){
        case "SET_RESPONSES":
            return responses
        default:
            return responses
    }
}

export default reducer