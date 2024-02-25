import React, { useEffect, useState } from 'react'
import styles from "./Readonlychecklist.module.css"
import projectimg from "../../images/projectimg.png"
import Ellipseimg from "../../images/Ellipseimg.png"
import Ellipse2img from "../../images/Ellipse2img.png"
import Ellipse3img from "../../images/Ellipse3img.png"
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { commonapiurl, montharr } from '../../Constant'
const Readonlychecklist = () => {
    const [singlechecklist, setsinglechecklist] = useState("")
    const url = useLocation().pathname.split("/")[2]
    const [duedate, setduedate] = useState("")
    useEffect(()=>{
        axios.get(commonapiurl + "checklist/getsinglechecklist/" + url)
        .then((response)=>{
            setsinglechecklist(response.data.singlechecklist)
            setduedate(montharr[parseInt(response.data.singlechecklist.duedate.split("-")[1]) - 1] + " " + response.data.singlechecklist.duedate.split("-")[2] + "th")
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
  return (
    <>
        <div className={styles.title}>
            <img src={projectimg} alt="" />
            <h2>Pro Manage</h2>
        </div>
        <div className={styles.maincontainer}>
            <div className={styles.checklistcard}>
                <div className={styles.priority}>
                    {
                        singlechecklist.priority == "high" &&
                        <img src={Ellipseimg} alt="" />
                    }
                    {
                        singlechecklist.priority == "moderate" &&
                        <img src={Ellipse2img} alt="" />
                    }
                    {
                        singlechecklist.priority == "low" &&
                        <img src={Ellipse3img} alt="" />
                    }
                    {
                        singlechecklist.priority == "high" &&
                        <p>HIGH PRIORITY</p>
                    }
                    {
                        singlechecklist.priority == "moderate" &&
                        <p>MODERATE PRIORITY</p>
                    }
                    {
                        singlechecklist.priority == "low" &&
                        <p>LOW PRIORITY</p>
                    }
                </div>
                <h2>{singlechecklist.name}</h2>
                <h3>Checklist ({singlechecklist.markedval}/{singlechecklist?.checklistarr?.length})</h3>
                <div className={styles.checklistcardcontainer}>
                    {
                        singlechecklist.checklistarr?.map(checklist =>{
                            return(
                                <div className={styles.inputbox}>
                                    <input type="checkbox" 
                                    checked={checklist.mark}
                                    />
                                    <input type="text" 
                                    value={checklist.data}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    singlechecklist.duedate != "" &&
                    <div className={styles.duedate}>
                        <p>Due Date</p>
                        <button>{duedate}</button>
                    </div>
                }
            </div>
        </div>
    </>
  )
}

export default Readonlychecklist