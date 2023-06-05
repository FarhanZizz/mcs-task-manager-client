import React from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { toast } from "react-hot-toast"
import { useFormik } from "formik"
import * as Yup from "yup"

const Task = ({ task, refetch }) => {
  const { title, description, status, _id } = task
  const modal = document.getElementById(_id)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Description is required"),
  })

  const formik = useFormik({
    initialValues: {
      title: title,
      message: description,
      completed: status,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newTask = {
        title: values.title,
        description: values.message,
        status: values.completed,
      }

      fetch(
        `https://mcs-task-management-server.vercel.app/update-task/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(newTask),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          refetch()
          toast.success("Data Updated Successfully")
          modal.checked = false
        })
    },
  })

  const handleDelete = () => {
    fetch(`https://mcs-task-management-server.vercel.app/delete-task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          refetch()
          toast.success("Deleted Successfully")
        }
      })
  }

  return (
    <div className="card bg-accent rounded-md text-neutral-content">
      <div className="card-body flex-row justify-between items-center gap-5 p-4">
        <div className="flex gap-5 items-center">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="card-title">{title}</h2>
              {status ? (
                <div className="badge badge-ghost">Completed</div>
              ) : (
                <div className="badge badge-warning">Incomplete</div>
              )}
            </div>
            <span className="text-sm opacity-70">{description}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <label
            htmlFor={_id}
            className="btn btn-secondary btn-sm rounded-md text-white"
          >
            <PencilSquareIcon className="h-5 w-5 " />
          </label>
          <input type="checkbox" id={_id} className="modal-toggle" />
          <div className="modal text-black">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Task</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control my-5 mb-8">
                  <input
                    type="text"
                    required
                    placeholder="TITLE"
                    name="title"
                    className={`input input-bordered rounded-none border-0 border-b-2 input-accent w-full focus:outline-none ${
                      formik.errors.title &&
                      formik.touched.title &&
                      "input-error"
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
                    <div className="input-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Mark as Completed</span>
                    <input
                      type="checkbox"
                      name="completed"
                      className="checkbox checkbox-accent"
                      checked={formik.values.completed}
                      onChange={formik.handleChange}
                    />
                  </label>
                </div>
                <div className="modal-action mt-10">
                  <label htmlFor={_id} className="btn btn-error text-white">
                    Cancel
                  </label>
                  <button type="submit" className="btn btn-accent text-white">
                    Edit Task
                  </button>
                </div>
              </form>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm rounded-md text-white"
          >
            <TrashIcon className="h-5 w-5 " />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task
