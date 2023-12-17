import styled from "styled-components";

import {formatCurrency} from "../../utils/helpers.js";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table";
import EditCabinForm from "./EditCabinForm.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {useDuplicateCabin} from "./useDuplicateCabin.js";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({ cabin }) {
    const { isDuplicating, duplicateCabin } = useDuplicateCabin()
    const { isDeleting, deleteCabin } = useDeleteCabin()
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image: imageUrl,
        description
    } = cabin
    function handleDuplicate() {
        duplicateCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            imageUrl,
            description
        })
    }

    return (
        <Table.Row>
            <Img src={imageUrl} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                                { isDuplicating ? <SpinnerMini /> : "Duplicate" }
                            </Menus.Button>

                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name="edit">
                            <EditCabinForm cabinToEdit={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="cabins"
                                disabled={isDeleting}
                                isLoading={isDeleting}
                                onConfirm={() => deleteCabin({cabinId, imageUrl})}
                            />
                        </Modal.Window>
                    </Menus>
                </Modal>
            </div>
        </Table.Row>
    )
}
//<HiPencil /> <HiTrash />
export default CabinRow;