import {useQuery} from "@tanstack/react-query";
import {useParams, useSearchParams} from "react-router-dom";
import {getBooking} from "../../services/apiBookings.js";

export function useBooking() {
    const {bookingId} = useParams()


    const {
        isLoading,
        data: booking
    } = useQuery({
        queryFn:() => getBooking(bookingId),
        queryKey: ["bookings", bookingId]
    })

    return {isLoading, booking}
}