import { PropsForHeader } from "@/widgets/Header/data/data"
import { Header } from "@/widgets/Header/ui/Header"
import { CircularProgress } from "@mui/material"
import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"

export const LayoutBookingGrid: FC = () => {
  return (
    <div>
      <div>
        <Header {...PropsForHeader} />
      </div>
      <div>
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
