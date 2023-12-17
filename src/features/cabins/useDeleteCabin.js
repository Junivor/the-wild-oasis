import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";

export function useDeleteCabin() {
    const queryClient = useQueryClient()

    const {
        isPending: isDeleting,
        mutate: deleteCabin
    } = useMutation({
        mutationFn: ({cabinId, imageUrl}) => deleteCabinApi(cabinId, imageUrl),
        onSuccess: () => {
            toast.success("Cabin deleted successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isDeleting, deleteCabin }
}