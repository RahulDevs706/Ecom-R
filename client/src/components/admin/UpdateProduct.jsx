import React, { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


import "./AddProduct.css"


const UpdateProduct = () => {
    const history = useHistory();
    const {id, baseUrl} = useContext(UserContext);
    const [formData, setFormData] = useState();



    function handleChange(event){
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    const handleClick=()=>{
        axios.put(baseUrl+"/user/updateProduct/"+id, formData).then(res=>{
            alert("Succesfully Updated");
            history.push('/')
        })
        
    }
    
    return (
        <div className="addWrapper">
        <h2> Update Product</h2>
            <div className="addCont">
                <p>Product Id: {id}</p>
                
                <div>
                <div class="form-floating ">
                    <input type="text" onChange={(e)=>handleChange(e)} name="name" className= "form-control firstInputofUser addText" id="floatingName" placeholder="Enter Name" />
                    <label className="addLabel" htmlFor="floatingName">Product Name</label>
                </div>
                <div class="form-floating ">
                    <input type="text" onChange={(e)=>handleChange(e)} name="price" className= "form-control lastInputofUser addText" id="floatingPrice" placeholder="Enter Price" />
                    <label className="addLabel" htmlFor="floatingPrice">Product Price (in Numbers)</label>
                </div>
                <div style={{ paddingTop: "10px" }}>
                   <button onClick={(e)=>handleClick(e)} className="w-100 btn btn-lg btn-outline-primary btn-block" type="submit">Update Product</button>
                </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateProduct
