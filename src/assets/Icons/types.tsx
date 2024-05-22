import { SVGProps } from "react"
import { PlusIcon } from "./PlusIcon"
import { EditIcon } from "./EditIcon"
import { DeleteIcon } from "./DeleteIcon"
import { ErrorIcon } from "./ErrorIcon"
import { SuccessIcon } from "./SuccessIcon"
import { WarningIcon } from "./WarningIcon"
import { RightArrowIcon } from "./RightArrowIcon"
import { LeftArrowIcon } from "./LeftArrowIcon"

export type TIcon =
  | "PlusIcon"
  | "EditIcon"
  | "DeleteIcon"
  | "ErrorIcon"
  | "SuccessIcon"
  | "WarningIcon"
  | "RightArrowIcon"
  | "LeftArrowIcon"

export type TIconProps = SVGProps<SVGSVGElement>

export const iconTypes = new Map<TIcon, React.JSX.Element>([
  ["PlusIcon", <PlusIcon key={"PlusIcon"} />],
  ["EditIcon", <EditIcon key={"EditIcon"} />],
  ["DeleteIcon", <DeleteIcon key={"DeleteIcon"} />],
  ["ErrorIcon", <ErrorIcon key={"ErrorIcon"} />],
  ["SuccessIcon", <SuccessIcon key={"SuccessIcon"} />],
  ["WarningIcon", <WarningIcon key={"WarningIcon"} />],
  ["RightArrowIcon", <RightArrowIcon key={"RightArrowIcon"} />],
  ["LeftArrowIcon", <LeftArrowIcon key={"LeftArrowIcon"} />],
])
