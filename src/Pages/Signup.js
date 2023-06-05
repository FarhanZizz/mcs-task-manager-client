import React, { useContext, useState } from "react"
import { BsGoogle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"
import img from "../Assets/signup-hero.png"

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { singUpWithEmailPassword, updateUser, googleLogin } =
    useContext(AuthContext)

  const handleEmailPasswordSignUp = async (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const name = form.name.value
    const password = form.password.value

    try {
      // Call signup function to register user with email and password
      await singUpWithEmailPassword(email, password)

      // Call update function to set user display name
      await updateUser({ displayName: name })

      // Reset form and navigate to home page on success
      form.reset()
      setError("")
      navigate("/")
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "The email address is already in use. Please use a different email."
          )
          break
        case "auth/weak-password":
          setError(
            "The password is too weak. Please choose a stronger password."
          )
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
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "The email address is already in use. Please use a different email."
          )
          break
        case "auth/weak-password":
          setError(
            "The password is too weak. Please choose a stronger password."
          )
          break
        default:
          setError("An error occurred. Please try again later.")
          break
      }
    }
  }

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-20  items-center
    mt-10 lg:mt-0 py-10"
    >
      <div
        className="tooltip tooltip-accent tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <form onSubmit={handleEmailPasswordSignUp}>
          <h1 className="text-3xl font-bold mb-5 ">Join us today!</h1>
          {error ? (
            <h1 className="text-sm text-error">{error}</h1>
          ) : (
            <h1 className="text-sm">
              Become one of the cool kids on the block.
            </h1>
          )}
          <input
            placeholder="NAME"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            type="text"
            name="name"
            required
          />
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
          <button
            className="btn btn-accent w-full mt-4"
            value="Send"
            type="submit"
          >
            Sign Up
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
          Already have an account?{" "}
          <Link className="link link-accent" to="/login">
            Log In
          </Link>{" "}
        </p>
      </div>
    </section>
  )
}

export default Signup
