import { memo } from "react"

import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 16, height = 16, ...rest } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#757575" />
      <path
        d="M12 16H20"
        stroke="#181A1A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 20V12"
        stroke="#181A1A"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export const RoundedPlusIcon = memo(Component)
