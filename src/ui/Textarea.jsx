import styled, { css } from "styled-components";

const Textarea = styled.textarea`
	padding: 0.8rem 1.2rem;
	border: 1px solid var(--color-grey-300);
	border-radius: 5px;
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	width: 100%;
	height: 8rem;
	resize: vertical;

	${(props) =>
		props.$isInvalid &&
		css`
			border-color: var(--color-red-700);
			&:focus {
				outline-color: var(--color-red-700);
			}
		`}
`;

export default Textarea;
