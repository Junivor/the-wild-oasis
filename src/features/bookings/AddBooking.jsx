import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateBookingForm from "./CreateBookingForm.jsx";

function AddBooking() {
    return (
        <Modal>
            <Modal.Open opens={"booking"}>
                <Button>Add new booking</Button>
            </Modal.Open>
            <Modal.Window name={"booking"}>
                <CreateBookingForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddBooking;