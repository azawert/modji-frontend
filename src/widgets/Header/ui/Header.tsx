import AppBar from "@mui/material/AppBar"
import { TPropsForHeader } from "../data/data"
import { Toolbar, Box, IconButton } from "@mui/material"
import userLogo from "../../../assets/userIcon.svg"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { useState } from "react"
import { ETextType, Link } from "../../../shared/ui/Link"
import { Logo } from "./Logo"
import useBookingStore from "@/modules/Booking/store/BookingStore"

export const Header: React.FC<TPropsForHeader> = ({
  links,
  srcLogo,
  logoTitle,
}) => {
  const [selectedLink, setSelectedLink] = useState(links[0].label)

  const handleSelectedLink = (link: string) => setSelectedLink(link)

  const openModal = useBookingStore(state => state.setIsBookingInProgress)
  const setBookingStep = useBookingStore(state => state.setBookingStep)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          height: "92px",
          backgroundColor: "white",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.09)",
          justifyContent: "center",
        }}
      >
        <Toolbar className="px-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between">
              <Logo src={srcLogo} logoTitle={logoTitle} />
              <div className=" flex gap-7">
                {links.map(link => (
                  <Link
                    isActive={selectedLink === link.label}
                    textType={ETextType.NORMAL}
                    onClick={() => handleSelectedLink(link.label)}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              <Button
                size={EButtonSize.Medium}
                variant={EButtonVariant.Primary}
                fontSize={14}
                fontWeight={700}
                onClick={() => {
                  setBookingStep(1)
                  openModal(true)
                }}
              >
                Добавить бронирование
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  padding: 0,
                }}
              >
                <img src={userLogo} />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
