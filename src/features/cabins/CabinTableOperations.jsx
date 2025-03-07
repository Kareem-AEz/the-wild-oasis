import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				name={"Cabin"}
				filterField={"discount"}
				options={[
					{ value: "all", label: "All" },
					{ value: "with-discount", label: "With discount" },
					{ value: "no-discount", label: "No discount" },
				]}
			/>

			<SortBy
				options={[
					{ value: "name-asc", label: "Name A-Z" },
					{ value: "name-desc", label: "Name Z-A" },
					{ value: "regularPrice-asc", label: "Price low to high" },
					{ value: "regularPrice-desc", label: "Price high to low" },
					{ value: "maxCapacity-asc", label: "Capacity low to high" },
					{ value: "maxCapacity-desc", label: "Capacity high to low" },
				]}
			/>
		</TableOperations>
	);
}

export default CabinTableOperations;
