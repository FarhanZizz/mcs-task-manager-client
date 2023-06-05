import React from "react"
import { Link } from "react-router-dom"
import img from "../Assets/pot.png"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div
          className="tooltip tooltip-accent tooltip-bottom"
          data-tip="pexels.com/@scottwebb"
        >
          <img src={img} className="lg:max-w-lg md:max-w-md" alt="Pot" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Master Your Tasks, Conquer Your Day!
          </h1>
          <p className="py-6">
            Streamline your productivity with MCS Task Manager, the ultimate
            solution for efficient task management. Stay organized, focused, and
            in control of your daily responsibilities with ease.
          </p>
          <Link to="/tasks" className="btn btn-accent">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
