import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import Main from '../Main/Main'
import { UserContext } from '../../context/UserContext'

const PrivateRoute = ({component: Component, ...rest}) => {

    const {isAuthenticated, user} = useContext(UserContext);

    console.log(isAuthenticated);


    return (<div>
          <Route {...rest} render={props=>{
            if(user?.role!=="admin"){
                return <Redirect to={{pathname:'/' }} />
                } 

            else{return <Component {...props} />}
        }} />
        </div>
        
    )
}

export default PrivateRoute
