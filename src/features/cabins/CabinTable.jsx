
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";
import Menus from "../../ui/Menus.jsx";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";
import Empty from "../../ui/Empty.jsx";
import {useCabins} from "./useCabins.js";

function CabinTable() {
    const { isLoading, cabins, count } = useCabins()

    if (isLoading) return <Spinner />
    if (!cabins.length) return <Empty resourceName={"cabins"}/>

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
                    data={cabins}
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