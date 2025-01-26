import { TIconProps } from "@/assets/Icons/types.tsx"
import { memo } from "react"

const Component: React.FC<TIconProps> = props => {
  const { width = 16, height = 16, ...rest } = props

  return (
    <svg
      width={width}
      height={height}
      {...rest}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6240_6968)">
        <path
          d="M9.14937 2.34465L10.3227 4.69132C10.4827 5.01798 10.9094 5.33132 11.2694 5.39132L13.396 5.74465C14.756 5.97131 15.076 6.95798 14.096 7.93132L12.4427 9.58465C12.1627 9.86465 12.0094 10.4046 12.096 10.7913L12.5694 12.838C12.9427 14.458 12.0827 15.0846 10.6494 14.238L8.65603 13.058C8.29603 12.8446 7.7027 12.8446 7.33603 13.058L5.3427 14.238C3.91603 15.0846 3.04937 14.4513 3.4227 12.838L3.89603 10.7913C3.9827 10.4046 3.82937 9.86465 3.54937 9.58465L1.89603 7.93132C0.9227 6.95798 1.23603 5.97131 2.59603 5.74465L4.7227 5.39132C5.07603 5.33132 5.5027 5.01798 5.6627 4.69132L6.83603 2.34465C7.47603 1.07132 8.51603 1.07132 9.14937 2.34465Z"
          fill="#FFC107"
          stroke="#181A1A"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6240_6968">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const StarIcon = memo(Component)
