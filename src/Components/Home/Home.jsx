import React, { useState } from 'react'
import styles from "./Home.module.css"
import Analytics from '../Analytics/Analytics'
import Dashboard from '../Dashboard/Dashboard'
import Settings from '../Settingcomponent/Settings'
import projectimg from "../../images/projectimg.png"
import boardimg from "../../images/boardimg.png"
import analyticsimg from "../../images/analyticsimg.png"
import settingimg from "../../images/settingimg.png"
import Logoutimg from "../../images/Logoutimg.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logout from '../Logout/Logout'
const Home = () => {
  const location = useLocation().pathname.split("/")
  const history = useNavigate()
  const url = location[location.length - 1]
  const dispatch = useDispatch()
  const [delet, setdelet] = useState(false)
  return (
    <>
    <div className={styles.maincontainer}>
      <div className={styles.leftcontainer}>
        <div>
          <img src={projectimg} alt="" />
          <h1>Task Manage</h1>
        </div>
        <div onClick={()=>history("/board")} className={url == "board" && styles.selectedtype}>
          <img src={boardimg} alt="" />
          <h2>Board</h2>
        </div>
        <div>
          <img onClick={()=>setdelet(true)}src={Logoutimg} alt="" />
        </div>
      </div>
      <div className={styles.rightcontainer}>
        {
          url == "board" && <Dashboard/>
        }
        {
          url == "analytics" && <Analytics/>
        }
        {
          url == "settings" && <Settings/>
        }
      </div>
    </div>
    {
      delet && <Logout delet={delet} setdelet={setdelet}/>
    }
    </>
  )
}

export default Home