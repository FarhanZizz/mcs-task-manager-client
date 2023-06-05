import React, { useContext, useState } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import TaskStat from "../Components/TaskStat"
import Task from "../Components/Task"
import { useQuery } from "react-query"

const Tasks = () => {
  const { user } = useContext(AuthContext)
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://mcs-task-management-server.vercel.app/tasks/${user?.uid}`
      )
      const data = await res.json()
      return data
    },
  })

  const [sortValue, setSortValue] = useState("")

  const handleSortChange = (e) => {
    setSortValue(e.target.value)
  }

  const sortTasks = () => {
    switch (sortValue) {
      case "completed":
        return tasks.filter((task) => task.status === true)
      case "incompleted":
        return tasks.filter((task) => task.status === false)
      case "created":
        return [...tasks].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      default:
        return tasks
    }
  }

  const sortedTasks = sortTasks()

  return (
    <div className="grid gap-10 justify-center mt-5">
      <TaskStat tasks={tasks} user={user} refetch={refetch} />
      <div className="bg-[#f7f3f3] grid grid-cols-1 gap-5 rounded-lg p-5">
        <select
          value={sortValue}
          onChange={handleSortChange}
          className="select select-ghost bg-base-100 justify-center focus:outline-none text-center "
        >
          <option value="" disabled hidden>
            Sort By
          </option>
          <option value="completed">Completed Tasks</option>
          <option value="incompleted">Incomplete Tasks</option>
          <option value="created">Created At</option>
        </select>
        {sortedTasks.map((task) => (
          <Task key={task._id} task={task} refetch={refetch} />
        ))}
      </div>
    </div>
  )
}

export default Tasks
