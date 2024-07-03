
import BookingStepOne from "@/modules/Booking/components/steps/BookingStepOne"
import { PropsForHeader } from "@/widgets/Header/data/data"
import { Header } from "@/widgets/Header/ui/Header"
import { CircularProgress } from "@mui/material"
import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"

export const Layout: FC = () => {
  return (
    <div>
      <div>
        <Header {...PropsForHeader} />
      </div>
      <div className="px-6 py-2">
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
        <BookingStepOne/>
      </div>
    </div>
  )
}
