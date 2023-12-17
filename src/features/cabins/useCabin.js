import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getCabin} from "../../services/apiCabins.js";

export function useCabin() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("selected")

    const {
        isLoading,
        data: cabin
    } = useQuery({
        queryFn: () => getCabin(id),
        queryKey: ["cabins", id]
    })

    return {isLoading, cabin}
}