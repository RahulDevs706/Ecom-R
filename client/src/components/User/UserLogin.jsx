import React, { useRef, useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Forms from "./SignupForm";

import { UserContext } from '../../context/UserContext';
import Message from "./Message";
import {useHistory} from "react-router-dom";

import './UserLogin.css'

 



function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: ".5rem"
    },
}));



function UserLogin({HandleSignup, HandleLogin, formData, setFormData, value, setValue, message, setMessage, isFormSignup, setIsFormSignup}) {
    const classes = useStyles();
    const theme = useTheme();
    
   

    const userContext = useContext(UserContext);

    

    



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);

        if(index===0){
             setIsFormSignup("login")
        }else if(index===1){
            setIsFormSignup("signup");
        }
      

    };

    function handleChange_form(event){
        

        const {name, value} = event.target;

        setFormData({...formData, [name]:value});

       
    }

     const history = useHistory();



    //  function HandleLogin(event) {
    //     event.preventDefault();

    //     UserServices.login(user).then(data=>{
    //         const {isAuthenticated, user, message}= data;
            
            // if(isAuthenticated){
            //     userContext.setUser(user);
            //     userContext.setIsAuthenticated(isAuthenticated);
            //     history.push('/notes');
            // }else if (!isAuthenticated) {

            //     setMessage({ msgBody: "Invalid credentials", msgError: true })
                

            // }
    //     });
    //  }

    const isSignup = ()=>setIsFormSignup("signup");
    const isLogin = ()=>setIsFormSignup("login")
    const errorType = message?.msgError;



    return (<div className="form_container">
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab onClick={isLogin} label="Login" />
                    <Tab onClick={isSignup} label="Signup" />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Forms
                    user={formData}
                    handleChange_form={handleChange_form}
                    HandleSubmit={HandleLogin}
                    isSignup={isFormSignup}
                     />
                    <p style={errorType?{color:"red"}:{color:"green"}} className='message'>{message? <Message message={message} />: null}</p>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Forms
                        user={formData}
                        handleChange_form={handleChange_form}
                        HandleSubmit={HandleSignup}
                        // HandleLogin={HandleLogin}

                        isSignup={isFormSignup}
                    />
                    <p style={errorType?{color:"red"}:{color:"green"}} className='message'>{message? <Message message={message} />: null}</p>

                </TabPanel>

            </SwipeableViews>
        </div>
    </div>
    );
}


export default UserLogin;