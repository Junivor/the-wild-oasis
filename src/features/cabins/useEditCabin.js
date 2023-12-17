import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {editCabin as editCabinApi} from "../../services/apiCabins.js";

export function useEditCabin() {
    const queryClient = useQueryClient()

    const {
        isPending: isEditing,
        mutate: editCabin
    } = useMutation({
        mutationFn: ({ cabinId, newCabin }) => editCabinApi(cabinId, newCabin),
        onSuccess: data => {
            toast.success(`Cabin #${data.id} edited successfully!`)
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return {isEditing, editCabin}
}