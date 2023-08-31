import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"

import Login from "./user/components/Login"
import AdminLogin from "./admin/pages/Login"
import Register from "./user/components/Register"
import HomePage from "./user/pages/HomePage"
import { store, persistor } from "./user/utils/store/store"
import ProfilePage from "./user/pages/ProfilePage"
import UserPage from "./admin/pages/UserPage"
import Dash from "./admin/pages/Dash"
import SettingsPage from "./user/pages/SettingsPage"
import ReportsPage from "./admin/pages/ReportsPage"
// import CreatePost from "./user/components/CreatePost"





const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Register />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: "/admin/dash",
    element: <Dash/>
  },
  {
    path: "/admin/users",
    element: <UserPage/>
  },
  {
    path: "/settings",
    element: <SettingsPage/>
  },
  {
    path: "/admin/reports",
    element: <ReportsPage/>
  },
  
  
])




function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <RouterProvider router={router} />
        </PersistGate>
      </Provider >
    </>
  )
}

export default App
