import React, { useState } from 'react'
import styles from "./Logout.module.css"
import { useDispatch} from 'react-redux'
import { resetuser } from '../../redux/Userslice'
const Logout = ({delet, setdelet}) => {
  const dispatch = useDispatch()
  function confirmlogout(){
    dispatch(resetuser())
  }
  return (
    <div className={styles.maincontainer}>
        <div className={styles.deletecard}>
            <h2>Are you sure you want to Logout?</h2>
            <button onClick={confirmlogout}>Yes, Logout</button>
            <button onClick={()=>setdelet(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default Logout