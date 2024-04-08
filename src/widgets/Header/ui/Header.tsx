import AppBar from "@mui/material/AppBar"
import { TPropsForHeader } from "../data/data"
import { Toolbar, Box, IconButton } from "@mui/material"
import userLogo from "../../../assets/userIcon.svg"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { useState } from "react"
import { ETextType, Link } from "./Link"
import { Logo } from "./Logo"

export const Header: React.FC<TPropsForHeader> = ({
  links,
  srcLogo,
  logoTitle,
  handleActiveButtonClick,
}) => {
  const [selectedLink, setSelectedLink] = useState(links[0].label)

  const handleSelectedLink = (link: string) => setSelectedLink(link)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.09)",
        }}
      >
        <Toolbar>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between gap-3">
              <Logo src={srcLogo} logoTitle={logoTitle} />
              {links.map(link => (
                <Link
                  key={link.label}
                  isActive={selectedLink === link.label}
                  textType={ETextType.NORMAL}
                  onClick={() => handleSelectedLink(link.label)}
                  className="mr-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button
                size={EButtonSize.Medium}
                variant={EButtonVariant.Primary}
                fontSize={14}
                fontWeight={700}
                onClick={handleActiveButtonClick}
              >
                Добавить бронирование
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                className="hover:none"
                sx={{ mr: 2 }}
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
