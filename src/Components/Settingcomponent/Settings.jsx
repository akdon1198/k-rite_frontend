import React, { useState } from 'react'
import styles from "./Settings.module.css"
import eyeimg from "../../images/eyeimg.png"
import passwordimg from "../../images/passwordimg.png"
import nameimg from "../../images/nameimg.png"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { commonapiurl } from '../../Constant'

const Settings = () => {
  const [oldpasswordtype, setoldpasswordtype] = useState("password")
  const [newpasswordtype, setnewpasswordtype] = useState("password")
  const [name, setname] = useState("")
  const [oldpassword, setoldpassword] = useState("")
  const [newpassword, setnewpassword] = useState("")
  const [error, seterror] = useState("")
  const [updating, setupdating] = useState(false)
  const userid = useSelector(store=>store.user.userid)
  function handleoldpasswordtype(){
    if(oldpasswordtype == "password") setoldpasswordtype("text")
    else if(oldpasswordtype == "text") setoldpasswordtype("password")
  }
  function handlenewpasswordtype(){  
    if(newpasswordtype == "password") setnewpasswordtype("text")
    else if(newpasswordtype == "text") setnewpasswordtype("password")
  }
  function handleupdate(){
    if(name == "" && oldpassword == "" && newpassword == "") return
    if(oldpassword != newpassword){
      seterror("Password not match")
      return
    }
    if(oldpassword != "" && oldpassword.length < 6){
      seterror("Password should more than 6")
      return
    }
    seterror("")
    setupdating(true)
    axios.patch(commonapiurl + "auth/updateuser/" + userid, {name, password : oldpassword})
    .then((response)=>{
      setupdating(false)
      setname("")
      setoldpassword("")
      setnewpassword("")
      alert("User updated successfully")
    })
    .catch(()=>{console.log("error occured");})
  }
  return (
    <div className={styles.maincontainer}>
      <h2>Settings</h2>
      <div>
            <input type="text" name='text'
            placeholder='Name'
            onChange={(e)=>setname(e.target.value)}
            value={name}
            />
            <img src={nameimg} alt="" />
      </div>
      <div>
            <input type={oldpasswordtype} name='password'
            placeholder="Old Password"
            onChange={(e)=>setoldpassword(e.target.value)}
            value={oldpassword}
            />
            <img src={passwordimg} alt="" />
            <div>
              <img src={eyeimg} alt="" 
              onClick={handleoldpasswordtype}
              />
            </div>
      </div>
      <div>
            <input type={newpasswordtype} name='password'
            placeholder="New Password"
            onChange={(e)=>setnewpassword(e.target.value)}
            value={newpassword}
            />
            <img src={passwordimg} alt="" 
            />
            <div>
              <img src={eyeimg} alt="" 
              onClick={handlenewpasswordtype}
              />
            </div>
      </div>
      <p>{error}</p>
      <button onClick={handleupdate}>{updating ? "Updating..." : "Update"}</button>
    </div>
  )
}

export default Settings