import { memo } from "react"
import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 16, height = 16, ...rest } = props
  return (
    <svg
      width={width}
      height={height}
      {...rest}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#757575" />
      <path
        d="M18.885 11.7575L16 14.6425L13.115 11.7575C12.6907 11.3332 12.0968 11.4181 11.7573 11.7575C11.4179 12.0969 11.3331 12.6909 11.7573 13.1151L14.7272 16.085L11.8422 18.97C11.4179 19.2245 11.4179 19.9033 11.7573 20.2428C12.0968 20.5822 12.6907 20.667 13.115 20.2428L16.0848 17.2729L19.0547 20.2428C19.2244 20.5822 19.9032 20.5822 20.2426 20.2428C20.582 19.9033 20.6669 19.3094 20.2426 18.8851L17.3576 16.0001L20.3275 13.0303C20.6669 12.6909 20.582 12.0969 20.2426 11.7575C19.9032 11.4181 19.3092 11.3332 18.885 11.7575Z"
        fill="#181A1A"
      />
    </svg>
  )
}

export const DeletePetIcon = memo(Component)
