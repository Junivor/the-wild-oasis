import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {

    // return (
    //     <Modal>
    //         <Modal.Open opens={"cabin-form"}>
    //             <Button>Add new cabin</Button>
    //         </Modal.Open>
    //         <Modal.Window name={"cabin-form"}>
    //             <CreateCabinForm />
    //         </Modal.Window>
    //     </Modal>
    // );

    return (
        <Modal>
            <Modal.Open opens={"cabin-forms"}>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name={"cabin-forms"}>
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    )
}

export default AddCabin;