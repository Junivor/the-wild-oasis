import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getGuests} from "../../services/apiGuests.js";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useGuests() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const page = +searchParams.get("page") || 1

    const {
        isLoading,
        data: {count, data: guests} = {}
    } = useQuery({
        queryFn:() => getGuests({page}),
        queryKey: ["guests", page]
    })
    const pageCount = Math.ceil(count / PAGE_SIZE)

    if (page > 1) {
        queryClient.prefetchQuery({
            queryFn:() => getGuests({page: page - 1}),
            queryKey: ["guests", page - 1]
        })
    }

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryFn:() => getGuests({page: page + 1}),
            queryKey: ["guests", page + 1]
        })
    }

    return {isLoading, guests, count}
}