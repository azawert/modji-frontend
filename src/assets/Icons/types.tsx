import { SVGProps } from "react"

import { CalendarIcon } from "@/assets/Icons/CalendarIcon.tsx"
import { CategoryIcon } from "@/assets/Icons/CategoryIcon.tsx"
import { ClientIcon } from "@/assets/Icons/ClientIcon.tsx"
import { RoomIcon } from "@/assets/Icons/RoomIcon.tsx"
// import { CalendarIcon } from "./CalendarIcon"
import { TeamIcon } from "@/assets/Icons/TeamIcon.tsx"

import { AttentionBlue } from "./AttentionBlue"
import { AttentionRed } from "./AttentionRed"
import { AttentionYellow } from "./AttentionYellow"
import { DeleteIcon } from "./DeleteIcon"
import { DeletePetIcon } from "./DeletePetIcon"
import { DownArrowIcon } from "./DownArrowIcon"
import { EditIcon } from "./EditIcon"
import { ErrorIcon } from "./ErrorIcon"
import { LeftArrowIcon } from "./LeftArrowIcon"
import { PlusIcon } from "./PlusIcon"
import { RightArrowIcon } from "./RightArrowIcon"
import { RoundedPlusIcon } from "./RoundedPlusIcon"
import { SearchIcon } from "./SearchIcon"
import { SuccessIcon } from "./SuccessIcon"
import { WarningIcon } from "./WarningIcon"

export type TIcon =
  | "PlusIcon"
  | "EditIcon"
  | "DeleteIcon"
  | "ErrorIcon"
  | "SuccessIcon"
  | "WarningIcon"
  | "RightArrowIcon"
  | "LeftArrowIcon"
  | "CalendarIcon"
  | "TeamIcon"
  | "RoomIcon"
  | "CategoryIcon"
  | "ClientIcon"
  | "AnimalIcon"
  | "CalendarIcon"
  | "DownArrowIcon"
  | "AttentionYellow"
  | "AttentionBlue"
  | "AttentionRed"
  | "DeletePetIcon"
  | "RoundedPlusIcon"
  | "SearchIcon"
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
  ["CalendarIcon", <CalendarIcon key={"CalendarIcon"} />],
  ["TeamIcon", <TeamIcon key={"TeamIcon"} />],
  ["RoomIcon", <RoomIcon key={"RoomIcon"} />],
  ["CategoryIcon", <CategoryIcon key={"CategoryIcon"} />],
  ["ClientIcon", <ClientIcon key={"ClientIcon"} />],
  ["CalendarIcon", <CalendarIcon key={"CalendarIcon"} />],
  ["DownArrowIcon", <DownArrowIcon key={"DownArrowIcon"} />],
  ["AttentionYellow", <AttentionYellow key={"AttentionYellow"} />],
  ["AttentionBlue", <AttentionBlue key={"AttentionBlue"} />],
  ["AttentionRed", <AttentionRed key={"AttentionRed"} />],
  ["DeletePetIcon", <DeletePetIcon key={"DeletePetIcon"} />],
  ["RoundedPlusIcon", <RoundedPlusIcon key={"RoundedPlusIcon"} />],
  ["SearchIcon", <SearchIcon key={"SearchIcon"} />],
])
