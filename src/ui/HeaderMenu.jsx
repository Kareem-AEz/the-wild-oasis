import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeaderMenu = styled.ul`
	display: flex;
	align-items: center;
	gap: 1.2rem;
`;

function HeaderMenu() {
	const navigate = useNavigate();
	const { darkMode, toggleDark } = useDarkMode();

	return (
		<StyledHeaderMenu>
			<ButtonIcon onClick={() => navigate("/account")}>
				<HiOutlineUser />
			</ButtonIcon>
			<ButtonIcon onClick={toggleDark}>
				{darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
			</ButtonIcon>
			<Logout />
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;
