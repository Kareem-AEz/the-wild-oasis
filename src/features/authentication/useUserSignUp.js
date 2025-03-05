import { useMutation } from "@tanstack/react-query";
import { userSignUp as userSignUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUserSignUp() {
	const { mutate: userSignUp, isPending: isSigningUp } = useMutation({
		mutationFn: ({ email, password, fullName }) =>
			userSignUpApi(email, password, fullName),
		onSuccess: (data) => {
			toast.success(
				`You have successfully signed up ${data.user.user_metadata.fullName}!`
			);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { userSignUp, isSigningUp };
}
