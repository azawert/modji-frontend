import { BookingDto, NewBookingDto } from "@/generated/bookings"
import { IBookingForm } from "./types/BookingValidationSchema"

export const mapperBookingDTOToFormData = (
  data: BookingDto
): IBookingForm | undefined => {
  if (!data) return
  return {
    petIds: data.pets?.map(pet => pet.id!) || [],
    dateFrom: data.checkInDate,
    dateTo: data.checkOutDate,
    timeFrom: data.checkInTime!,
    timeTo: data.checkOutTime!,
    pricePerDay: data.price,
    fullPrice: data.amount || 0,
    prepayment: data.prepaymentAmount,
    isPrepaymentPaid: data.isPrepaid,
    categories: data.room.Category?.name || "",
    rooms: data.room.number,
    daysAmount: data.daysOfBooking || 0,
    comment: data.comment || "",
  }
}

export const mapperBookingFormDataToDTO = (
  data: IBookingForm
): NewBookingDto => {
  return {
    checkInDate: data.dateFrom,
    checkOutDate: data.dateTo,
    checkInTime: data.timeFrom,
    checkOutTime: data.timeTo,
    price: data.pricePerDay,
    amount: data.pricePerDay * (data.daysAmount || 1),
    prepaymentAmount: data.prepayment,
    isPrepaid: data.isPrepaymentPaid,
    roomId: Number(data.rooms[0]),
    type: "TYPE_BOOKING",
    petIds: data.petIds,
  }
}
