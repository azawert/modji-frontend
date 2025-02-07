import AppBar from "@mui/material/AppBar"
import {
  getDropDownMenuOptions,
  HeaderPageLink,
  TPropsForHeader,
} from "../data/data"
import { Toolbar, Box, IconButton } from "@mui/material"
import userLogo from "../../../assets/userIcon.svg"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { useCallback, useState } from "react"
import { ETextType, Link } from "../../../shared/ui/Link"
import { Logo } from "./Logo"
import useBookingStore from "@/modules/Booking/store/BookingStore"
import { DropDownMenu } from "@/widgets/Dropdown/DropdownMenu.tsx"
import { useLocation, useNavigate } from "react-router-dom"

export const Header: React.FC<TPropsForHeader> = ({ links }) => {
  const [selectedLink, setSelectedLink] = useState(links[0].label)
  const [hoveredLink, setHoveredLink] = useState<string | undefined>(undefined)
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isCreateBookingPage = pathname.includes("create-booking")

  const handleSelectedLink = (link: HeaderPageLink) => {
    setSelectedLink(link.label)
    navigate(link.href)
  }

  const openModal = useBookingStore(state => state.setIsBookingInProgress)
  const setBookingStep = useBookingStore(state => state.setBookingStep)
  const handleHoverOverLink = (link?: string) => {
    if (menuTimeout) {
      clearTimeout(menuTimeout)
      setMenuTimeout(undefined)
    }
    setHoveredLink(link)
    setIsDropdownMenuOpen(true)
  }

  const handleOnMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredLink(undefined)
      setIsDropdownMenuOpen(false)
    }, 200) // Adjust the timeout duration as needed
    setMenuTimeout(timeout)
  }

  const handleOnMenuEnter = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout)
      setMenuTimeout(undefined)
    }
  }

  const handleOnMenuLeave = () => {
    setIsDropdownMenuOpen(false)
    setHoveredLink(undefined)
  }

  const dropdownMenu = getDropDownMenuOptions(hoveredLink)

  const handleCloseDropDown = useCallback(() => {
    setIsDropdownMenuOpen(false)
  }, [])

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
              <Logo />
              <div className=" flex gap-7">
                {links.map(link => (
                  <div
                    key={link.label}
                    onMouseEnter={() => handleHoverOverLink(link.label)}
                    onMouseLeave={handleOnMouseLeave}
                    style={{ position: "relative" }}
                  >
                    <Link
                      isActive={selectedLink === link.label}
                      textType={ETextType.NORMAL}
                      onClick={() => handleSelectedLink(link)}
                    >
                      {link.label}
                    </Link>
                    {isDropdownMenuOpen &&
                      dropdownMenu?.length &&
                      link.label === hoveredLink && (
                        <div
                          onMouseEnter={handleOnMenuEnter}
                          onMouseLeave={handleOnMenuLeave}
                          style={{
                            position: "absolute",
                            top: "100%",
                            marginTop: 8,
                          }}
                        >
                          <DropDownMenu
                            options={dropdownMenu}
                            isOpen={isDropdownMenuOpen}
                            onClose={handleCloseDropDown}
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-8">
              {!isCreateBookingPage && (
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
              )}
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
