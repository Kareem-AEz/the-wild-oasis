import { de } from "date-fns/locale";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();

	const { updateSetting } = useUpdateSetting();

	const defaultValues = {
		"min-nights": minBookingLength,
		"max-nights": maxBookingLength,
		"max-guests": maxGuestsPerBooking,
		"breakfast-price": breakfastPrice,
	};

	function handleUpdate(e, field) {
		const { value, id } = e.target;

		if (!value || +value === +defaultValues[id]) return;
		updateSetting({
			[field]: value,
		});
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={defaultValues["min-nights"]}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={defaultValues["max-nights"]}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={defaultValues["max-guests"]}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={defaultValues["breakfast-price"]}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
