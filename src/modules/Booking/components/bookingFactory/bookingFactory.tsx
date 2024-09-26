import useBookingStore from "../../store/BookingStore"
import BookingScreen1 from "../steps/BookingScreen1"
import BookingScreen2 from "../steps/BookingScreen2"
import BookingScreen3 from "../steps/BookingScreen3"
import BookingScreen4 from "../steps/BookingScreen4"
import BookingScreen5 from "../steps/BookingScreen5"

export const BookingFactory = () => {
  const bookingStep = useBookingStore(state => state.bookingStep)

  return (
    <div>
      {bookingStep === 1 && <BookingScreen1 />}
      {bookingStep === 2 && <BookingScreen2 />}
      {bookingStep === 3 && <BookingScreen3 />}
      {bookingStep === 4 && <BookingScreen4 />}
      {bookingStep === 5 && <BookingScreen5 />}
    </div>
  )
}
