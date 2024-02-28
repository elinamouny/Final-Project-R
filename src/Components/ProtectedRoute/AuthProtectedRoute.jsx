import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import Home from '../Home/Home'
import { Navigate } from 'react-router-dom'

export default function AuthProtectedRoute({ children }) {
    const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authContext)
    return (
        <>
            {userIsLoggedIn ? <Navigate to={'/home'} /> : children}
        </>
    )
}
