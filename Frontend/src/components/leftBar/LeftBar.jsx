import "./leftBar.scss";
import Friends from "../../assets/imgs/1.png";
import Groups from "../../assets/imgs/2.png";
import Memories from "../../assets/imgs/5.png";
import Events from "../../assets/imgs/6.png";
import Gallery from "../../assets/imgs/8.png";
import Videos from "../../assets/imgs/9.png";
import Messages from "../../assets/imgs/10.png";
import Tutorials from "../../assets/imgs/11.png";
import Courses from "../../assets/imgs/12.png";
import Fund from "../../assets/imgs/13.png";
import Chatbot from "../../assets/imgs/14.png";
import Quiz from "../../assets/imgs/15.png";
import Map from "../../assets/imgs/16.png";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

const LeftBar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="leftBar mt-3">
      <div className="container">
        <div className="menu">
          <NavLink className="user" to={`/profile/${auth._id}`}>
            <img src={`http://localhost:5000/uploads/${auth.img}`} alt="" />
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {auth.firstname} {auth.lastname}
            </span>
          </NavLink>
          
            <NavLink className="user" to={`/donate`}>
             
            </NavLink>
          
        </div>
        <hr />
        <div className="menu">
          
          <NavLink className="user" to={`/news`}>
            <div className="item">
              <img src={Gallery} alt="" />
              <span>News</span>
            </div>
          </NavLink>
          
          <NavLink className="user" to={`/chat`}>
            
          </NavLink>
        </div>
        <hr />
        <div className="menu">
          
          
          <div className="item">
          <NavLink className="chatbot" to={`/chatgbt`}><img src={Chatbot} alt="" /></NavLink>
            <span>Help</span>
          </div>
          <div className="item">
          <NavLink className="quiz" to={`/quiz`}><img src={Quiz} alt="" /></NavLink>
            <span>questionnaire</span>
          </div>
          <div className="item">
          <NavLink className="map" to={`/mapevent`}><img src={Map} alt="" /></NavLink>
            <span>Map</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
