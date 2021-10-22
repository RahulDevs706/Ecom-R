import React, {useEffect, useState, useRef, useContext} from 'react'
import axios from "axios"
import UserLogin from './UserLogin'
import {UserContext} from '../../context/UserContext'
import Message from './Message'
import { useHistory } from 'react-router-dom';

import './UserPage.css'



const initialState = {
    fullName:"",
    username:"",
    password:"",
    role:""
}
 
const UserPage = () => {
    const [formData, setFormData] = useState(initialState);
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState(null);
    const [isFormSignup, setIsFormSignup] = useState("login");
    const {user,setUser, isAuthenticated,setIsAuthenticated, baseUrl}= useContext(UserContext);
    const history = useHistory();

    let timerID = useRef(null);
    
    useEffect(() => {
        return()=>{
            clearTimeout(timerID);
        }
        
    }, [])

    

    

    const Signup =(e)=>{
        e.preventDefault();

      axios.post(baseUrl+"/user/register",formData)
        .then(res=>{
        const {message} =res.data;
            setFormData(initialState);
            setMessage(message);
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    setValue(0);
                    setIsFormSignup("login")
                    setMessage(null);
                }, 1000);
            }
        }).catch(err=>{
            setMessage(message)
        })
      
    }

    const Login =(e)=>{

        axios.post(baseUrl+"/user/login",formData, {withCredentials:true}).then(res=>{
            const {isAuthenticated, user, message}= res.data;
            if(isAuthenticated){
                setUser(user);
                setIsAuthenticated(isAuthenticated);
                history.push("/");
            }
        }) .catch(err=>{
            if(err){
                setMessage({ msgBody: "Invalid credentials", msgError: true })
            }
        })       

        e.preventDefault()
    }



    return (
        <div className="UserPageWrapper">
            <h2>Please {isFormSignup === "signup"? "Signup":"Login"}</h2>
            <div className="loginComponent">
                <UserLogin  HandleSignup={Signup} HandleLogin={Login} formData={formData} setFormData={setFormData} value={value} setValue={setValue} message={message} setMessage={setMessage} isFormSignup={isFormSignup} setIsFormSignup={setIsFormSignup} />
            </div>


            
        </div>
    )
}

export default UserPage
