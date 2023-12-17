import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getBookings} from "../../services/apiBookings.js";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get("status") || "all"
    const sortValue = searchParams.get("sortBy") || "startDate-asc"
    const page = +searchParams.get("page") || 1

    const filter = filterValue !== "all"
        ? { field: "status", value: filterValue }
        : null

    const [field, direction] = sortValue.split("-")
    const sort = { field, ascending: direction === "asc" }

    const {
        isLoading,
        data: { count, data: bookings } = {}
    } = useQuery({
        queryFn:() => getBookings({ filter, sort, page }),
        queryKey: ["bookings", filter, sort, page]
    })
    const pageCount = Math.ceil(count / PAGE_SIZE)

    if (page < 1) {
        queryClient.prefetchQuery({
            queryFn:() => getBookings({ filter, sort, page: page - 1 }),
            queryKey: ["bookings", filter, sort, page - 1]
        })
    }

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryFn:() => getBookings({ filter, sort, page: page + 1 }),
            queryKey: ["bookings", filter, sort, page + 1]
        })
    }

    return {isLoading, bookings, count}
}