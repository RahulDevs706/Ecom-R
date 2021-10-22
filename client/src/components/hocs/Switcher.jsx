import React, { useContext } from 'react'
import UserPage from '../User/UserPage'
import Main from '../Main/Main'
import { UserContext } from '../../context/UserContext'

const Switcher = () => {
    const {isAuthenticated} = useContext(UserContext);

    return (
        <div>
            {isAuthenticated?<Main />:<UserPage />}
        </div>
    )
}

export default Switcher
