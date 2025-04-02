import { BookingFooter } from "@/modules/Booking/pages/CreateBookingPage/CreateBookingFooter"
import { CreatePetFooter } from "@/modules/Pets/pages/CreatePage/CreatePetFooter"
import { UpdatePetFooter } from "@/modules/Pets/pages/UpdatePage/UpdatePetFooter"
import { ViewPetFooter } from "@/modules/Pets/pages/ViewPage/ViewPetFooter"

export type AppRoutes = {
  home: string
  notFound: string
  categories: string
  rooms: string
  clients: string
  client: (id: string | number) => string
  booking: (bookingId: string | number) => string
  createPet: (clientId: string | number, petType: string) => string
  updatePet: (clientId: string | number, petId: string | number) => string
  pet: (clientId: string | number, petId: string | number) => string
  authorization: string
  createBooking: string
  bookings: string
}

export const APP_ROUTES: AppRoutes = {
  home: "/",
  notFound: "*",
  categories: "/categories",
  rooms: "/rooms",
  clients: "/clients",
  client: id => `/clients/${id}`,
  booking: bookingId => `/booking/${bookingId}`,
  createPet: (clientId, petType) =>
    `/clients/${clientId}/pets/${petType}/create`,
  updatePet: (clientId, petId) => `/clients/${clientId}/pets/${petId}/update`,
  pet: (clientId, petId) => `/clients/${clientId}/pets/${petId}`,
  authorization: "/authorization",
  createBooking: "/create-booking",
  bookings: "/bookings",
}

export const FooterMap = new Map<keyof AppRoutes, () => JSX.Element>([
  ["booking", BookingFooter],
  ["createPet", CreatePetFooter],
  ["createBooking", BookingFooter],
  ["pet", ViewPetFooter],
  ["updatePet", UpdatePetFooter],
])
