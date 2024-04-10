import { memo } from "react"
import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 40, height = 40, ...rest } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="40" height="40" rx="20" fill="#FF7878" />
      <path
        d="M24.3275 13.636L20 17.9635L15.6725 13.636C15.0361 12.9996 14.1452 13.1269 13.636 13.636C13.1269 14.1451 12.9996 15.0361 13.636 15.6725L18.0908 20.1273L13.7633 24.4548C13.1269 24.8366 13.1269 25.8548 13.636 26.3639C14.1452 26.8731 15.0361 27.0003 15.6725 26.3639L20.1273 21.9092L24.5821 26.3639C24.8366 26.8731 25.8548 26.8731 26.364 26.3639C26.8731 25.8548 27.0004 24.9639 26.364 24.3275L22.0365 20L26.4912 15.5452C27.0004 15.0361 26.8731 14.1451 26.364 13.636C25.8548 13.1269 24.9639 12.9996 24.3275 13.636Z"
        fill="#181A1A"
      />
    </svg>
  )
}

export const ErrorIcon = memo(Component)
