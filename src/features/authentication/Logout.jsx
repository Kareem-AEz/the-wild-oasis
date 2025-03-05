import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";

function Logout() {
	const { logout, isLoggingOut } = useLogout();

	return (
		<ButtonIcon
			disabled={isLoggingOut}
			onClick={logout}
		>
			<AnimatePresence>
				{isLoggingOut ? (
					<motion.div
						key="spinner"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
					>
						<SpinnerMini />
					</motion.div>
				) : (
					<motion.div
						key="logout-icon"
						initial={{ scale: 1, opacity: 1 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 1.2, opacity: 0 }}
						transition={{ type: "spring", duration: 4, bounce: 0.1 }}
					>
						<HiArrowRightOnRectangle />
					</motion.div>
				)}
			</AnimatePresence>
		</ButtonIcon>
	);
}

export default Logout;
