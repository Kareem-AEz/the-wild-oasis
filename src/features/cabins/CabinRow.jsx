import { memo } from "react";
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const { isDeleting, isSuccess, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const isWorking = isDeleting || isCreating || isSuccess;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${cabin.name}`,
			maxCapacity: cabin.maxCapacity,
			regularPrice: cabin.regularPrice,
			discount: cabin.discount,
			image: cabin.image,
			description: cabin.description,
		});
	}

	return (
		<>
			<Table.Row>
				<Img
					src={cabin.image}
					alt={`${cabin.name}`}
				/>
				<Cabin>{cabin.name}</Cabin>
				<div>{cabin.maxCapacity} guests</div>
				<Price>{formatCurrency(cabin.regularPrice)}</Price>
				<Discount>
					{cabin.discount ? (
						formatCurrency(cabin.discount)
					) : (
						<span>&mdash;</span>
					)}
				</Discount>
				<div>
					<Menus.Menu>
						<Modal>
							<Menus.Toggle id={cabin.id} />

							<Menus.List id={cabin.id}>
								<Menus.Button
									icon={<HiSquare2Stack />}
									onClick={handleDuplicate}
								>
									Duplicate
								</Menus.Button>

								<Modal.Open opens="edit">
									<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
								</Modal.Open>

								<Modal.Open opens="delete">
									<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
								</Modal.Open>
							</Menus.List>

							{/* edit */}

							<Modal.Window modalName="edit">
								<CreateCabinForm cabinToEdit={cabin} />
							</Modal.Window>

							{/* delete */}

							<Modal.Window modalName="delete">
								<ConfirmDelete
									disabled={isWorking}
									resourceName={cabin.name}
									onConfirm={() => deleteCabin(cabin.id)}
								/>
							</Modal.Window>
						</Modal>
					</Menus.Menu>
				</div>
			</Table.Row>
		</>
	);
}

export default memo(CabinRow);
