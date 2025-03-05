import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentValue = searchParams.get("sortBy") || options.at(0).value;

	function handleChange(e) {
		const value = e.target.value;
		searchParams.set("sortBy", value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type="white"
			onChange={handleChange}
			value={currentValue}
		/>
	);
}

export default SortBy;
