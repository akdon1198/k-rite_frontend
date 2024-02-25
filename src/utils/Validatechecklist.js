export const Validatechecklist = (name, priority, checklistarr)=>{
    if(name == "") return false
    if(priority == "") return false
    if(checklistarr.length == 0) return false
    for(let i = 0; i < checklistarr.length; i++){
        if(checklistarr[i].data == "") return false
    }
    return true
}