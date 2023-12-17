import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {deleteGuest as deleteGuestApi} from "../../services/apiGuests.js";

export function useDeleteGuest() {
    const queryClient = useQueryClient()

    const {
        isPending: isDeleting,
        mutate: deleteGuest
    } = useMutation({
        mutationFn: deleteGuestApi,
        onSuccess: () => {
            toast.success("Guest deleted successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isDeleting, deleteGuest }
}