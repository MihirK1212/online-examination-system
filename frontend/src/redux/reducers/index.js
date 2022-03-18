import { combineReducers } from "redux";

import Responses from "./Responses"
import adminAuth from "./adminAuth"
import instructorAuth from "./instructorAuth"
import studentAuth from "./studentAuth"

export default combineReducers({
    Responses , adminAuth , instructorAuth , studentAuth 
})
