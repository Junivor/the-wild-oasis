import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import GuestTable from "../features/guests/GuestTable.jsx";
import AddGuest from "../features/guests/AddGuest.jsx";

function Guests() {
    return (
        <>
            <Row typeof={"horizontal"}>
                <Heading as={"h1"}>Guests</Heading>
            </Row>

            <Row>
                <GuestTable />
                <AddGuest />
            </Row>
        </>
    );
}

export default Guests;