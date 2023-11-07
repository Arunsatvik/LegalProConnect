import ChatUI from '../components/ChatUI/ChatUI';
import { token } from "../config.js";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
const Chatbot = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
            {token && user ? (
            <ChatUI />
            ) : (
            <div className="container">
              <div className="xl:w-[500px] mx-auto">
            <h2 className="heading text-center"><br/><br/><br/>
              Please Login to use our LegalProConnect AI
              <br/><br/><br/><br/>
            </h2>
          </div>
        </div>
            )}
      </div>
  );
  };
  
  export default Chatbot;
  