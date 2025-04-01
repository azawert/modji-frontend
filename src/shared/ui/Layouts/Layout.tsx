import { BookingFactory } from "@/modules/Booking/components/bookingFactory/bookingFactory"
import { PropsForHeader } from "@/widgets/Header/data/data"
import { Header } from "@/widgets/Header/ui/Header"
import { CircularProgress } from "@mui/material"
import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "@/shared/ui/Footer/Footer"

export const Layout: FC = () => {
  return (
    <>
      <div>
        <Header {...PropsForHeader} />
      </div>
      <div className="px-6 py-2">
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
        <BookingFactory />
      </div>
      <Footer />
    </>
  )
}
