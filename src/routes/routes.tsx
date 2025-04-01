import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"
import { CreatePetPage, PetPage } from "@/modules/Pets"
import { BookingGridPage } from "@/modules/Booking/pages/BookingGridPage/BookingGridPage"
import { Layout } from "@/shared/ui/Layouts/Layout"
import { CreateBookingPage } from "@/modules/Booking/pages/CreateBookingPage/CreateBookingPage"
import { APP_ROUTES } from "./types"
import { UpdatePetPage } from "@/modules/Pets/pages/UpdatePage/UpdatePetPage"

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
const ClientPage = lazy(() =>
  import("@/modules/Clients/pages/ClientPage.tsx").then(module => ({
    default: module.ClientPage,
  }))
)

const LazyLoadWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
)

export const routes: RouteObject[] = [
  {
    path: APP_ROUTES.home,
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
        path: APP_ROUTES.notFound,
        element: (
          <LazyLoadWrapper>
            <PageNotFound />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.categories,
        element: (
          <LazyLoadWrapper>
            <CategoriesPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.rooms,
        element: (
          <LazyLoadWrapper>
            <RoomsPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.clients,
        element: (
          <LazyLoadWrapper>
            <ClientsPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.booking(":bookingId"),
        element: (
          <LazyLoadWrapper>
            <BookingPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.client(":id"),
        element: (
          <LazyLoadWrapper>
            <ClientPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.createPet(":id", ":petType"),
        element: <CreatePetPage />,
      },
      {
        path: APP_ROUTES.updatePet(":id", ":petId"),
        element: <UpdatePetPage />,
      },
      {
        path: APP_ROUTES.pet(":id", ":petId"),
        element: <PetPage />,
      },
      {
        path: APP_ROUTES.createBooking,
        element: (
          <LazyLoadWrapper>
            <CreateBookingPage />
          </LazyLoadWrapper>
        ),
      },
      {
        path: APP_ROUTES.bookings,
        element: (
          <LazyLoadWrapper>
            <BookingGridPage />
          </LazyLoadWrapper>
        ),
      },
    ],
  },
  {
    path: APP_ROUTES.authorization,
    element: (
      <LazyLoadWrapper>
        <AuthorizationPage />
      </LazyLoadWrapper>
    ),
  },
]
