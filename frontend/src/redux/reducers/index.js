import { combineReducers } from "redux";

import responses from "./Responses"
import adminAuth from "./adminAuth"
import instructorAuth from "./instructorAuth"
import studentAuth from "./studentAuth"

export default combineReducers({
    responses , adminAuth , instructorAuth , studentAuth 
})
