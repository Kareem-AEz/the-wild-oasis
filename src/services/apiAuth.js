import supabase, { supabaseUrl } from "./supabase";

export async function userLogin(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getUser() {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	return {
		user,
		isAuthenticated: user?.aud === "authenticated" && !user?.banned_until,
	};
}

export async function userLogout() {
	let { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
}

export async function userSignUp(email, password, fullName) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function updateUser({ password, fullName, avatar }) {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// update FullName
	let updateData = {};
	if (fullName) updateData = { data: { fullName } };

	// update Password
	if (password) updateData = { password: password };

	// update user
	const { data, error: updateError } = await supabase.auth.updateUser(
		updateData
	);
	if (updateError) {
		throw new Error(updateError.message);
	}

	// upload avatar
	if (!avatar) return data;

	const avatarName = `avatar-${data.user.id}-${Date.now()}`; // Prevent overwriting

	let storageQuery = supabase.storage.from("avatars");

	if (user.user_metadata.avatar) {
		const oldAvatarName = user.user_metadata.avatar.split("/").pop(); // Extract filename

		// Delete old avatar before uploading the new one
		await storageQuery.remove(oldAvatarName);
	}

	// Upload the new avatar
	const { error: avatarError } = await storageQuery.upload(avatarName, avatar);

	if (avatarError) {
		throw new Error(avatarError.message);
	}

	const { error: updateAvatarError } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
		},
	});

	if (updateAvatarError) {
		throw new Error(updateAvatarError.message);
	}

	return data;
}
