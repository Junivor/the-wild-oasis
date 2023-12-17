import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings.js";

export function useCheckin() {
    const queryClient = useQueryClient()

    const {
        isPending: isCheckin,
        mutate: setCheckin
    } = useMutation({
        mutationFn:({ bookingId, breakfast }) =>
            updateBooking(
                bookingId,
                {
                    status: "checked-in",
                    isPaid: true,
                    ...breakfast
                }
            ),
        onSuccess: data => {
            toast.success(`Booking ${data.id} checked successfully!`)
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return {isCheckin, setCheckin}
}