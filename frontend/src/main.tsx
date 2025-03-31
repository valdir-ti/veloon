import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'

import App from './App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import History from './pages/History.tsx'
import Layout from './pages/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/historico',
        element: <History />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registro',
    element: <Register />,
  },
]);


const root = document.getElementById('root')
ReactDOM.createRoot(root!).render(
  <RouterProvider router={router} />
)
