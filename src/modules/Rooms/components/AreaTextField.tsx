import { TextField } from "@/shared/ui/TextField"
import { Controller, UseFormReturn } from "react-hook-form"
import { TRoomCreateForm } from "../pages/RoomsPage"

type TAreaTextFieldProps = {
  form: UseFormReturn<TRoomCreateForm>
  name: "area"
}

export const AreaTextField: React.FC<TAreaTextFieldProps> = ({
  form,
  name,
}) => {
  const { control } = form

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          id={name}
          placeholder="Площадь"
          label="Площадь"
          marginBottom="16px"
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}
