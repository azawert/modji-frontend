import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"
import { Layout } from "@/shared/ui/Layouts/Layout"
import { LayoutWithFooter } from "@/shared/ui/Layouts/LayoutWithFooter"

const CategoriesPage = lazy(() =>
  import("@/modules/Categories/pages/CategoriesPage").then(module => ({
    default: module.CategoriesPage,
  }))
)
const EmployeePage = lazy(() =>
  import("@/modules/Employee").then(module => ({
    default: module.EmployeePage,
  }))
)
const PageNotFound = lazy(() =>
  import("@/modules/NotFound/pages/PageNotFound").then(module => ({
    default: module.PageNotFound,
  }))
)
const RoomsPage = lazy(() =>
  import("@/modules/Rooms/pages/RoomsPage").then(module => ({
    default: module.RoomsPage,
  }))
)
const AuthorizationPage = lazy(() =>
  import("@/modules/Authorization/pages/AuthorizationPage").then(module => ({
    default: module.AuthorizationPage,
  }))
)
const ClientsPage = lazy(() =>
  import("@/modules/Clients/pages/ClientsPage").then(module => ({
    default: module.ClientsPage,
  }))
)
const BookingPage = lazy(() =>
  import("@/modules/Booking/pages/BookingPage/BookingPage").then(module => ({
    default: module.BookingPage,
  }))
)
const CreateBookingPage = lazy(() =>
  import("@/modules/Booking/pages/CreateBookingPage/CreateBookingPage").then(
    module => ({
      default: module.CreateBookingPage,
    })
  )
)
const ClientPage = lazy(() =>
  import("@/modules/Clients/pages/ClientPage.tsx").then(module => ({
    default: module.ClientPage,
  }))
)

const LazyLoadWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
)

//TODO: вынести все path в общий объект, чтобы избежать опечаток в будущем
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <LazyLoadWrapper>
            <EmployeePage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "*",
        element: (
          <LazyLoadWrapper>
            <PageNotFound />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "categories",
        element: (
          <LazyLoadWrapper>
            <CategoriesPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "rooms",
        element: (
          <LazyLoadWrapper>
            <RoomsPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "clients",
        element: (
          <LazyLoadWrapper>
            <ClientsPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "booking/:bookingId",
        element: (
          <LazyLoadWrapper>
            <BookingPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: "clients/:id",
        element: (
          <LazyLoadWrapper>
            <ClientPage />
          </LazyLoadWrapper>
        ),
      },
    ],
  },
  {
    path: "/authorization",
    element: (
      <LazyLoadWrapper>
        <AuthorizationPage />
      </LazyLoadWrapper>
    ),
  },
  {
    path: "/create-booking",
    element: <LayoutWithFooter />,
    children: [
      {
        element: (
          <LazyLoadWrapper>
            <CreateBookingPage />
          </LazyLoadWrapper>
        ),
        path: "",
      },
    ],
  },
]
