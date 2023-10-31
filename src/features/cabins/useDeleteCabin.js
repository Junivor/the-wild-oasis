import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const clientQuery = useQueryClient()

    const {
        isPending: isDeleting,
        mutate: deleteCabin
    } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Cabin successfully deleted")

            clientQuery.invalidateQueries({
                queryKey: ["cabins"]
            })
        },
        onError: error => toast.error(error.message)
    })

    return { isDeleting, deleteCabin }
}