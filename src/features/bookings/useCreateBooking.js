import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createBooking as createBookingApi} from "../../services/apiBookings.js";

export function useCreateBooking() {
    const queryClient = useQueryClient()

    const {
        isPending: isCreating,
        mutate: createBooking
    } = useMutation({
        mutationFn: createBookingApi,
        onSuccess: () => {
            toast.success("Booking created successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isCreating, createBooking }
}