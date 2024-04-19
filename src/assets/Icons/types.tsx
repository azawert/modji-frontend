import { SVGProps } from "react"
import { PlusIcon } from "./PlusIcon"
import { EditIcon } from "./EditIcon"
import { DeleteIcon } from "./DeleteIcon"
import { ErrorIcon } from "./ErrorIcon"
import { SuccessIcon } from "./SuccessIcon"
import { WarningIcon } from "./WarningIcon"

export type TIcon =
  | "PlusIcon"
  | "EditIcon"
  | "DeleteIcon"
  | "ErrorIcon"
  | "SuccessIcon"
  | "WarningIcon"

export type TIconProps = SVGProps<SVGSVGElement>

export const iconTypes = new Map<TIcon, JSX.Element>([
  ["PlusIcon", <PlusIcon key={"PlusIcon"} />],
  ["EditIcon", <EditIcon key={"EditIcon"} />],
  ["DeleteIcon", <DeleteIcon key={"DeleteIcon"} />],
  ["ErrorIcon", <ErrorIcon key={"ErrorIcon"} />],
  ["SuccessIcon", <SuccessIcon key={"SuccessIcon"} />],
  ["WarningIcon", <WarningIcon key={"WarningIcon"} />],
])
