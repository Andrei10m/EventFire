import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import SignupPage from "./account/SignupPage";
import Events from "./views/Events";
import ProfileView from "./views/ProfileView";
import HomePage from './views/HomePage';


function App() {
 
  return (
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
            <Route path="/SignUp" element={<SignupPage/>}/>
            <Route path="/Events" element={<Events/>}/>
            <Route path="/Profile" element={<ProfileView/>}/>
            <Route path="/Home" element={<HomePage/>}/>
        </Routes>
      </div>
  );
}

export default App;
