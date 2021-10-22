import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import './ProdCard.css'
import { IconButton } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

let id;

const ProdCard = () => {
    const history = useHistory()

    const {user, setId, products, setProducts, cards, baseUrl} = useContext(UserContext);


    const [loaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        axios.get(baseUrl+"/user/getProduct").then(res=>{
            setProducts(res.data.data);
            setIsLoaded(true);
        })
    }, [products])

    const deleteProduct = (e,id)=>{
        console.log(id);
        axios.delete(baseUrl+"/user/deleteProduct/"+id).then(res=>{
            alert("Succesfully deleted")
        })

    }


    const array=[]

    if(cards){
        array.push(cards)
    }else{array.push(products)}







    return (<>
    
        {loaded?array[0].map(data=>{
            return(
            <div className="prodCardWrapper">
           
                <img className="prodPhoto" src={data.img}  />
                
                <div className="prodDetails" >
                    <div className="prodDetailsSub">
                        <h2><a href="#">{data.name}</a></h2>
                        <h3>$ {data.price}</h3>
                    </div>
                    {user?.role==="admin"&&<div className="adminAccess">
                    <IconButton onClick={(e)=>deleteProduct( e,data._id)}> <DeleteIcon className="MuiIcon-root red"/></IconButton>
                        <IconButton onClick={()=>{
                            history.push("/updateProduct");
                            setId(data._id)}}>
                            <UpdateIcon className="MuiIcon-root yellow" /></IconButton>
                    </div>}
                    
                </div>
           
            </div>
            )
        }):<h2>Loading...</h2>}
        </>
    )
}

export default ProdCard
export {id}
