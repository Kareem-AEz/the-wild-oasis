import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// Filter
	const filterValue = searchParams.get("status") || "all";
	const filter =
		filterValue !== "all" ? { field: "status", value: filterValue } : null;

	// Sort
	const sortByValue = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByValue.split("-");
	const sortBy = { field, direction };

	// Pagination
	const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Prefetching
	const pageCount = Math.ceil(count / 10);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, bookings, error, count };
}
