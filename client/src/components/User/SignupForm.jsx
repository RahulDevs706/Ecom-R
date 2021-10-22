import React, {useState} from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './UserLogin.css'
 

const Forms = ({user, HandleSubmit, handleChange_form, isSignup})=>{
 
    const [passwordShown, setPasswordShown] = useState(false);

    const [role, setRole] = useState();

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (<>
    {/* // <form onSubmit={HandleSubmit}> */}

        
        {isSignup==="signup" && <div class="form-floating ">
            <input type="text" value={user.fullName} name="fullName" onChange={handleChange_form} className="form-control firstInputofUser"  placeholder="Full Name"  autoComplete="off" />
            <label htmlFor="floatingInput">Full Name</label>
        </div>}
        
        <div class="form-floating ">
            <input type="text" value={user.username} name="username" onChange={handleChange_form} className={isSignup === "signup" ? "form-control midInputofUser" :"form-control firstInputofUser"} id="floatingInput" placeholder="username" autoComplete="off" />
            <label htmlFor="floatingInput">Username</label>
        </div>
        <div class="form-floating ">
            <input type={passwordShown ? "text" : "password"} value={user.password} onChange={handleChange_form} name="password" className= "form-control lastInputofUser" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
            <i className={passwordShown?"fa fa-eye-slash passIcon":"fa fa-eye passIcon"}  onClick={togglePasswordVisiblity}  aria-hidden="true"></i>       
        </div>

        {isSignup==="signup" && 
            <FormControl sx={{ m: 1, minWidth: 1 }}>
                <InputLabel id="roleLabel">Role</InputLabel>
                    <Select
                            labelId="roleLabel"
                            id="roleLabel"
                            name="role"
                            value={role}
                            onChange={handleChange_form}
                            label="Role">

                        <MenuItem value="">default</MenuItem>
                        <MenuItem value="user">user</MenuItem>
                        <MenuItem value="admin">admin</MenuItem>
                    </Select>
        </FormControl>}
        

        <div style={{ paddingTop: "10px" }}>
            <button onClick={HandleSubmit} className="w-100 btn btn-lg btn-outline-primary btn-block" type="submit">{isSignup === "signup"? "Signup":"Login"}</button>
        </div>
       
    {/* // </form> */}
    </>
    );
}


export default Forms;