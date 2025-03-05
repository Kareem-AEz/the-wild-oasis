import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";

export function useCabins() {
	const { data: cabins, isLoading, error } = useQuery({
		queryKey: ["cabins"],
		queryFn: fetchCabins,
	});

	return { cabins, isLoading, error };
}
