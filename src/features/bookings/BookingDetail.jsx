import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {HiArrowUpOnSquare} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useMoveBack} from "../../hooks/useMoveBack.js";
import {useBooking} from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {useCheckout} from "../check-in-out/useCheckout.js";
import {useDeleteBooking} from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate()
    const moveBack = useMoveBack()
    const { isLoading, booking } = useBooking()
    const { isDeleting, deleteBooking } = useDeleteBooking()
    const { isCheckout, setCheckout } = useCheckout()

    if (isLoading) return <Spinner />
    const {status, id: bookingId} = booking

    const statusToTagName = {
        "unconfirmed": "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" &&
                    <Button
                        onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                        Check in
                    </Button>
                }

                {status === "checked-in" &&
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => setCheckout(bookingId)}
                    >
                        {isCheckout ? <SpinnerMini /> : "Check out"}
                    </Button>
                }

                <Modal>
                    <Modal.Open opens={"edit"}>
                        <Button>
                            Edit booking
                        </Button>
                    </Modal.Open>

                    <Modal.Open opens={"delete"}>
                        <Button variations="danger">
                            Delete booking
                        </Button>
                    </Modal.Open>

                    <Modal.Window name={"delete"}>
                        <ConfirmDelete
                            resourceName={`booking #${bookingId}`}
                            isDeleting={isDeleting}
                            disabled={isDeleting}
                            onConfirm={() => deleteBooking(bookingId)}
                        />
                    </Modal.Window>
                </Modal>

                <Button variations="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
