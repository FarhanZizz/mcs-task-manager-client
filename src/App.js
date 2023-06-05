import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import MainLayout from "./Layout/MainLayout"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

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
      ],
    },
  ])
  return (
    <div className="p-6">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
