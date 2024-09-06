import { memo } from "react"
import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 16, height = 16, ...rest } = props
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M16.95 7.5L11.5167 12.9333C10.875 13.575 9.825 13.575 9.18333 12.9333L3.75 7.5"
        stroke="#181A1A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const DownArrowIcon = memo(Component)
