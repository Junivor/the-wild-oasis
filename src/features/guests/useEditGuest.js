import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {editGuest as editGuestApi} from "../../services/apiGuests.js";

export function useEditGuest() {
    const queryClient = useQueryClient()

    const {
        isPending: isEditing,
        mutate: editGuest
    } = useMutation({
        mutationFn:({guestId, changedGuest}) => editGuestApi(guestId, changedGuest),
        onSuccess: data => {
            toast.success(`Guest #${data.id} information changed successfully!`)
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return {isEditing, editGuest}
}