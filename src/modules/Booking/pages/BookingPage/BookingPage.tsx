import { yupResolver } from "@hookform/resolvers/yup"
import { UseFormReturn, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { PageTitle } from "@/shared/ui/PageTitle"

import { useCreateBooking } from "../../api/mutations"
import { useGetBookingById } from "../../api/queries"
import { CategoryRoomsForm } from "../../components/CreateBooking/form/blocks/CategoryForm/CategoryRoomsForm"
import { CommentForm } from "../../components/CreateBooking/form/blocks/CommentForm/CommentForm"
import { PetOwnerForm } from "../../components/CreateBooking/form/blocks/PetOwnerForm/PetOwnerForm"
import { PriceForm } from "../../components/CreateBooking/form/blocks/PriceForm/PriceForm"
import { ScheduleForm } from "../../components/CreateBooking/form/blocks/ScheduleForm/ScheduleForm"
import { StepTitle } from "../../components/typography/StepTitle/StepTitle"
import {
  ExtendedIPayment,
  FullBookingSchema,
  IBookingForm,
  ICategoryAndRoom,
  IComment,
  IPet,
  IScheduleForm,
} from "../../model/types/BookingValidationSchema"
import { mapperBookingFormDataToDTO } from "../../model/utils"
import useBookingStore from "../../store/BookingStore"
import { BookingPageWrapper } from "../CreateBookingPage/CreateBookingPage"

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

export const BookingPage = () => {
  const { bookingId } = useParams()
  const { data, isLoading } = useGetBookingById(Number(bookingId))
  const setBookingData = useBookingStore(state => state.setBookingData)
  const { mutate: createBooking, isSuccess } = useCreateBooking()

  const form = useForm({
    resolver: yupResolver(FullBookingSchema),
    defaultValues: defaultValues,
    values: data as IBookingForm,
  })

  const onSubmit = (bookingData: IBookingForm) => {
    const data = mapperBookingFormDataToDTO(bookingData)
    createBooking(data)
    if (isSuccess) {
      setBookingData(defaultValues)
    }
  }

  if (isLoading) return <div className="">Загрузка бронирования...</div>

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="booking">
      <PageTitle title="Бронирование" />

      <BookingPageWrapper>
        <div>
          <StepTitle title="Клиент и питомцы" />
          <PetOwnerForm
            isCreateBookingPage
            form={form as unknown as UseFormReturn<IPet>}
            bookingData={data!}
          />
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
