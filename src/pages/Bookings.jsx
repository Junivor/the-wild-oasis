import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import AddBooking from "../features/bookings/AddBooking.jsx";

function Bookings() {
  return (
      <>
          <Row type="horizontal">
              <Heading as="h1">All bookings</Heading>
              <BookingTableOperations />
          </Row>

          <BookingTable />
          <AddBooking />
      </>
  );
}

export default Bookings;
