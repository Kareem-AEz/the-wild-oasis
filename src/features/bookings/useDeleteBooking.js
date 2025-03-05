import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const {
		isPending: isDeleting,
		mutate: deleteBooking,
		mutateAsync: deleteBookingAsync,
	} = useMutation({
		mutationFn: (bookingId) => deleteBookingApi(bookingId),
		onSuccess: () => {
			toast.success("Booking successfully deleted");
			queryClient.invalidateQueries({
				active: true,
			});
            
		},
		onError: () => {
			toast.error("There was an error while deleting the booking");
		},
	});

	return { isDeleting, deleteBooking, deleteBookingAsync };
}
