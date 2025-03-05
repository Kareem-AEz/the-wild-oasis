import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ id, ...data }) => createEditCabin(data, id),
		onSuccess: () => {
			toast.success("Cabin successfully updated");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { editCabin, isEditing };
}
