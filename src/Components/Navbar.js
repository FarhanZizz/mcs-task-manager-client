import React, { useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)

  const navigate = useNavigate()
  return (
    <div className="navbar ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-accent normal-case text-3xl">
          MCS
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-5 md:gap-20 px-1">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "p-3 border-0 border-b-2 border-b-accent md:text-lg"
                : "p-3 md:text-lg"
            }
            to="/"
          >
            Home
          </NavLink>
          {!user ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-3 border-0 border-b-2 border-b-accent md:text-lg"
                    : "p-3 md:text-lg"
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-3 border-0 border-b-2 border-b-accent md:text-lg"
                    : "p-3 md:text-lg"
                }
                to="/signup"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "p-3 border-0 border-b-2 border-b-accent md:text-lg"
                    : "p-3 md:text-lg"
                }
                to="/tasks"
              >
                Tasks
              </NavLink>
              <button
                className="p-3 md:text-lg"
                onClick={() => {
                  logOut().then(() => navigate("/"))
                }}
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
