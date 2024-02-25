import React, { useState } from 'react'
import styles from "./LoginSignup.module.css"
import Loginimg from "../../images/Loginimg.png"
import emailimg from "../../images/emailimg.png"
import passwordimg from "../../images/passwordimg.png"
import Backimg from "../../images/Backimg.png"
import eyeimg from "../../images/eyeimg.png"
import nameimg from "../../images/nameimg.png"
import { checkvalidatedata } from '../../utils/Validate'
import { commonapiurl } from '../../Constant'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { adduser } from '../../redux/Userslice'
const LoginSignup = () => {
  const[signup, setsignup] = useState(true)
  const[error, seterror] = useState("")
  const[passwordtype, setpasswordtype] = useState("password")
  const[confirmpasstype, setconfirmpasstype] = useState("password")
  const[errorflag, seterrorflag] = useState(true)
  const[name, setname] = useState("")
  const[email, setemail] = useState("")
  const[password, setpassword] = useState("")
  const[confirmpass, setconfirmpass] = useState("")
  const dispatch = useDispatch()
  const history = useNavigate()
  function handleclick(e){
    e.preventDefault()
    seterror("")
    setsignup(!signup)
  }
  function handleloginsignup(e){
    e.preventDefault()
    let temperror = checkvalidatedata({name, email, password, confirmpass}, signup)
    seterror(temperror)
    if(temperror != "") return
    seterrorflag(false)
    if(signup){
      axios.post(commonapiurl + "auth/register", {name, email, password})
      .then((response) => {
        if(response.data.jwttoken){
          const jwttoken = response.data.jwttoken
          const userid = response.data.user._id
          const name = response.data.user.name
          dispatch(adduser({jwttoken, userid, name}))
          history("/board")
        }else{
          seterror("Email already in use")
          seterrorflag(true)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }else{
      axios.post(commonapiurl + "auth/login", {email, password})
      .then((response) => {
        if(response.data.jwttoken){
          const jwttoken = response.data.jwttoken
          const userid = response.data.user._id
          const name = response.data.user.name
          dispatch(adduser({jwttoken, userid, name}))
          history("/board")
        }else{
          seterror("Wrong Email or password")
          seterrorflag(true)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
  function handlepasswordtype(){
    if(passwordtype == "text") setpasswordtype("password")
    if(passwordtype == "password") setpasswordtype("text")
  }
function handleconfirmpasstype(){
    if(confirmpasstype == "text") setconfirmpasstype("password")
    if(confirmpasstype == "password") setconfirmpasstype("text")  
  }
  return (
    <div className={styles.maincontainer}>
      <div className={styles.leftcontainer}>
        <img src={Loginimg} alt="" />
        <h2>Welcome aboard my friend</h2>
        <h3>just a couple of clicks and we start</h3>
      </div>
      <div className={styles.rightcontainer}>
        <form>
          <h3>{signup ? "Register" : "Login"}</h3>
          {
            signup && 
            <div>
              <input type="text" name='text'
              placeholder='Name'
              onChange={(e)=>setname(e.target.value)}
              value={name}
              />
              <img src={nameimg} alt="" />
            </div>
          }
          <div>
            <input type="email" name='email'
            placeholder='Email'
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            />
            <img src={emailimg} alt="" />
          </div>
          {
            signup &&
            <div>
              <input type={confirmpasstype} name='password'
              placeholder="Confirm Password"
              onChange={(e)=>setconfirmpass(e.target.value)}
              value={confirmpass}
              />
              <img src={passwordimg} alt="" />
              <div>
                <img src={eyeimg} alt="" 
                onClick={handleconfirmpasstype}
                />
              </div>
            </div>
          }
          <div>
            <input type={passwordtype} name='password'
            placeholder="Password"
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            />
            <img src={passwordimg} alt="" />
            <div>
              <img src={eyeimg} alt="" 
              onClick={handlepasswordtype}
              />
            </div>
          </div>
          <h4>{error}</h4>
          {
            signup ? 
            <button onClick={(e) => handleloginsignup(e)}>{errorflag ? "Register" : "Loading..."}</button>
            :
            <button onClick={(e) => handleloginsignup(e)}>{errorflag ? "Log in" : "Loading..."}</button>
          }
          <p>{signup ? "Have an account?" : "Have no account yet?"}</p>
          <button onClick={(e) => handleclick(e)}>{signup ? "Login" : "Register"}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginSignup