import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./Userslice"
import ChecklistReducer from "./Checklistslice"

const store = configureStore({
    reducer : {
        user : UserReducer,
        checklist : ChecklistReducer
    }
})

export default store