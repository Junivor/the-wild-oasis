import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";


export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get("status")
    const filter = !filterValue || filterValue === "all"
        ? null : { field: "status", value: filterValue }

    const sortValue = searchParams.get("sortBy") || "startDate-desc"
    const [field, direction] = sortValue.split("-")
    const sort = { field, direction }

    const page = +searchParams.get("page") || 1

    const {
        isLoading,
        data: { count, data: bookings } = {},
        error
    } = useQuery({
        queryKey: ["bookings", filter, sort, page],
        queryFn:() => getBookings({ filter, sort, page })
    })
    const pageCount = Math.ceil(count / page)

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page + 1],
            queryFn:() => getBookings({ filter, sort, page: page + 1 })
        })
    }

    if (page >= 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page - 1],
            queryFn:() => getBookings({ filter, sort, page: page - 1 })
        })
    }

    return { isLoading, error, bookings, count }
}

