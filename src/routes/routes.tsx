import { CategoriesPage } from "@/modules/Categories/pages/CategoriesPage"
import { EmployeePage } from "@/modules/Employee"
import { PageNotFound } from "@/modules/NotFound/pages/PageNotFound"
import { RoomsPage } from "@/modules/Rooms/pages/RoomsPage"
import { AuthorizationPage } from "@/modules/Authorization/pages/AuthorizationPage"
import { ClientsPage } from "@/modules/Clients/pages/ClientsPage"
import { Layout } from "@/shared/ui/Layouts/Layout"
import { RouteObject } from "react-router-dom"
import { BookingPage } from "@/modules/Booking/pages/BookingPage/BookingPage"
import { CreateBookingPage } from "@/modules/Booking/pages/CreateBookingPage/CreateBookingPage"
import { ClientPage } from "@/modules/Clients/pages/ClientPage.tsx"
import { LayoutWithFooter } from "@/shared/ui/Layouts/LayoutWithFooter"

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
      {
        path: "booking/:bookingId",
        element: <BookingPage />,
      },
      {
        path: "clients/:id",
        element: <ClientPage />,
      },
    ],
  },
  {
    path: "/authorization",
    element: <AuthorizationPage />,
  },
  {
    path: "/create-booking",
    element: <LayoutWithFooter />,
    children: [
      {
        element: <CreateBookingPage />,
        path: "",
      },
    ],
  },
]

export enum ROUTES {
  AUTHORIZATION = "/authorization",
  CLIENTS = "/clients",
  SINGLECLIENT = "/clients/:id",
}
