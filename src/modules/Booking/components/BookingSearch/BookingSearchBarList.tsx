import { FC } from "react";
import { BookingDt } from "./BookingType";
import { BookingSearchItem } from "./BookingSearchBarItem";

interface BookingSearchListProps {
    Bookings: BookingDt[];
}

export const BookingSearchList: FC<BookingSearchListProps> = ({ Bookings }) => {
    return (
        <div>
            {Bookings.map(Booking =>
                <BookingSearchItem Booking={Booking} />
            )}
        </div>
    );
}
