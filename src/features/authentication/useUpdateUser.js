import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: ({ avatar, password, fullName }) =>
			updateUserApi({ avatar, password, fullName }),
		onSuccess: () => {
			toast.success("User successfully updated");
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { updateUser, isUpdating };
}
