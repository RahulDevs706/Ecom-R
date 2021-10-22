import React from 'react'
import {Switch, Route} from "react-router-dom"
import Main from './components/Main/Main'
import UserPage from './components/User/UserPage'
import PrivateRoute from './components/hocs/PrivateRoute'
import AddProduct from './components/admin/AddProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import Switcher from './components/hocs/Switcher'

const Router = () => {
    return (
        <div>
        <Switch>
            <Route exact path="/" component={Switcher} />
            <PrivateRoute exact path="/addProduct" component={AddProduct} />
            <PrivateRoute exact path="/updateProduct" component={UpdateProduct} />
        </Switch>
            
        </div>
    )
}

export default Router
