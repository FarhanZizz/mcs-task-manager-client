import React, { useContext, useState } from "react"
import { BsGoogle } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthProvider/AuthProvider"
import img from "../Assets/signup-hero.png"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { singUpWithEmailPassword, updateUser, googleLogin } =
    useContext(AuthContext)

  const handleGoogle = async () => {
    try {
      await googleLogin()
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
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20  items-center mt-10 lg:mt-0 py-10">
      <div
        className="tooltip tooltip-accent tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, email, password } = values
            try {
              await singUpWithEmailPassword(email, password)
              await updateUser({ displayName: name })
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
            setSubmitting(false)
          }}
        >
          <Form>
            <h1 className="text-3xl font-bold mb-5 ">Join us today!</h1>
            {error ? (
              <h1 className="text-sm text-error">{error}</h1>
            ) : (
              <h1 className="text-sm">
                Become one of the cool kids on the block.
              </h1>
            )}
            <Field
              name="name"
              type="text"
              placeholder="NAME"
              className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            />
            <ErrorMessage name="name" component="div" className="text-error" />

            <Field
              name="email"
              type="email"
              placeholder="EMAIL"
              className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            />
            <ErrorMessage name="email" component="div" className="text-error" />

            <Field
              name="password"
              type="password"
              placeholder="PASSWORD"
              className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-accent w-full my-4"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-error"
            />

            <button className="btn btn-accent w-full mt-4" type="submit">
              Sign Up
            </button>
          </Form>
        </Formik>
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
