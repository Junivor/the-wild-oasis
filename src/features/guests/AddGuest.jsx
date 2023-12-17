import Modal from "../../ui/Modal.jsx";
import CreateGuestFrom from "./CreateGuestFrom.jsx";
import Button from "../../ui/Button.jsx";

function AddGuest() {
    return (
        <Modal>
            <Modal.Open opens={"guest-form"}>
                <Button>Add new guests</Button>
            </Modal.Open>
            <Modal.Window name={"guest-form"}>
                <CreateGuestFrom />
            </Modal.Window>
        </Modal>
    );
}

export default AddGuest;