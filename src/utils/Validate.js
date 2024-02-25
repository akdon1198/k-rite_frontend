export const checkvalidatedata = (field, signup)=>{
    const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.email)
    const ispasswordvalid = (field.password.length < 6) ? false : true
    const isnamevalid = field.name != "" ? true : false
    const isconfirmpassvalid = (field.password == field.confirmpass)? true : false
    if(!isEmailvalid) return "Email not valid"
    if(!ispasswordvalid) return "Password is less than 6"
    if(signup){
        if(!isnamevalid) return "Name cannot be empty"
    }
    if(signup){
        if(!isconfirmpassvalid) return "password should match"
    }
    return ""
}