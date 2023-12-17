import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getCabins} from "../../services/apiCabins.js";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useCabins() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get("discount") || "all"
    const sortValue = searchParams.get("sortBy") || "name-asc"
    const page = +searchParams.get("page") || 1

    const filter = filterValue !== "all"
        ? { field: "discount", value: +(filterValue === "with-discount") } : null

    const [field, ascending] = sortValue.split("-")
    const sort = { field, ascending: ascending === 'asc' }

    const {
        isLoading,
        data: {count, data: cabins} = {}
    } = useQuery({
        queryFn: () => getCabins({ filter, sort, page }),
        queryKey: ["cabins", filter, sort, page]
    })
    const pageCount = Math.ceil(count / PAGE_SIZE)

    if (page < 1) {
        queryClient.prefetchQuery({
            queryFn: () => getCabins({ filter, sort, page: page - 1 }),
            queryKey: ["cabins", filter, sort, page - 1]
        })
    }

    if (page > pageCount) {
        queryClient.prefetchQuery({
            queryFn: () => getCabins({ filter, sort, page: page + 1 }),
            queryKey: ["cabins", filter, sort, page + 1]
        })
    }

    return { isLoading, cabins, count }
}