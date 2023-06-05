import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import MainLayout from "./Layout/MainLayout"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Tasks from "./Pages/Tasks"
import { Toaster } from "react-hot-toast"
import PrivateRoute from "./Components/PrivateRoute"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },

        {
          path: "/tasks",
          element: (
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          ),
        },
      ],
    },
  ])
  return (
    <div className="p-2 md:p-6">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
