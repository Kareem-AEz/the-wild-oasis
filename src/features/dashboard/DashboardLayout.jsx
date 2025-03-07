import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoadingRecentBookings, recentBookings } = useRecentBookings();
	const { isLoadingRecentStays, confirmedStays, numDays } = useRecentStays();
	const { cabins, isLoading } = useCabins();

	const isWorking =
		isLoadingRecentBookings || isLoadingRecentStays || isLoading;

	if (isWorking) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={recentBookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />

			<SalesChart
				bookings={recentBookings}
				numDays={numDays}
			/>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
