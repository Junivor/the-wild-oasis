import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {duplicateCabin as duplicateCabinApi} from "../../services/apiCabins.js";

export function useDuplicateCabin() {
    const queryClient = useQueryClient()

    const {
        isPending: isDuplicating,
        mutate: duplicateCabin
    } = useMutation({
        mutationFn: duplicateCabinApi,
        onSuccess: () => {
            toast.success("Cabin duplicated successfully!")
            queryClient.invalidateQueries({active: true})
        },
        onError: error => toast.error(error.message)
    })

    return { isDuplicating, duplicateCabin }
}