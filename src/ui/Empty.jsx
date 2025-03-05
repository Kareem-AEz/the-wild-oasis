import styled from "styled-components";

const StyledEmpty = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rem;
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
	color: var(--color-grey-500);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);
`;

function Empty({ resource, children }) {
	return (
		<StyledEmpty>{children ? children : `No ${resource} to show`}</StyledEmpty>
	);
}

export default Empty;
