import styled from "styled-components";
import Table from "../../ui/Table.jsx";
import {Flag} from "../../ui/Flag.jsx";
import Modal from "../../ui/Modal.jsx";
import Menus from "../../ui/Menus.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import EditGuestForm from "./EditGuestForm.jsx";
import {useDeleteGuest} from "./useDeleteGuest.js";


const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
`

const Email= styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-grey-600);
`

const NationalContainer = styled.div`
    display: flex;
    gap: 1.6rem;
`

const National= styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-grey-600);
`

const NationalId = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-green-700);
`

function GuestRow({ guest }) {
    const { isDeleting, deleteGuest } = useDeleteGuest()
    const {
        id: guestId,
        fullName,
        email,
        nationality: nation,
        nationalID,
        countryFlag
    } = guest


    return (
        <Table.Row>
            <Guest>{ fullName }</Guest>
            <Email>{ email }</Email>
            <NationalContainer>
                <Flag src={countryFlag} alt={`Country of ${nation}`}/>
                <National>{ nation }</National>
            </NationalContainer>
            <NationalId>{ nationalID }</NationalId>
            <div>
                <Modal>
                    <Menus>
                        <Menus.Toggle id={guestId}/>
                        <Menus.List id={guestId}>
                            <Modal.Open opens={"edit-guest"}>
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens={"delete-guest"}>
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name={"edit-guest"}>
                            <EditGuestForm guestToEdit={guest}/>
                        </Modal.Window>

                        <Modal.Window name={"delete-guest"}>
                            <ConfirmDelete
                                resourceName={"Guest"}
                                isDeleting={isDeleting}
                                disabled={isDeleting}
                                onConfirm={() => deleteGuest(guestId)}
                            />
                        </Modal.Window>
                    </Menus>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default GuestRow;