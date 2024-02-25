export const checkduedate = (duedate)=>{
    const currentmonth = new Date().getMonth() + 1
    const currentdate = new Date().getDate()
    const currentyear = new Date().getFullYear()
    const date = parseInt(duedate.split("-")[2])
    const month = parseInt(duedate.split("-")[1])
    const year = parseInt(duedate.split("-")[0])
    if(year > currentyear) return true
    if(year < currentyear) return false
    if(month > currentmonth) return true
    if(month < currentmonth) return false
    if(date >= currentdate) return true
    if(date < currentdate) return false
}