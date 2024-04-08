import { SVGProps } from "react"
import { PlusIcon } from "./PlusIcon"
import { EditIcon } from "./EditIcon"
import { DeleteIcon } from "./DeleteIcon"

export type TIcon = "PlusIcon" | "EditIcon" | "DeleteIcon"

export type TIconProps = SVGProps<SVGSVGElement>

export const iconTypes = new Map<TIcon, JSX.Element>([
  ["PlusIcon", <PlusIcon key={"PlusIcon"} />],
  ["EditIcon", <EditIcon key={"EditIcon"} />],
  ["DeleteIcon", <DeleteIcon key={"DeleteIcon"} />],
])
