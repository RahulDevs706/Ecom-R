import React, {createContext, useState, useEffect} from "react";
import axios from "axios"

export const UserContext = createContext();

export default ({children})=>{
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([])
    const [cards, setCards] = useState();
    const baseUrl="https://server-ecom.herokuapp.com"

    const [id, setId] = useState();

    useEffect(() => {
        
        axios.get(baseUrl+"/user/authenticated", {withCredentials:true}).then(result=>{
            const data = result?.data;
            setIsAuthenticated(data?.isAuthenticated);
            setUser(data?.user)
        })
        
        
    }, [products]);





    return(
        <div>
        <UserContext.Provider value={{user,setUser, isAuthenticated,setIsAuthenticated, id, setId, products, setProducts, cards, setCards, baseUrl}}>{children}</UserContext.Provider> 
        </div>
    )

}