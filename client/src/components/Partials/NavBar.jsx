import React, { useState,useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import {useHistory} from "react-router-dom"
import axios from 'axios'
import './NavBar.css'
import { useMediaQuery } from 'react-responsive'
import MoreTab from './MoreTab'
import { FiMenu } from "react-icons/fi";
import { IconButton } from '@mui/material';

const NavBar = () => {

    const history = useHistory();

    const {isAuthenticated, setUser, setIsAuthenticated, user, products, setProducts, cards, setCards, baseUrl} = useContext(UserContext);

    const [query, setQuery] = useState("")
    const [isShown, setIsShown]= useState(false)

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 840px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 840px)' })


   const Logout=()=>{
       axios.get(baseUrl+"/user/logout",{withCredentials:true}).then(result=>{

        const data= result?.data;
        console.log(data);
        setUser(data?.user);
        setIsAuthenticated(data?.isAuthenticated);
        window.location.reload(false);
        setIsShown(false)

       })
        
        
        
        
    }
    const addProduct = ()=>{
        history.push('/addProduct')
        setIsShown(false)
    }

    function handleSubmit(e, query){
        e.preventDefault();

        if(!query){
            setCards(products);
            return;
        }

        const result= products.filter(item=>{return item._id===query})

        
        if (!result.length) {
            setCards([]);
          } else {
            setCards(result);
          }
        
        
    }

    function handleChange(e) {
        var {value}= e.target;


        setQuery(value);

        if(!value){
            setCards(products);
            return;
        }
        const result= products.filter(item=>{return item._id===value})

        
        if (!result.length) {
            setCards([]);
          } else {
            setCards(result);
          }

    }



    
    return (
        <div>
            <div className="navBarWrapper">
                <h1><a href="/">Ecommerce</a></h1>
                {isAuthenticated&&
                <div className="search-wrapper" >
                    <div className="searchField">
                        <form>
                            <input onChange={handleChange} className="navSearchInput" type="text" placeholder="Search by id" />
                            <button onClick={(e)=>handleSubmit(e, query)} className="navSearchButton"><i className="fas fa-search"></i></button>
                        </form>
                    </div>            
                 
                </div>}

            {isAuthenticated&&isTabletOrMobile&& <IconButton><h2 onClick={()=>setIsShown(!isShown)}><FiMenu /></h2></IconButton>}


            {isTabletOrMobile&& <MoreTab user={user} addProduct={addProduct} isAuthenticated={isAuthenticated} Logout={Logout} sideBar={isShown} setSideBar={setIsShown} />}

                
            {isDesktop&&
                <div className="navBtn">
                    {user?.role==="admin"&&<button onClick={addProduct} style={{margin:"1vmax"}} type="button" className="btn btn-warning ">Add Product</button>}
                    {isAuthenticated&&<button onClick={()=>Logout()} style={{margin:"1vmax"}} type="button" className="btn btn-danger ">Log out</button>
                        
                    }
                </div>}

                
            </div>
        </div>
    )
}

export default NavBar
