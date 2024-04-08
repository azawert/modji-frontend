import { memo } from "react"
import { TIconProps } from "./types"

const Component: React.FC<TIconProps> = props => {
  const { width = 32, height = 32, ...rest } = props
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
        d="M16.84 9.95939L11.3667 15.7527C11.16 15.9727 10.96 16.4061 10.92 16.7061L10.6733 18.8661C10.5867 19.6461 11.1467 20.1794 11.92 20.0461L14.0667 19.6794C14.3667 19.6261 14.7867 19.4061 14.9933 19.1794L20.4667 13.3861C21.4133 12.3861 21.84 11.2461 20.3667 9.85272C18.9 8.47272 17.7867 8.95939 16.84 9.95939Z"
        stroke="#181A1A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9267 10.926C16.2134 12.766 17.7067 14.1727 19.56 14.3594"
        stroke="#181A1A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22.2261H22"
        stroke="#181A1A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const EditIcon = memo(Component)
