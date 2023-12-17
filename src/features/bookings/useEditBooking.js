import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {updateBooking as updateBookingApi} from "../../services/apiBookings.js";

export function useEditBooking() {
    const queryClient = useQueryClient()

    const {
        isPending: isEditing,
        mutate: editBooking
    } = useMutation({
        mutationFn: ({ bookingId, updatedData }) =>
            updateBookingApi(
                bookingId,
                {
                    ...updatedData,
                    isPaid: false,
                    status: "unconfirmed",
                }
            ),
        onSuccess: (data) => {
            toast.success(`Booking edited successfully!`)
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isEditing, editBooking }
}