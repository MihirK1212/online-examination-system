import * as api from "../../api";

export const addExam = (examData) => async (dispatch) => {
    console.log("addExam action called",examData)
    try {
        await api.addExam(examData)
    } catch (error) {
        console.log(error)
    }
}

export const saveExam = (examData) => async (dispatch) => {
    console.log("saveExam action called",examData)
    try {
        await api.saveExam(examData)
    } catch (error) {
        console.log(error)
    }
}

export const saveCheckedResponses = (checkedData) => async (dispatch) => {
    console.log("checkExam action called",checkedData)
    try {
        await api.saveCheckedResponses(checkedData)
    } catch (error) {
        console.log(error)
    }
}