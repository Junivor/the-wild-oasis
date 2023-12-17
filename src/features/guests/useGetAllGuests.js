import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getGuests} from "../../services/apiGuests.js";

export function useGetAllGuests() {

    const {
        isLoading,
        data: { data: guests } = {}
    } = useQuery({
        queryFn: getGuests,
        queryKey: ["guests"]
    })

    return {isLoading, guests}
}