import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const navigate = useNavigate();
	const { booking, isLoading, isError } = useBooking();
	const { deleteBooking, isDeleting } = useDeleteBooking();
	const { checkOut } = useCheckOut();
	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
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

	const { id: bookingId, status } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Modal>
					{status !== "checked-in" && (
						<Modal.Open opens="delete">
							<Button variation="danger">Delete booking</Button>
						</Modal.Open>
					)}

					<Modal.Window modalName={"delete"}>
						<ConfirmDelete
							resourceName="booking"
							disabled={isDeleting}
							onConfirm={async () => {
								deleteBooking(bookingId, {
									onSuccess: () => navigate(-1),
								});
							}}
						/>
					</Modal.Window>
				</Modal>

				{status === "unconfirmed" && (
					<Button
						icon={<HiArrowDownOnSquare />}
						onClick={() => {
							navigate(`/checkin/${bookingId}`);
						}}
					>
						Check in
					</Button>
				)}

				{status === "checked-in" && (
					<Button
						onClick={() => {
							checkOut(bookingId);
						}}
					>
						Check out
					</Button>
				)}

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

export default BookingDetail;
