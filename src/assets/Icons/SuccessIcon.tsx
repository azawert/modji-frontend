import { memo } from "react"
import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 40, height = 40, ...rest } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="16" height="16" rx="8" fill="#30D03E" />
      <path
        d="M6.90887 10.7074C6.75519 10.7074 6.6092 10.6459 6.50162 10.5383L4.3271 8.36382C4.10427 8.14099 4.10427 7.77216 4.3271 7.54933C4.54993 7.3265 4.91875 7.3265 5.14158 7.54933L6.90887 9.31662L10.8584 5.36712C11.0812 5.14429 11.45 5.14429 11.6729 5.36712C11.8957 5.58995 11.8957 5.95878 11.6729 6.18161L7.31611 10.5383C7.20854 10.6459 7.06254 10.7074 6.90887 10.7074Z"
        fill="#292D32"
      />
    </svg>
  )
}

export const SuccessIcon = memo(Component)
