import Home from "./Components/Home/Home";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Readonlychecklist from "./Components/Readonlychecklist/Readonlychecklist";
import { useSelector } from "react-redux";

function App() {
  const userid = useSelector(store=>store.user.userid)
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<LoginSignup/>}/>
        <Route path = "/board" element = {userid ? <Home/>: <Navigate replace to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
