import {createSlice} from "@reduxjs/toolkit"

const checklistslice = createSlice({
    name : "checklist",
    initialState : {
        priority : "",
        name : "",
        markedval : false,
        description : "",
        duedate : "",
        filterchecklist : "This Month"
    },
    reducers : {
        addname : (state, action)=>{
            state.name = action.payload
        },
        addpriority : (state, action)=>{
            state.priority = action.payload
        },
        setfilterchecklist : (state, action)=>{
            state.filterchecklist = action.payload
        },
        adddescription : (state, action)=>{
            state.description = action.payload
        },
        setdescription:(state, action) =>{
            state.description = action.payload
        },
        resetchecklist : (state, action) =>{
            state.name = ""
            state.priority = ""
            state.description = ""
            state.duedate = ""
            state.sectiontype = "todo"
        },
        setdate:(state, action)=>{
            state.duedate = action.payload
        },
    }
})

export const {addname, setdescription, adddescription, setchecklistarr, setfilterchecklist, setchecklistmarkedval, setsectiontype, setdate, deletechecklist, resetchecklist, addpriority, addchecklist, updatechecklistcheckbox, updatechecklistdata} = checklistslice.actions
export default checklistslice.reducer