import { FC } from "react";
import { BookingDt } from "./BookingType";

interface BookingSearchItemProps {
    Booking: BookingDt;
}

export const BookingSearchItem: FC<BookingSearchItemProps> = ({ Booking }) => {
    return (
        <div key={Booking.id} className='p-4 border-indigo-600 mb-1'>
            Кличка: {Booking.PetDt.name}, Хозяин: {Booking.PetDt.ownerShortDt.firstName} {Booking.PetDt.ownerShortDt.lastName}, номер телефона: {Booking.PetDt.ownerShortDt.phoneNumber}
        </div>
    );
}