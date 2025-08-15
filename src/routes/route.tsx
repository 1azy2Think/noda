import { lazy } from 'react';
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute";
import Loadable from '../components/layouts/full/shared/loadable/Loadable';
import EmptyPage from '../pages/EmptyPage.js';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../components/layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../components/layouts/blank/BlankLayout')));

/* ****Pages***** */
const Home = Loadable(lazy(() => import('../pages/home/Home')))
const Login = Loadable(lazy(() => import('../pages/login/Login')))
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')))
const Storage = Loadable(lazy(() => import('../pages/storage/Storage')))

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        // element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);


export const routerDev = createBrowserRouter([
  {
    path: "/login",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <Login/>
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/storage",
        element: <Storage />,
      },
    ],
  },
])