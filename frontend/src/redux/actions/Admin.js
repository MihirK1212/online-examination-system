import * as api from "../../api";

export const addStudents = (students) => async (dispatch) => {
    console.log("addStudents action called",students)
    try {
        await api.addStudents(students)
    } catch (error) {
        console.log(error)
    }
}

export const addInstructors = (instructors) => async (dispatch) => {
    console.log("addInstructors action called",instructors)
    try {
        await api.addInstructors(instructors)
    } catch (error) {
        console.log(error)
    }
}

export const addCourse = (course) => async (dispatch) => {
    console.log("addCourse action called",course)
    try {
        await api.addCourse(course)
    } catch (error) {
        console.log(error)
    }
}

export const addCourseInstance = (courseInstance) => async (dispatch) => {
    console.log("addCourseInstance action called",courseInstance)
    try {
        await api.addCourseInstance(courseInstance)
    } catch (error) {
        console.log(error)
    }
}