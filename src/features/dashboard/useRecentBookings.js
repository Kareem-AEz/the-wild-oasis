import { useQuery } from "@tanstack/react-query";
import { formatISO, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));
	const queryDate = formatISO(
		subDays(new Date(), numDays).setUTCHours(0, 0, 0, 0)
	);

	const { isLoading: isLoadingRecentBookings, data: recentBookings } = useQuery(
		{
			queryKey: ["recentBookings", `last-${numDays}`],
			queryFn: () => {
				return getBookingsAfterDate(queryDate);
			},
		}
	);

	return { isLoadingRecentBookings, recentBookings, numDays };
}
