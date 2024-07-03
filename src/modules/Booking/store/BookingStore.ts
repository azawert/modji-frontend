import { create } from 'zustand'

const useBookingStore = create((set) => ({
  isBookingInProgress: false,

  setIsBookingInProgress: (value: boolean) => set({ isBookingInProgress: value }),

}))

export default useBookingStore