import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAndEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/apiAuth.js";

export function useUpdateUser() {
    const queryClient = useQueryClient()

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User account successfully updated")

            queryClient.setQueriesData(["user"], user)

            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        },
        onError: error => toast.error(error)
    })

    return { updateUser, isUpdating }
}