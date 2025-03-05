import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendar,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// total bookings
	const totalBookings = bookings.length;

	// total sales
	const sales = bookings.reduce(
		(total, booking) => total + booking.totalPrice,
		0
	);

	// total check ins
	const checkIns = confirmedStays.length;

	// occupancy rate
	const occupancyRate =
		confirmedStays.reduce((total, stay) => total + stay.numNights, 0) /
		(numDays * cabinCount);
	return (
		<>
			<Stat
				key={totalBookings}
				icon={<HiOutlineBriefcase />}
				title="Bookings"
				value={totalBookings}
				color={"blue"}
			/>

			<Stat
                key={sales}
				icon={<HiOutlineBanknotes />}
				title={"Sales"}
				value={formatCurrency(sales)}
				color={"green"}
			/>

			<Stat
                key={checkIns}
				icon={<HiOutlineCalendar />}
				title={"Check ins"}
				value={checkIns}
				color={"indigo"}
			/>

			<Stat
                key={occupancyRate}
				icon={<HiOutlineChartBar />}
				title={"Occupancy rate"}
				value={Math.round(occupancyRate * 100) + "%"}
				color={"yellow"}
			/>
		</>
	);
}

export default Stats;
