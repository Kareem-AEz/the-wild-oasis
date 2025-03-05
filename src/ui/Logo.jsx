import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo() {
	const { darkMode } = useDarkMode();

	// Use absolute paths with leading slash to ensure images are found regardless of current route
	let src = darkMode ? "/logo-dark.png" : "/logo-light.png";
	return (
		<StyledLogo>
			<Img
				src={src}
				alt="Logo"
			/>
		</StyledLogo>
	);
}

export default Logo;
