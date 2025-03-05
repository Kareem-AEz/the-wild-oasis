import styled from "styled-components";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../utils/constants";

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}

	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;

function Pagination({ count }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const pages = Math.ceil(count / ITEMS_PER_PAGE);
	let currentPage = searchParams.get("page")
		? Number(searchParams.get("page"))
		: 1;

	function handleNext() {
		currentPage = currentPage < pages ? currentPage + 1 : currentPage;

		searchParams.set("page", currentPage);
		setSearchParams(searchParams);
	}
	function handlePrev() {
		currentPage = currentPage !== 1 ? currentPage - 1 : currentPage;

		searchParams.set("page", currentPage);
		setSearchParams(searchParams);
	}

	if (pages <= 1) return null;

	return (
		<StyledPagination>
			<P>
				Showing <span>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
				<span>
					{currentPage === pages ? count : currentPage * ITEMS_PER_PAGE}
				</span>{" "}
				of <span>{count}</span> Results
			</P>
			<Buttons>
				<PaginationButton
					onClick={handlePrev}
					disabled={currentPage === 1}
				>
					<HiChevronLeft />
					<span>Previous</span>
				</PaginationButton>

				<PaginationButton
					onClick={handleNext}
					disabled={currentPage === pages}
				>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}

export default Pagination;
