import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {createGuest as createGuestApi} from "../../services/apiGuests.js";

export function useCreateGuest() {
    const queryClient = useQueryClient()

    const {
        isPending: isCreating,
        mutate: createGuest
    } = useMutation({
        mutationFn: createGuestApi,
        onSuccess: () => {
            toast.success("New guest added successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return {isCreating, createGuest}
}