import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings.js";
import {useNavigate} from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {
        isPending: isCheckout,
        mutate: setCheckout
    } = useMutation({
        mutationFn: bookingId =>
            updateBooking(
                bookingId,
                {
                    status: "checked-out"
                }
            ),
        onSuccess: data => {
            toast.success(`Booking ${data.id} checked in successfully!`)
            queryClient.invalidateQueries({active: true})
            navigate("/bookings")
        },
        onError: error => toast.error(error.message)
    })


    return { isCheckout, setCheckout }
}