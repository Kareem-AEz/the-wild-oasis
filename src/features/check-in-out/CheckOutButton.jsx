import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";
import SpinnerMini from "../../ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
	const { checkOut, isCheckingOut, isSuccess } = useCheckOut();

	return (
		<Button
			variation="primary"
			size="small"
			onClick={() => checkOut(bookingId)}
			disabled={isCheckingOut || isSuccess}
		>
			{isCheckingOut ? <SpinnerMini /> : "Check out"}
		</Button>
	);
}

export default CheckoutButton;
