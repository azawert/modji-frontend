import { CategoriesPage } from "@/modules/Categories/pages/CategoriesPage"
import { EmployeePage } from "@/modules/Employee"
import { PageNotFound } from "@/modules/NotFound/pages/PageNotFound"
import { RoomsPage } from "@/modules/Rooms/pages/RoomsPage"
import { AuthorizationPage } from "@/modules/Authorization/pages/AuthorizationPage"
import { ClientsPage } from "@/modules/Clients/pages/ClientsPage"
import { Layout } from "@/shared/Layout"
import { RouteObject } from "react-router-dom"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmployeePage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "rooms",
        element: <RoomsPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
      },
    ],
  },
  {
    path: '/authorization',
    element: <AuthorizationPage />,
  },
]
