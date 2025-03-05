import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useKey } from "../hooks/useKey";
import { useClickOutside } from "../hooks/useClickOutside";
import { createPortal } from "react-dom";

const StyledModal = styled(motion.div)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");
	const openModal = (name) => setOpenName(name);
	const close = () => setOpenName("");

	return (
		<ModalContext.Provider
			value={{
				openModal,
				close,
				openName,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens }) {
	const { openModal } = useContext(ModalContext);
	return cloneElement(children, { onClick: () => openModal(opens) });
}

function ModalWindow({ children, modalName }) {
	const { openName, close } = useContext(ModalContext);
	useKey("Escape", close);
	const { ref } = useClickOutside(close);

	return createPortal(
		<AnimatePresence>
			{openName === modalName ? (
				<Overlay
					key={openName}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ type: "spring", duration: 0.291, bounce: 0 }}
				>
					<motion.div
						key={openName}
						style={{ height: "100%", width: "100%" }}
						initial={{ opacity: 0, y: 100, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 100, scale: 0.8 }}
						transition={{ type: "spring", duration: 0.291, bounce: 0 }}
					>
						<StyledModal ref={ref}>
							<Button onClick={close}>
								<HiXMark />
							</Button>
							<div>{cloneElement(children, { onCloseModal: close })}</div>
						</StyledModal>
					</motion.div>
				</Overlay>
			) : null}
		</AnimatePresence>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = ModalWindow;

export default Modal;
