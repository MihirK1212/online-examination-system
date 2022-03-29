import * as api from "../../api";

export const addExam = (examData) => async (dispatch) => {
    console.log("addExam action called",examData)
    try {
        await api.addExam(examData)
    } catch (error) {
        console.log(error)
    }
}