import { TDropdownMenuOption } from "@/widgets/Header/data/data.ts"
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material"
import { Icon } from "@/shared/ui/Icon/Icon.tsx"
import { useNavigate } from "react-router-dom"

export const DropDownMenu = ({
  options,
  isOpen,
  onClose,
}: {
  options: TDropdownMenuOption[]
  isOpen: boolean
  onClose?: () => void
}) => {
  const navigate = useNavigate()

  return (
    isOpen && (
      <Paper
        sx={{
          width: 286,
          position: "absolute",
          left: 0,
          top: "100%",
          zIndex: "1000",
        }}
      >
        <MenuList>
          {options.map(element => (
            <MenuItem
              onClick={() => {
                element.handleLinkClick?.(navigate)
                onClose?.()
              }}
              key={element.label}
            >
              <ListItemIcon>
                <Icon type={element.icon} />
              </ListItemIcon>
              <ListItemText>{element.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    )
  )
}
