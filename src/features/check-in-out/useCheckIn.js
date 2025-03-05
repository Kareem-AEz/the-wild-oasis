import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakFast }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakFast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
			queryClient.invalidateQueries({
				active: true,
			});
			navigate(-1);
		},
		onError: () => {
			toast.error("There was an error while checking in");
		},
	});

	return { checkIn, isCheckingIn };
}
