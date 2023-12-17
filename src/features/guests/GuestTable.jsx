import Table from "../../ui/Table.jsx";
import {useGuests} from "./useGuests.js";
import Spinner from "../../ui/Spinner.jsx";
import GuestRow from "./GuestRow.jsx";
import Pagination from "../../ui/Pagination.jsx";

function GuestTable() {
    const { isLoading, guests, count } = useGuests()

    if (isLoading) return <Spinner />
    return (
        <Table columns={"1.5fr 1.5fr 1.5fr 1fr 0.2fr"}>
            <Table.Header>
                <div>Name</div>
                <div>Email</div>
                <div>National</div>
                <div>National Id</div>
                <div></div>
            </Table.Header>

            <Table.Body
                data={guests}
                render={guest => <GuestRow key={guest.id} guest={guest}/>}
            />

            <Table.Footer>
                <Pagination count={count}/>
            </Table.Footer>
        </Table>
    );
}

export default GuestTable;