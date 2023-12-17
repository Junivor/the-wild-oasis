import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import {useNavigate} from "react-router-dom";

export function useDeleteBooking() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        isPending: isDeleting,
        mutate: deleteBooking
    } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success(`Booking deleted successfully!`)
            queryClient.invalidateQueries({active: true})
            navigate("/bookings")
        },
        onError: error => toast.error(error.message)
    })

    return {isDeleting, deleteBooking}
}