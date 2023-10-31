import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";
import {useSearchParams} from "react-router-dom";

export function useCabins() {
    const [searchParams] = useSearchParams()
    const page = +searchParams.get("page") || 1



    const {
        isLoading,
        data: { count, data: cabins} = {},
        error,
    } = useQuery({
        queryKey: ["cabins", page],
        queryFn:() => getCabins({ page }),
    })

    return { isLoading, error, cabins, count }
}