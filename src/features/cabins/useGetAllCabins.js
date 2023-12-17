import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";

export function useGetAllCabins() {
    const {
        isLoading,
        data: {count, data: cabins} = {}
    } = useQuery({
        queryFn: getCabins,
        queryKey: ["cabins"]
    })


    return {isLoading, cabins}
}