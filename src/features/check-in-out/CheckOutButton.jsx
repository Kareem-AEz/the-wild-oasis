import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
	const { isCheckingOut, checkOut, isSuccess } = useCheckOut();
	return (
		<Button
			variation="primary"
			size="small"
			onClick={() => checkOut(bookingId)}
			disabled={isCheckingOut || isSuccess}
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
