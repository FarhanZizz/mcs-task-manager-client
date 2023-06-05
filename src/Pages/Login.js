import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import img from "../Assets/login-hero.png"
import { BsGoogle } from "react-icons/bs"
import { AuthContext } from "../AuthProvider/AuthProvider"
const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { googleLogin, login } = useContext(AuthContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      await login(email, password)
      form.reset()
      setError("")
      navigate("/")
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.")
          break
        case "auth/user-not-found":
          setError("User not found. Please create an account.")
          break
        default:
          setError("An error occurred. Please try again later.")
          break
      }
    }
  }

  const handleGoogle = async () => {
    try {
      await googleLogin()
      // Reset form and navigate to home page on success
      setError("")
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10 lg:mt-0 py-10">
      <div
        className="tooltip tooltip-accent tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl font-bold mb-5 ">Welcome back, captain!</h1>
          {error ? (
            <h1 className="text-sm text-error">{error}</h1>
          ) : (
            <h1 className="text-sm">Our ship has been adrift without you.</h1>
          )}
          <input
            placeholder="EMAIL"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            type="email"
            name="email"
            required
          />
          <input
            placeholder="PASSWORD"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            type="password"
            name="password"
            required
          />
          <div className="flex justify-between items-center">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-accent checkbox-xs rounded-none"
              />
              <span className="label-text ml-2">Remember me</span>
            </label>
            <Link className=" link link-accent text-sm" to="/password-reset">
              Forgot Password
            </Link>
          </div>

          <button
            className="btn btn-accent w-full mt-4"
            value="Send"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogle}
          className="btn bg-base-100 hover:bg-base-100 text-accent  w-full"
        >
          <BsGoogle className="mr-2"></BsGoogle>Sign in with Google
        </button>
        <p className="mt-4 ">
          Don't have an account?{" "}
          <Link className="link link-accent" to="/signup">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </section>
  )
}

export default Login
