import { useQuery } from "@tanstack/react-query";
import { formatISO, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));
	const queryDate = formatISO(
		subDays(new Date(), numDays).setUTCHours(0, 0, 0, 0)
	);

	const { isLoading: isLoadingRecentStays, data: recentStays } = useQuery({
		queryKey: ["recentStays", `last-${numDays}`],
		queryFn: () => {
			return getStaysAfterDate(queryDate);
		},
	});

	const confirmedStays = recentStays?.filter(
		(stay) => stay.status === "checked-in" || stay.status === "checked-out"
	);

	return { isLoadingRecentStays, recentStays, confirmedStays, numDays };
}
