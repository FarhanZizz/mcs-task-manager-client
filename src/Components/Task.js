import React from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

const Task = () => {
  return (
    <div className="card bg-accent rounded-md text-neutral-content">
      <div className="card-body flex-row justify-between items-center gap-5 p-4">
        <div className="flex gap-5 items-center">
          <input type="checkbox" className="checkbox" />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="card-title">Cookies!</h2>
              <div className="badge badge-ghost">Completed</div>
            </div>
            <span className="text-sm opacity-70">
              We are using cookies for no reason.
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <label className="btn btn-secondary btn-sm rounded-md text-white">
            <PencilSquareIcon className="h-5 w-5 " />
          </label>
          <button className="btn btn-error btn-sm rounded-md text-white">
            <TrashIcon className="h-5 w-5 " />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task
