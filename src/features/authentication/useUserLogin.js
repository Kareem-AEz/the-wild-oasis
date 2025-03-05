import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/apiAuth";

export function useUserLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => userLogin(email, password),
		onSuccess: (user) => {
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
			toast.success("You have successfully logged in!");
			queryClient.setQueryData(["user"], user);

			navigate("/dashboard");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { loginUser, isLoggingIn };
}
