import { PageTitle } from "@/shared/ui/PageTitle"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  ExtendedIPayment,
  FullBookingSchema,
  IBookingForm,
  ICategoryAndRoom,
  IComment,
  IPet,
  IScheduleForm,
} from "../../model/types/BookingValidationSchema"
import { useForm, UseFormReturn } from "react-hook-form"
import { ScheduleForm } from "../../components/CreateBooking/form/blocks/ScheduleForm/ScheduleForm"
import { CategoryRoomsForm } from "../../components/CreateBooking/form/blocks/CategoryForm/CategoryRoomsForm"
import { PriceForm } from "../../components/CreateBooking/form/blocks/PriceForm/PriceForm"
import { StepTitle } from "../../components/typography/StepTitle/StepTitle"
import useBookingStore from "../../store/BookingStore"
import { CommentForm } from "../../components/CreateBooking/form/blocks/CommentForm/CommentForm"
import { useCreateBooking } from "../../api/mutations"
import { mapperBookingFormDataToDTO } from "../../model/utils"
import { PetOwnerForm } from "../../components/CreateBooking/form/blocks/PetOwnerForm/PetOwnerForm"
import { styled } from "@mui/material"

import {
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"
import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "@/routes/types"

export const BookingPageWrapper = styled("div")(() => ({
  width: "541px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
}))

const defaultValues = {
  categories: "",
  rooms: "",
  dateFrom: "",
  dateTo: "",
  timeFrom: "" as string,
  timeTo: "" as string,
  pricePerDay: 0,
  isPrepaymentPaid: false,
  prepayment: 0,
  comment: "",
  petIds: [],
  daysAmount: 1,
  fullPrice: 0,
}

export const CreateBookingPage = () => {
  const data = useBookingStore(state => state.bookingData)
  const setBookingData = useBookingStore(state => state.setBookingData)
  const { mutate: createBooking, isSuccess, error } = useCreateBooking()
  const navigate = useNavigate()
  const notificateError = addErrorNotification()
  const notificateSuccess = addSuccessNotification()

  const form = useForm({
    resolver: yupResolver(FullBookingSchema),
    defaultValues: defaultValues,
    values: data as IBookingForm,
    mode: "all",
  })

  const onSubmit = async (bookingData: IBookingForm) => {
    const data = mapperBookingFormDataToDTO(bookingData)
    await createBooking(data)
    if (isSuccess) {
      notificateSuccess("Бронирование успешно создано")
      setBookingData(defaultValues)
      navigate(APP_ROUTES.bookings)
    } else {
      notificateError(
        error.response.data.message || "Произошла ошибка, попробуйте ещё раз"
      )
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="booking" className="pb-40">
      <PageTitle title="Бронирование" />

      <BookingPageWrapper>
        <div>
          <StepTitle title="Клиент и питомцы" />
          <PetOwnerForm
            isCreateBookingPage
            form={form as unknown as UseFormReturn<IPet>}
            bookingData={data!}
          />
          {data?.petIds?.length === 0 && (
            <p className="text-center text-error">Выберите питомца!</p>
          )}
        </div>

        <div>
          <StepTitle title="Дата и время бронирования" />
          <ScheduleForm
            bookingData={data!}
            form={form as unknown as UseFormReturn<IScheduleForm>}
          />
        </div>

        <div>
          <StepTitle title="Категория и номер комнаты" />
          <CategoryRoomsForm
            bookingData={data!}
            form={form as unknown as UseFormReturn<ICategoryAndRoom>}
          />
        </div>

        <div>
          <StepTitle title="Стоимость" />
          <PriceForm
            bookingData={data!}
            form={form as unknown as UseFormReturn<ExtendedIPayment>}
          />

          <CommentForm
            bookingData={data!}
            form={form as unknown as UseFormReturn<IComment>}
          />
        </div>
      </BookingPageWrapper>
    </form>
  )
}
