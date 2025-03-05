import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";
import Empty from "../../ui/Empty";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckInBooking() {
	const [isPaid, setIsPaid] = useState(false);
	const [needsBreakfast, setNeedsBreakfast] = useState(false);
	const { settings } = useSettings();

	const moveBack = useMoveBack();
	const { checkIn, isCheckingIn } = useCheckIn();
	const { booking, isLoading, isError } = useBooking();
	const isWorking = isCheckingIn || isLoading;

	useEffect(() => {
		setIsPaid(booking?.isPaid ?? false);
		setNeedsBreakfast(booking?.hasBreakfast ?? false);
	}, [booking]);

	if (isWorking) return <Spinner />;
	if (isError)
		return (
			<Empty resource="booking">
				There was an error loading this booking. Please try again.
			</Empty>
		);
	if (!booking)
		return (
			<Empty resource="booking">
				No booking found with this ID. Please check the URL and try again.
			</Empty>
		);

	const {
		id: bookingId,
		guests,
		numGuests,
		hasBreakfast,
		cabinPrice,
		numNights,
		status,
	} = booking;

	const optionalBreakfastPrice =
		settings?.breakfastPrice * numNights * numGuests;
	function handleCheckIn() {
		if (!isPaid) return;

		if (needsBreakfast !== hasBreakfast) {
			checkIn({
				bookingId,
				breakFast: {
					hasBreakfast: needsBreakfast,
					extrasPrice: needsBreakfast ? optionalBreakfastPrice : 0,
					totalPrice: needsBreakfast
						? cabinPrice + optionalBreakfastPrice
						: cabinPrice,
				},
			});
		} else {
			checkIn({ bookingId });
		}
	}

	if (status === "checked-out")
		return <Empty>This booking has already been checked out</Empty>;
	if (status === "checked-in")
		return <Empty>This booking has already been checked in</Empty>;

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					id={"breakfast"}
					onChange={() => {
						setNeedsBreakfast((current) => !current);
						setIsPaid(false);
					}}
					checked={needsBreakfast}
				>
					Want to add breakfast?{" "}
					<span>
						(
						{isNaN(optionalBreakfastPrice)
							? "..."
							: `+ ${formatCurrency(optionalBreakfastPrice)}`}
						)
					</span>
				</Checkbox>
			</Box>

			<Box>
				<Checkbox
					id={bookingId}
					onChange={() => setIsPaid((isPaid) => !isPaid)}
					checked={isPaid}
				>
					The guest: <strong>{guests.fullName}</strong> have paid the total
					amount of{" "}
					<strong>
						{formatCurrency(
							needsBreakfast ? cabinPrice + optionalBreakfastPrice : cabinPrice
						)}
					</strong>
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckIn}
					disabled={!isPaid}
				>
					Check in booking #{bookingId}
				</Button>
				<Button
					variation="secondary"
					onClick={moveBack}
				>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckInBooking;
