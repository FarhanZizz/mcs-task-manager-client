import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-hot-toast"

const TaskStat = ({ user, refetch, tasks }) => {
  const completed = tasks.filter((task) => task.status === true)
  const completedPercentage = (completed.length / tasks.length) * 100

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Description is required"),
  })

  const taskAddHandler = (values, { resetForm }) => {
    const newTask = {
      title: values.title,
      description: values.message,
      uid: user.uid,
    }
    const modal = document.getElementById("add_task")

    fetch("https://mcs-task-management-server.vercel.app/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Data Successfully Added")
        refetch()
        modal.checked = false
        resetForm()
      })
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: taskAddHandler,
  })

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-figure text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Remaining</div>
        <div className="stat-value text-2xl text-neutral">
          {tasks.length} Tasks
        </div>
      </div>

      <div className="stat">
        <div className="stat-title"></div>
        <div className="stat-value text-secondary">
          <label htmlFor="add_task" className="btn btn-accent">
            Add Task
          </label>
        </div>
      </div>

      <div className="stat">
        {user?.photoURL && (
          <div className="stat-figure text-accent">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL}
                  alt="user"
                />
              </div>
            </div>
          </div>
        )}
        <div className="stat-value">
          {completedPercentage ? completedPercentage.toFixed(0) : 100}%
        </div>
        <div className="stat-title">Tasks done</div>
      </div>

      <input type="checkbox" id="add_task" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control my-5 mb-8">
              <input
                type="text"
                required
                placeholder="TITLE"
                name="title"
                className={`input input-bordered rounded-none border-0 border-b-2 input-accent w-full focus:outline-none ${
                  formik.errors.title && formik.touched.title && "input-error"
                }`}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title && (
                <div className="input-feedback">{formik.errors.title}</div>
              )}
            </div>
            <div className="form-control my-5">
              <textarea
                required
                placeholder="DESCRIPTION"
                name="message"
                className={`input input-bordered rounded-none border-0 border-b-2 input-accent w-full h-20 focus:outline-none ${
                  formik.errors.message &&
                  formik.touched.message &&
                  "input-error"
                }`}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.message && formik.touched.message && (
                <div className="input-feedback">{formik.errors.message}</div>
              )}
            </div>

            <div className="modal-action mt-10">
              <label htmlFor="add_task" className="btn btn-error text-white">
                Cancel
              </label>
              <button type="submit" className="btn btn-accent text-white">
                Add Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskStat
