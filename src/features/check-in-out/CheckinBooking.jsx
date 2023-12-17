import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import {useState} from "react";
import {useSettings} from "../settings/useSettings.js";
import {formatCurrency} from "../../utils/helpers.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useBooking} from "../bookings/useBooking.js";
import {useCheckin} from "./useCheckin.js";
import {useNavigate} from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;
//optionalBreakfastPrice
function CheckinBooking() {
    const navigate = useNavigate()
    const [confirmPaid, setConfirmPaid] = useState(false)
    const [addBreakfast, setAddBreakfast] = useState(false)

    const moveBack = useMoveBack()
    const { isLoading, booking } = useBooking()
    const { isLoadingSettings, settings } = useSettings()
    const { isCheckin, setCheckin } = useCheckin()

    if (isLoading || isLoadingSettings) return <Spinner />

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;
    const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights
//Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
//I confirm that { guests.fullName } has paid the total amount of

    function handleCheckin() {
        setCheckin({
            bookingId,
            breakfast: {
                hasBreakfast: addBreakfast,
                extrasPrice: optionalBreakfastPrice,
                totalPrice: totalPrice + optionalBreakfastPrice
            }
        }, {onSettled: () => navigate("/bookings")})
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    disabled={confirmPaid}
                    onChange={() => setConfirmPaid(confirm => !confirm)}
                >
                    I confirm that { guests.fullName } has paid the total amount of
                    {addBreakfast
                        ? ` ${formatCurrency(totalPrice + optionalBreakfastPrice)}
                           (${formatCurrency(totalPrice)} +
                           ${formatCurrency(optionalBreakfastPrice)})`
                        : ` ${formatCurrency(totalPrice)}`
                    }
                </Checkbox>
            </Box>

            { !hasBreakfast &&
                <Box>
                    <Checkbox onChange={() => {
                        setAddBreakfast(breakfast => !breakfast)
                        setConfirmPaid(false)
                    }} disabled={isCheckin}>
                        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            }

            <ButtonGroup>
                <Button disabled={!confirmPaid} onClick={handleCheckin}>
                    { isCheckin ? <SpinnerMini /> : `Check in booking #${bookingId}`}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
