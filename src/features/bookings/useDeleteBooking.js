import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient()

    const {
        mutate: deleteBooking,
        isPending: isDeleting
    } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Cabin successfully deleted")

            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
        },
        onError: error => toast.error(error.message)
    })

    return { deleteBooking, isDeleting }
}