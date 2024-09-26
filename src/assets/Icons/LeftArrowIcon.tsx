import { TIconProps } from "./types"

export const LeftArrowIcon: React.FC<TIconProps> = props => {
  const { height = 13, ...rest } = props
  return (
    <svg
      width="16"
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10.5 13.5L5.90683 8.97222C5.36439 8.4375 5.36439 7.5625 5.90683 7.02778L10.5 2.5"
        stroke="#181A1A"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
