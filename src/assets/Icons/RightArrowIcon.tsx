import { TIconProps } from "./types"

export const RightArrowIcon: React.FC<TIconProps> = props => {
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
        d="M5.5 13.5L10.0932 8.97222C10.6356 8.4375 10.6356 7.5625 10.0932 7.02778L5.5 2.5"
        stroke="#181A1A"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
