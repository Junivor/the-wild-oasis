import Stat from "./Stat.jsx";
import {HiOutlineBriefcase, HiOutlineChartPie} from "react-icons/hi";
import {HiOutlineBanknotes, HiOutlineCalendarDays} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers.js";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    const numBookings = bookings.length
    const checkin = confirmedStays.length
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0)
    const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount)

    return (
        <>
            <Stat
                title={"Bookings"}
                color={"blue"}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />

            <Stat
                title={"Sales"}
                color={"green"}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />

            <Stat
                title={"Check ins"}
                color={"indigo"}
                icon={<HiOutlineCalendarDays />}
                value={checkin}
            />

            <Stat
                title={"Occupancy rate"}
                color={"yellow"}
                icon={<HiOutlineChartPie />}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    )
}

export default Stats;