import { combineReducers } from 'redux'

import appReducer from "./AppReducer";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    app:appReducer,
    auth:authReducer
})

export default rootReducer