import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {createCabin as createCabinApi} from "../../services/apiCabins.js";

export function useCreateCabin() {
    const queryClient = useQueryClient()

    const {
        isPending: isCreating,
        mutate: createCabin
    } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
            toast.success("Cabin created successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isCreating, createCabin }
}