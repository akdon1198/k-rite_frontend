import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import downarrowimg from "../../images/downarrowimg.png"
import uparrowimg from "../../images/uparrowimg.png"
import collapseimg from "../../images/collapseimg.png"
import Ellipseimg from "../../images/Ellipseimg.png"
import Ellipse2img from "../../images/Ellipse2img.png"
import Ellipse3img from "../../images/Ellipse3img.png"
import threedotimg from "../../images/threedotimg.png"
import Delete from '../Delete/Delete'
import Createcard from '../Createcard/Createcard'
import addimg from "../../images/addimg.png"
import axios from 'axios'
import {CopyToClipboard} from "react-copy-to-clipboard"
import { commonapiurl, montharr } from '../../Constant'
import { setchecklistid } from '../../redux/Userslice'
import { useDispatch, useSelector } from 'react-redux'
import { addname, addpriority, setchecklistarr, setchecklistmarkedval, setdate, setdescription, setfilterchecklist, setsectiontype } from '../../redux/Checklistslice'
import { createdate } from '../../utils/Createdate'
const Dashboard = () => {
  const[deletecontainershow, setdeletecontainershow] = useState(false)
  const[Createcardshow, setCreatecardshow] = useState(false)
  const[handlepopupcard, sethandlepopupcard] = useState(false)
  const[selectedbtn, setselectedbtn] = useState(false)
  const[allchecklist, setallchecklist] = useState([])
  const[checklistchanged, setchecklistchanged] = useState(true)
  const[showchecklistobj, setshowchecklistobj] = useState({})
  const[openpopup, setopenpopup] = useState("")
  const userid = useSelector(store=>store.user.userid)
  const username = useSelector(store => store.user.name)
  const[closepopup, setclosepopup] = useState(true)
  const filterchecklist = useSelector(store=>store.checklist.filterchecklist)
  const[currendate, setcurrendate] = useState("")
  const[currentmonth, setcurrentmonth] = useState("")
  const[currentyear, setcurrentyear] = useState("")
  const[readonlychecklist, setreadonlychecklist] = useState("")
  const[initialindex, setinitialindex] = useState(1)
  const dispatch = useDispatch()
  const[copied, setcopied] = useState(false)
  const[datecurrent, setdatecurrent] = useState("")
  useEffect(() =>{
    let tempdate = new Date()
    setcurrendate(tempdate.getDate())
    setcurrentmonth(tempdate.getMonth() + 1)
    setcurrentyear(tempdate.getFullYear())
    setdatecurrent(createdate())
    let query = "all"
    if(filterchecklist == "Today"){
      query = tempdate.getDate()
    }
    axios.get(commonapiurl + "checklist/getchecklist/" + userid + "?time=" + query)
    .then((response) =>{
      let tempchecklist = response.data.allchecklist
      setallchecklist(
        tempchecklist.map(checklist => {
          if(checklist.duedate == "") return {...checklist, tempname : checklist.name.length < 50 ? checklist.name : checklist.name.slice(0, 50) + "..."}
          return {...checklist,
            date : parseInt(checklist.duedate.split("-")[2]),
            month : parseInt(checklist.duedate.split("-")[1]),
            year : parseInt(checklist.duedate.split("-")[0]),
            tempname : checklist.name.length < 50 ? checklist.name : checklist.name.slice(0, 50) + "...",
            duedatestring : (montharr[parseInt(checklist.duedate.split("-")[1]) - 1] + " " + checklist.duedate.split("-")[2] + "th")
          }
        })
      )
    })
    .catch((err) =>{
      console.log(err);
    })
  },[checklistchanged])
  function handlesectiontype(typeval, checklistid){
    setshowchecklistobj(
      Object.keys(showchecklistobj).filter(objKey => objKey != checklistid)
      .reduce((newObj, key) =>{
            newObj[key] = showchecklistobj[key];
            return newObj;
          },
      {})
    )  
    setallchecklist(
      allchecklist.map((checklistobj) =>{
        if(checklistid == checklistobj._id) return {...checklistobj, sectiontype : typeval}
        else return checklistobj
      })
    )
    axios.patch(commonapiurl + "checklist/updatechecklist/" + checklistid,{
      sectiontype : typeval
    })
    .then((response) =>{
      console.log(response.data.updatedchecklist);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  function updatemark(checklist){
    setallchecklist(
      allchecklist.map((checklistobj) =>{
        if(checklist._id == checklistobj._id) return {...checklistobj ,markedval : !checklistobj.markedval}
        else return checklistobj
      })
    )
    axios.patch(commonapiurl + "checklist/updatechecklist/" + checklist._id, {
      markedval : !checklist.markedval
    })
    .then((response) =>{
      console.log(response.data);
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  function handleremovekey(checklistid){
    setshowchecklistobj(
    Object.keys(showchecklistobj).filter(objKey => objKey != checklistid)
    .reduce((newObj, key) =>{
          newObj[key] = showchecklistobj[key];
          return newObj;
        },
    {})
  )
  }
  function handleaddkey(checklistid, sectiontype){
    console.log(checklistid);
    setshowchecklistobj({
      ...showchecklistobj, [checklistid] : sectiontype
    })
  }
  function collapsechecklist(sectiontype){
    setshowchecklistobj(
      Object.keys(showchecklistobj).filter(objKey => showchecklistobj[objKey] != sectiontype)
      .reduce((newObj, key) =>{
            newObj[key] = showchecklistobj[key];
            return newObj;
          },
      {})
    )  
  }
  function closepopupfun(val){
    setopenpopup(val)
    if(openpopup == val) setopenpopup("")
  }
  function Editchecklist(checklistobj){
    dispatch(setdescription(checklistobj.description))
    dispatch(setchecklistid(checklistobj._id))
    dispatch(addname(checklistobj.name))
    dispatch(addpriority(checklistobj.priority))
    dispatch(setdate(checklistobj.duedate))
    setCreatecardshow(true)
    setopenpopup("")
  }
  function handledeletechecklist(checklistid){
    setdeletecontainershow(true)
    dispatch(setchecklistid(checklistid))
    setopenpopup("")
  }
  function setmonthtype(value){
    dispatch(setfilterchecklist(value))
    sethandlepopupcard(!handlepopupcard)
    setchecklistchanged(!checklistchanged)
  }
  function handleshare(checklistid){
    setcopied(true)
    setTimeout(() => {
      setcopied(false)
    }, 1500);
    setopenpopup("")
  }
  function closepopupcontainer(){
    if(handlepopupcard){
      sethandlepopupcard(false)
    }
    if(openpopup){
      setopenpopup("")
    }
  }
  function setindex(indextype){
    if(indextype == "prev"){
      if(initialindex > 1) setinitialindex(initialindex - 1)
    }else if(indextype == "next"){
      if(allchecklist.length > ((initialindex + 1) * 2 - 2)) setinitialindex(initialindex + 1)
    }else{
      setinitialindex(indextype)
    }
  }
  return (
    <>
    <div className={styles.maincontainer} onClick={closepopupcontainer}>
      <div className={styles.usernamedate}>
        <p>Welcome! {username}</p>
        <p>{datecurrent}</p>
      </div>
      <div className={styles.titledate}>
        <p>Board</p>
        <p
        onClick={()=>sethandlepopupcard(!handlepopupcard)}
        >{filterchecklist} <img src={downarrowimg} alt="" /></p>
        {
          handlepopupcard && 
          <div>
            <p onClick={()=>setmonthtype("Today")}>Today</p>
            <p onClick={()=>setmonthtype("This Week")}>This Week</p>
            <p onClick={()=>setmonthtype("This Month")}>This Month</p>
          </div>
        }
      </div>
      <button onClick={()=>setCreatecardshow(true)}>Create Task + </button>
      <div className={styles.taskcontainer}>
        {
          allchecklist.length == 0 &&
          <p>Please Create new Task</p>
        }
        {
          allchecklist.map((checklist, index) =>{
            return(index < initialindex * 2 && index >= initialindex * 2 - 2) ? (
              <div className={styles.task}>
                {
                  checklist.priority == "high" && <p><img src={Ellipseimg} alt="" /> HIGH PRIORITY</p>
                }
                {
                  checklist.priority == "low" && <p><img src={Ellipse3img} alt="" /> LOW PRIORITY</p>
                }
                {
                  checklist.priority == "moderate" && <p><img src={Ellipse2img} alt="" /> MODRATE PRIORITY</p>
                }
                <h2>{index + 1}. {checklist.name}</h2>
                <h3>{checklist.description}</h3>
                <div className={styles.duedate}>
                <button>{checklist.duedatestring}</button>
                <div>
                  <button
                  onClick={()=>Editchecklist(checklist)}
                  >Edit</button>
                  <button
                  onClick={()=>handledeletechecklist(checklist._id)}
                  >Delete</button>
                  {
                    checklist.markedval ?
                    <button className={styles.selectedbtn} onClick={()=>updatemark(checklist)}>Completed</button>
                    :
                    <button onClick={()=>updatemark(checklist)}>Uncomplete</button>
                  }
                </div>
                </div>
              </div>
            )
            : 
            ""
          })
        }
      </div>
      <div className={styles.pagination}>
        <button onClick={()=>setindex("prev")}>Prev</button>
        {
          Array(initialindex < 4 ? initialindex : 3).fill("val").map((val, index) =>{
            return(
              <button className={index + 1 == initialindex && styles.selectedindexbtn} onClick={()=>setindex(index + 1)}>{index + 1}</button>
            )
          })
        }
        <button onClick={()=>setindex("next")}>Next</button>
      </div>
    </div>
    {
      deletecontainershow && <Delete
      setdeletecontainershow={setdeletecontainershow} checklistchanged={checklistchanged}
      setchecklistchanged={setchecklistchanged}
      />
    }
    {
      Createcardshow && <Createcard setCreatecardshow={setCreatecardshow}
      checklistchanged={checklistchanged} setchecklistchanged={setchecklistchanged}
      />
    }
    {
      copied &&
      <div className={styles.copied}>Link Copied</div>
    }
    </>
  )
}

export default Dashboard