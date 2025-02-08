import { create } from "zustand"
import { IBookingForm } from "../model/types/BookingValidationSchema"
import { DeepPartial } from "react-hook-form"
import { OwnerDto } from "@/generated/owners"

interface IBookingStore {
  isCreateShortPet: boolean
  isCreateShortClient: boolean
  isBookingInProgress: boolean
  bookingStep: number
  bookingData: DeepPartial<IBookingForm>
  owner: OwnerDto | null
  setIsCreateShortClient: (value: boolean) => void
  setIsBookingInProgress: (value: boolean) => void
  setBookingStep: (value: number) => void
  setSpecificBookingData: (value: string, setter: string) => void
  setBookingData: (value: DeepPartial<IBookingForm>) => void
  setOwner: (value: OwnerDto) => void
  setIsCreateShortPet: (value: boolean) => void
}

const useBookingStore = create<IBookingStore>(set => ({
  isCreateShortClient: false,
  isCreateShortPet: false,
  isBookingInProgress: false,
  bookingStep: 1,
  owner: null,
  bookingData: {
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    categories: "",
    rooms: "",
    prepayment: 0,
    pricePerDay: 0,
    isPrepaymentPaid: false,
    comment: "",
    petIds: [],
    fullPrice: 0,
    daysAmount: 1,
  } as DeepPartial<IBookingForm>,
  setIsCreateShortClient: value => set({ isCreateShortClient: value }),
  setIsCreateShortPet: value => set({ isCreateShortPet: value }),
  setIsBookingInProgress: value => set({ isBookingInProgress: value }),
  setOwner: value => set({ owner: value }),
  setBookingStep: value => set({ bookingStep: value }),
  setSpecificBookingData: (value, setter) =>
    set(state => ({
      bookingData: {
        ...state.bookingData,
        [setter]: value,
      },
    })),
  setBookingData: value => set({ bookingData: value }),
}))

export default useBookingStore
