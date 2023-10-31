import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAndEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
    const queryClient = useQueryClient()

    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn:({newCabinData, id}) => createAndEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited")
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })
        },
        onError: error => toast.error(error)
    })

    return { isEditing, editCabin }
}