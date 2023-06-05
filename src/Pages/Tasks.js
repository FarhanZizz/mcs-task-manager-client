import React, { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import TaskStat from "../Components/TaskStat"
import Task from "../Components/Task"

const Tasks = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className="grid gap-10 justify-center mt-5">
      <TaskStat user={user} />
      <div className="bg-[#f7f3f3] grid grid-cols-1 gap-5 rounded-lg p-5">
        <select
          defaultValue="sort"
          className="select select-ghost bg-base-100 justify-center focus:outline-none text-center "
        >
          <option value="sort" disabled hidden>
            Sort By
          </option>
          <option value="completed">Completed Tasks</option>
          <option value="incompleted">Incomplete Tasks</option>
          <option value="created">Created At</option>
        </select>
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}

export default Tasks
