import { Controller, DeepPartial, UseFormReturn } from "react-hook-form"

import { TextField } from "@/shared/ui/Inputs/TextField/TextField"

import {
  IBookingForm,
  IComment,
} from "@/modules/Booking/model/types/BookingValidationSchema"

interface CommentFormProps {
  form: UseFormReturn<IComment>
  bookingData: DeepPartial<IBookingForm>
}

export const CommentForm = (props: CommentFormProps) => {
  const { form } = props
  const { control } = form
  return (
    <Controller
      control={control}
      name={"comment"}
      render={({ field }) => (
        <TextField
          id="comment"
          placeholder="Комментарий"
          label="Комментарий"
          isTextarea
          width={541}
          {...field}
        />
      )}
    />
  )
}
