import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./AddProduct.css"

const AddProduct = () => {

    const history= useHistory()

    const {baseUrl} = useContext(UserContext)

    const [formData, setFormData] = useState([])



    function handleChange_form(event){
        
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    const handleClick=()=>{

        axios.post(baseUrl+"/user/addProduct", formData).then(res=>{
            alert("Successfully Added")
            history.push('/')
        })

    }





    return (
        <div className="addWrapper">

            <h2>Add Product</h2>

            <div className="addCont">
                
                <div class="form-floating ">
                    <input type="text" name="img" onChange={(e)=>handleChange_form(e)} className="form-control firstInputofUser addText" id="floatingImg" placeholder="Enter Product Image Url" autoComplete="off" />
                    <label className="addLabel" htmlFor="floatingImg">Image Url</label>
                </div>
                <div class="form-floating ">
                    <input type="text" onChange={(e)=>handleChange_form(e)} name="name" className= "form-control midInputofUser addText" id="floatingName" placeholder="Enter Name" />
                    <label className="addLabel" htmlFor="floatingName">Product Name</label>
                </div>
                <div class="form-floating ">
                    <input type="text" onChange={(e)=>handleChange_form(e)} name="price" className= "form-control lastInputofUser addText" id="floatingPrice" placeholder="Enter Price" />
                    <label className="addLabel" htmlFor="floatingPrice">Product Price (in Numbers)</label>
                </div>


                <div style={{ paddingTop: "10px" }}>
                   <button onClick={()=>handleClick()} className="w-100 btn btn-lg btn-outline-primary btn-block" type="submit">Add Product</button>
                </div>

            </div>
        

        </div>
    )
}

export default AddProduct
