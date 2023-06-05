import React from "react"
import { useContext } from "react"
import { useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
  }
  return children
}

export default PrivateRoute
