import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useUserLogin } from "./useUserLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loginUser, isLoggingIn } = useUserLogin();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return;

		loginUser({ email, password });
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button
					size="large"
					onClick={handleSubmit}
					disabled={isLoggingIn}
				>
					<AnimatePresence>
						{isLoggingIn ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
							>
								<SpinnerMini />
							</motion.div>
						) : (
							<motion.p
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 1.2 }}
								transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
							>
								Login
							</motion.p>
						)}
					</AnimatePresence>
				</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
