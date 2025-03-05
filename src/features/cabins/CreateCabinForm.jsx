import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? { ...editValues } : {},
	});
	const { errors } = formState;

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		console.log("onSubmit");

		if (isEditSession) {
			const isNewImage = data.image[0] instanceof File;

			editCabin(
				{
					...data,
					id: editId,
					image: isNewImage ? data.image[0] : data.image,
				},
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
			return;
		} else {
			createCabin(
				{ ...data, image: data.image[0] },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	function onError(errors) {
		console.error(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow
				label={"Cabin name"}
				error={errors?.name?.message}
			>
				<Input
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required",
					})}
					$isInvalid={!!errors?.name?.message}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
					$isInvalid={!!errors?.maxCapacity?.message}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
					$isInvalid={!!errors?.regularPrice?.message}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Discount"
				error={errors?.discount?.message}
			>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						min: {
							value: 0,
						},
						validate: (value) =>
							+getValues().regularPrice >= +value ||
							"Discount should be less than regular price",
					})}
					$isInvalid={!!errors?.discount?.message}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
					$isInvalid={!!errors?.description?.message}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow
				label="Cabin photo"
				error={errors?.image?.message}
			>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
						validate: (fileList) =>
							fileList.length > 0 || "Please upload an image",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Add new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
