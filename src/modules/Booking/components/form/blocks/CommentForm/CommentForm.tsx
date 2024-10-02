import {
  IBookingForm,
  IComment,
} from "@/modules/Booking/model/types/BookingValidationSchema"
import { TextField } from "@/shared/ui/TextField"
import { DeepPartial, UseFormReturn } from "react-hook-form"

interface CommentFormProps {
  form: UseFormReturn<IComment>
  bookingData: DeepPartial<IBookingForm>
}

export const CommentForm = (props: CommentFormProps) => {
  const { form } = props
  const { register } = form
  return (
    <TextField
      id="comment"
      placeholder="Комментарий"
      label="Комментарий"
      isTextarea
      width={541}
      {...register("comment")}
    />
  )
}
