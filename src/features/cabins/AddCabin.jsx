import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
	return (
		<div>
			<Modal>
				{/* createCabinForm  */}
				<Modal.Open opens="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window modalName="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			{/* this button is motion.button */}
// 			<Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>

// 			{/* formWrapper is motion.div, and CreateCabinForm is motion.form */}
// 			{isOpenModal ? (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			) : null}
// 		</div>
// 	);
// }

export default AddCabin;
