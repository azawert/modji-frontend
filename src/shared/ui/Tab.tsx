import { Chip, SxProps } from "@mui/material"
import { useMemo } from "react"

type TProps = {
  isSelected?: boolean
  onChangeTab: () => void
  label: string
}

export const Tab = ({ onChangeTab, label, isSelected }: TProps) => {
  const getCorrectStylesForTab = useMemo((): SxProps => {
    const defaultSx: SxProps = {
      padding: "12px 6px",
      borderRadius: "16px",
      ":hover": undefined,
    }
    if (isSelected) {
      return {
        ...defaultSx,
        border: "none",
        color: "#0145AB",
        backgroundColor: "#D5E1FF",
      }
    } else {
      return {
        ...defaultSx,
        color: "black",
        border: "2px solid #D5E1FF",
        backgroundColor: "transparent",
      }
    }
  }, [isSelected])

  return (
    <Chip onClick={onChangeTab} label={label} sx={getCorrectStylesForTab} />
  )
}
