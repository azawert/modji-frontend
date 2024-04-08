import { EmployeePage } from "@/modules/Employee"
import { Layout } from "@/shared/Layout"
import { Navigate, RouteObject } from "react-router-dom"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmployeePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]
