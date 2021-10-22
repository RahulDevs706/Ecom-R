import React from 'react'
import { Link } from 'react-router-dom'

import { IconButton } from '@mui/material';
import {AiOutlineClose as Close} from 'react-icons/ai'
import './MoreTab.css'

const MoreTab = ({sideBar, setSideBar, user, addProduct, isAuthenticated, Logout}) => {
    return (
        <nav className= {sideBar? 'navMenu active': 'navMenu'}>
            <div className='naveMenuItems'>
                <div className='navBarToggle' onClick={()=>{setSideBar(!sideBar)}}>
                    <Link to='#' className='menuBars'>
                       <IconButton> <h2><Close /></h2></IconButton>
                    </Link>
                    <h2>Menu</h2>
                </div>

                <div className="navBtnMore">
                    {user?.role==="admin"&&<button onClick={addProduct} style={{margin:"1vmax"}} type="button" className="btn btn-warning">Add Product</button>}
                    {isAuthenticated&& 
                            <button onClick={()=>Logout()} style={{margin:"1vmax"}} type="button" className="btn btn-danger ">Log out</button>
                        }
                </div>
                
            </div>
        </nav>
    )
}

export default MoreTab
