import React, { useEffect, useState } from 'react'
import styles from "./Analytics.module.css"
import Ellipse2img from "../../images/Ellipse2img.png"
import { useSelector } from 'react-redux'
import { commonapiurl } from '../../Constant'
import axios from 'axios'
import { checkduedate } from '../../utils/checkduedate'
const Analytics = () => {
  const[backlogcount, setbacklogcount] = useState(0)
  const[todocount, settodocount] = useState(0)
  const[progresscount, setprogresscount] = useState(0)
  const[donecount, setdonecount] = useState(0)
  const[moderatecount, setmoderatecount] = useState(0)
  const[lowcount, setlowcount] = useState(0)
  const[highcount, sethighcount] = useState(0)
  const[duedatecount, setduedatecount] = useState(0)
  const userid = useSelector(store=>store.user.userid)
  const filterchecklist = useSelector(store=>store.checklist.filterchecklist)
  useEffect(() =>{
    let query = "all"
    if(filterchecklist == "Today"){
      query = new Date().getDate()
    }
    axios.get(commonapiurl + "checklist/getchecklist/" + userid + "?time=" + query)
    .then((response) =>{
      const allchecklist = response.data.allchecklist
      let tempbackcount = 0, temptodocount = 0, tempprocount = 0, tempdonecount = 0,
      tempmoderatecnt = 0, temphighcnt = 0, templowcnt = 0, tempduedatecount = 0
      for(let i = 0; i < allchecklist.length; i++){
        if(allchecklist[i].sectiontype == "backlog") {
          if(allchecklist[i].duedate != ""){
            checkduedate(allchecklist[i].duedate) && (tempduedatecount += 1)
          }
          tempbackcount += 1
        }
        if(allchecklist[i].sectiontype == "todo"){
          if(allchecklist[i].duedate != ""){
            checkduedate(allchecklist[i].duedate) && (tempduedatecount += 1)
          }          
          temptodocount += 1
        }
        if(allchecklist[i].sectiontype == "inprogress"){
          if(allchecklist[i].duedate != ""){
            checkduedate(allchecklist[i].duedate) && (tempduedatecount += 1)
          }          
          tempprocount += 1          
        }
        if(allchecklist[i].sectiontype == "done") tempdonecount += 1
        if(allchecklist[i].priority == "moderate") tempmoderatecnt += 1
        if(allchecklist[i].priority == "low") templowcnt += 1
        if(allchecklist[i].priority == "high") temphighcnt += 1
      }
      setduedatecount((tempduedatecount < 10) ? "0" + tempduedatecount : tempduedatecount)
      setmoderatecount((tempmoderatecnt < 10) ? "0" + tempmoderatecnt : tempmoderatecnt)
      setlowcount((templowcnt < 10) ? "0" + templowcnt : templowcnt)
      sethighcount((temphighcnt < 10) ? "0" + temphighcnt : temphighcnt)
      setbacklogcount((tempbackcount < 10) ? "0" + tempbackcount : tempbackcount)
      settodocount((temptodocount < 10) ? "0" + temptodocount : temptodocount)
      setprogresscount((tempprocount < 10) ? "0" + tempprocount : tempprocount)
      setdonecount((tempdonecount < 10) ? "0" + tempdonecount : tempdonecount)
      
    })
    .catch((err) =>{
      console.log(err);
    })
  },[])
  return (
    <div className={styles.maincontainer}>
      <h2>Analytics</h2>
      <div>
        <div className={styles.section}>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Backlogs Tasks</h3>
            </div>
            <p>{backlogcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>To-do Tasks</h3>
            </div>
            <p>{todocount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>In-Progress Tasks</h3>
            </div>
            <p>{progresscount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Completed Tasks</h3>
            </div>
            <p>{donecount}</p>
          </div>
        </div>
        <div className={styles.priority}>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Low Priority</h3>
            </div>
            <p>{lowcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Moderate Priority</h3>
            </div>
            <p>{moderatecount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>High Priority</h3>
            </div>
            <p>{highcount}</p>
          </div>
          <div>
            <div>
              <img src={Ellipse2img} alt="" />
              <h3>Due Date Tasks</h3>
            </div>
            <p>{duedatecount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Analytics