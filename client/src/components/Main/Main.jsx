import React, { useContext } from 'react'
import './Main.css'
import { UserContext } from '../../context/UserContext'
import ProdCard from './ProdCard';

const Main = () => {

    const {user, isAuthenticated} = useContext(UserContext);
    
    


    return (
        <div className='mainWrapper'>
           {isAuthenticated&&user?.role!=="admin"&&<h1 className="greet">Welcome to your very own store {user?.fullName}</h1>} 
           {user?.role==="admin"&&<h1 className="greet">Welcome to Admin Panel {user?.fullName}</h1>}
            <div className="prodCard"><ProdCard /></div>
        </div>
    )
}

export default Main
