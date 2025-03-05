import supabase, { supabaseUrl } from "./supabase";

export async function fetchCabins() {
	const { data: cabins, error } = await supabase
		.from("cabins")
		.select("*")
		.order("id");

	if (error) {
		console.error(error);
		throw new Error("Cabin data could not be loaded");
	}

	return cabins;
}

export async function createEditCabin(newCabin, id) {
	try {
		// checking if the cabin is being created or edited
		const isEditing = Boolean(id);
		const isNewImage = newCabin.image instanceof File;

		// prettier-ignore
		// this only used one time when creating a new cabin
		const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replace(/[/\\]/g, "");

		// this is used when editing an existing cabin or when creating a new cabin
		const imagePath = isNewImage
			? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
			: newCabin.image;

		// create/edit the cabin
		let query = isEditing
			? supabase
					.from("cabins")
					.update({ ...newCabin, image: imagePath })
					.eq("id", id)
					.select()
					.single()
			: supabase
					.from("cabins")
					.insert([{ ...newCabin, image: imagePath }])
					.select()
					.single();

		const { data, error } = await query;

		// throw an error if the cabin creation fails
		if (error)
			throw new Error(`Cabin could not be ${isEditing ? "edited" : "created"}`);

		// upload the cabin image
		const uploadImage = async () => {
			const { error } = await supabase.storage
				.from("cabin-images")
				.upload(imageName, newCabin.image);

			if (error) throw new Error("Cabin image could not be uploaded");
		};

		// upload the new cabin image
		if (isNewImage) await uploadImage();

		// console.log(`Cabin ${isEditing ? "edited" : "created"} successfully`, data);
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function deleteCabin(id) {
	// REMEMBER RLS POLICIES
	const { error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
}
