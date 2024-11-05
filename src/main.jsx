import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import NurseList from './pages/Nurse/NurseList'
import AddNurse from './pages/Nurse/AddNurse'
import UpdateNurse from './pages/Nurse/UpdateNurse'
import WardList from './pages/Ward/WardList'
import AddWard from './pages/Ward/AddWard'
import UpdateWard from './pages/Ward/UpdateWard'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/nurse",
    element: <NurseList />
  },
  {
    path: "/add-nurse",
    element: <AddNurse />
  },
  {
    path: "nurse/update-nurse/:nurseId",
    element: <UpdateNurse />
  },
  {
    path: "/ward",
    element: <WardList />
  },
  {
    path: "/add-ward",
    element: <AddWard />
  },
  {
    path: "ward/update-ward/:wardId",
    element: <UpdateWard />
  }
 
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
