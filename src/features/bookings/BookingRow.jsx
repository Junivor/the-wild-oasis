import styled from "styled-components";
import {format, isToday, parseISO} from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus.jsx";
import {HiEye, HiPencil, HiTrash} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useCheckout} from "../check-in-out/useCheckout.js";
import EditBookingForm from "./EditBookingForm.jsx";
import booking from "../../pages/Booking.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    hasBreakfast,
    extrasPrice,
    cabinPrice,
    observations,
    guests: { id: guestId, fullName: guestName, email },
    cabins: { id: cabinId, name: cabinName },
  }
}) {
    const navigate = useNavigate()
    const { isCheckout, setCheckout } = useCheckout()
    const { isDeleting, deleteBooking } = useDeleteBooking()

    const bookingToEdit = {
        id: bookingId,
        created_at,
        numNights,
        numGuests,
        totalPrice,
        status,
        guestId,
        hasBreakfast,
        extrasPrice,
        cabinPrice,
        cabinId,
        observations,
        startDate: format(parseISO(startDate), "yyyy-MM-dd"),
        endDate: format(parseISO(endDate), "yyyy-MM-dd"),
    }



  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
          <Menus.Menu>
              <Menus.Toggle id={bookingId}/>

              <Menus.List id={bookingId}>
                  <Menus.Button
                      icon={<HiEye />}
                      onClick={() => navigate(`${bookingId}`)}
                  >
                      See details
                  </Menus.Button>

                  {status === "unconfirmed" &&
                      <>
                          <Modal.Open opens={"edit-booking"}>
                              <Menus.Button
                                  icon={<HiPencil />}
                              >
                                  Edit
                              </Menus.Button>
                          </Modal.Open>
                          <Menus.Button
                              icon={<HiArrowDownOnSquare />}
                              onClick={() => navigate(`/checkin/${bookingId}`)}
                          >
                              Check in
                          </Menus.Button>
                      </>
                  }

                  {status === "checked-in" &&
                      <Menus.Button
                          icon={<HiArrowUpOnSquare />}
                          onClick={() => setCheckout(bookingId)}
                      >
                          Check out
                      </Menus.Button>
                  }

                  <Modal.Open opens={"delete"}>
                      <Menus.Button icon={<HiTrash />}>
                          Delete
                      </Menus.Button>
                  </Modal.Open>
              </Menus.List>
          </Menus.Menu>

          <Modal.Window name={"edit-booking"}>
              <EditBookingForm bookingToEdit={bookingToEdit}/>
          </Modal.Window>

          <Modal.Window name={"delete"}>
              <ConfirmDelete
                resourceName={"booking"}
                disabled={isDeleting}
                isDeleting={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
          </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
