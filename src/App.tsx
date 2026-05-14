/*
 * @Author:FeiFeiSeal
 * @Date:2025-03-28 17:29:51
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-12 14:20:23
 * @Description:
 */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from '@/layouts/Root';
import Home from '@/pages/Home';
import Privacy from "@/pages/Privacy";
import ErrorPage from "./pages/Error";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />}, 
      {path: '/privacy', element: <Privacy/>}
    ]
  }
])

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
