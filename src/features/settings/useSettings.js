import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
	});

	return { settings: data, isLoading, error };
}
