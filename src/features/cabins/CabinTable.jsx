import {useCabins} from "./useCabins.js";

import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../ui/Pagination.jsx";

function CabinTable() {
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("discount") || "all"
    const sortValue = searchParams.get("sortBy") || "startDate-asc"


    const {
        isLoading,
        error,
        cabins,
        count
    } = useCabins()

    if (isLoading) return <Spinner />

    let filteredCabins
    switch (filterValue) {
        case "all":
            filteredCabins = cabins
            break
        case "no-discount":
            filteredCabins = cabins.filter(cabin => !cabin.discount)
            break
        case "with-discount":
            filteredCabins = cabins.filter(cabin => cabin.discount)
            break
    }

    const [field, direction] = sortValue.split("-")
    const modifier = direction === 'asc' ? 1 : -1
    let sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier)

    return (
        <Menus>
            <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={cabin => <CabinRow key={cabin.id} cabin={cabin}/>}
                />
                <Table.Footer>
                    <Pagination count={count}/>
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default CabinTable;