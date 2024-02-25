import React, { useState } from 'react'
import styles from "./Createcard.module.css"
import Ellipseimg from "../../images/Ellipseimg.png"
import Ellipse2img from "../../images/Ellipse2img.png"
import Ellipse3img from "../../images/Ellipse3img.png"
import addimg from "../../images/addimg.png"
import deleteimg from "../../images/deleteimg.png"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import { addchecklist, adddescription, addname, addpriority, deletechecklist, resetchecklist, setdate, updatechecklistcheckbox, updatechecklistdata } from '../../redux/Checklistslice'
import { commonapiurl} from '../../Constant'
import { Validatechecklist } from '../../utils/Validatechecklist'
import { resetchecklistid } from '../../redux/Userslice'
const Createcard = ({setCreatecardshow, checklistchanged, setchecklistchanged}) => {
  const priority = useSelector(store => store.checklist.priority)
  const name = useSelector(store => store.checklist.name)
  const description = useSelector(store => store.checklist.description)
  const duedate = useSelector(store => store.checklist.duedate)
  const checklistid = useSelector(store=>store.user.checklisteditid)
  const userid = useSelector(store=>store.user.userid)
  const markedval = useSelector(store=>store.checklist.markedval)
  const [saving, setsaving] = useState(false)
  const dispatch = useDispatch()
  function handlecancel(){
    setCreatecardshow(false)
    dispatch(resetchecklistid())
    dispatch(resetchecklist())
  }
  function handlename(e){
    dispatch(addname(e.target.value))
  }
  function handlepriority(priorityval){
    dispatch(addpriority(priorityval))
  }
  function addnewchecklist(){
    dispatch(addchecklist())
  }
  function updatechecklistcheckfun(index){
    dispatch(updatechecklistcheckbox(index))
}
function updatechecklistdatafun(e, index){
    dispatch(updatechecklistdata({data:e.target.value, index}))
}
function deletechecklistfun(index){
    dispatch(deletechecklist(index))
}
function setdatefun(e){
    dispatch(setdate(e.target.value))
}
function handledescription(e){
    dispatch(adddescription(e.target.value))
}
function savechecklist(){
    if(name == ""){
        alert("Please Enter title")
        return;
    }
    if(priority == ""){
        alert("select priority")
        return
    }
    if(duedate == ""){
        alert("select duedate")
        return
    }
    if(description == ""){
        alert("please fill description")
        return
    }
    setsaving(true)
    if(checklistid){
        axios.patch(commonapiurl + "checklist/updatechecklist/" + checklistid, {
            name , priority, description, duedate, userid
        })
        .then((response) => {
            dispatch(resetchecklist())
            dispatch(resetchecklistid())
            setchecklistchanged(!checklistchanged) 
            setCreatecardshow(false)
        })
        .catch((err) =>{
            console.log(err);
        })
    }else{
        axios.post(commonapiurl + "checklist/addchecklist", {
            name, priority, markedval, description, duedate, userid, createdAt : new Date().getDate()
        })
        .then((response) => {
            dispatch(resetchecklist())
            setchecklistchanged(!checklistchanged) 
            setCreatecardshow(false)
        })
        .catch((err) =>{
            console.log(err);
        })
    }
}
  return (
    <div className={styles.maincontainer}>
        <div className={styles.createcard}>
            <h2>Title <span>*</span></h2>
            <input type="text" 
            placeholder='Enter Task Title'
            onChange={(e) => handlename(e)}
            value={name}
            />
            <div className={styles.selectpriority}>
                <p>Select Priority <span>*</span></p>
                <button className={priority=="high" && styles.selectedbtn} onClick={() => handlepriority("high")}>
                    <img src={Ellipseimg} alt="" />
                    <p>HIGH PRIORITY</p>
                </button>
                <button className={priority=="moderate"&&styles.selectedbtn} onClick={()=>handlepriority("moderate")}>
                    <img src={Ellipse2img} alt="" />
                    <p>MODERATE PRIORITY</p>
                </button>
                <button className={priority=="low"&&styles.selectedbtn} onClick={()=>handlepriority("low")}>
                    <img src={Ellipse3img} alt="" />
                    <p>LOW PRIORITY</p>
                </button>
            </div>
            <p>Description <span>*</span></p>
            <div className={styles.checklistcontainer}>
                <textarea
                placeholder='Add task Description'
                onChange={(e)=>handledescription(e)}
                value={description}
                >
                </textarea>
            </div>
            <div className={styles.savebutton}>
                <input type="date"
                onChange={(e) => setdatefun(e)}
                value={duedate}
                />
                <div>
                    <button onClick={handlecancel}>Cancel</button>
                    <button onClick={savechecklist}>{saving ? "Saving..." : "Save"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Createcard