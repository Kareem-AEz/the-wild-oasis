import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUserSignUp } from "./useUserSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const { register, handleSubmit, formState, getValues, reset } = useForm();
	const { errors } = formState;
	const { userSignUp, isSigningUp } = useUserSignUp();

	function onSubmit(data) {
		const { fullName, email, password } = data;
		userSignUp({ email, password, fullName }, { onSettled: () => reset() });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="Full name"
				error={errors?.fullName?.message}
			>
				<Input
					type="text"
					id="fullName"
					{...register("fullName", {
						required: "This field is required!",
					})}
					$isInvalid={errors?.fullName}
				/>
			</FormRow>

			<FormRow
				label="Email address"
				error={errors?.email?.message}
			>
				<Input
					type="email"
					id="email"
					{...register("email", {
						required: "This field is required!",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid email address.",
						},
					})}
					$isInvalid={errors?.email}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					{...register("password", {
						required: "This field is required!",
						minLength: {
							value: 8,
							message: "The password must be at least 8 characters.",
						},
					})}
					$isInvalid={errors?.password}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					{...register("passwordConfirm", {
						required: "This field is required!",
						validate: (value) =>
							value === getValues().password || "Doesn't match the password!",
					})}
					$isInvalid={errors?.passwordConfirm}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isSigningUp}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
