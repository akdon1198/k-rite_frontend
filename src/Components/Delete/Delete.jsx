import React, { useState } from 'react'
import styles from "./Delete.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { resetchecklistid } from '../../redux/Userslice'
import axios from 'axios'
import { commonapiurl } from '../../Constant'
const Delete = ({setchecklistchanged, checklistchanged, setdeletecontainershow}) => {
  const checklistid = useSelector(store=>store.user.checklisteditid)
  const [deleting, setdeleting] = useState(false)
  const dispatch = useDispatch()
  function canceldelete(){
    dispatch(resetchecklistid())
    setdeletecontainershow(false)
  }
  function confirmdelete(){
    setdeleting(true)
    axios.delete(commonapiurl + "checklist/deletechecklist/" + checklistid)
    .then((response) =>{
      dispatch(resetchecklistid())
      setchecklistchanged(!checklistchanged)
      setdeletecontainershow(false)
    })
    .catch(err =>{
      console.log(err);
    })
  }
  return (
    <div className={styles.maincontainer}>
        <div className={styles.deletecard}>
            <h2>Are you sure want to delete</h2>
            <button
            onClick={confirmdelete}
            >{deleting ? "Deleting..." : "Yes, Delete"}</button>
            <button
            onClick={canceldelete}
            >Cancel</button>
        </div>
    </div>
  )
}

export default Delete