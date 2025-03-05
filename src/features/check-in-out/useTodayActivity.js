import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
	const { data: TodayActivity, isLoading: isLoadingTodayActivity } = useQuery({
		queryKey: ["TodayActivity"],
		queryFn: () => getStaysTodayActivity(),
	});

	return { TodayActivity, isLoadingTodayActivity };
}
