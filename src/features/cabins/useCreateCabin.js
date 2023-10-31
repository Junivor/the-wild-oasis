import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAndEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createAndEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created")
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })
        },
        onError: error => toast.error(error)
    })

    return { isCreating, createCabin }
}

