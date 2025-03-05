import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: logout, isPending: isLoggingOut } = useMutation({
		mutationFn: userLogout,
		onSuccess: () => {
			toast.success("You are now logged out");
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { logout, isLoggingOut };
}
