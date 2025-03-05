import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled(motion.button)`
	position: relative;
	background-color: var(--color-grey-0);
	border: none;

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-grey-100);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 0.4rem var(--color-brand-100);
	}
`;

const Text = styled.span`
	position: relative;
	z-index: 10;

	${({ $active }) =>
		$active &&
		css`
			color: var(--color-brand-50);
		`}
`;

const Highlight = styled(motion.span)`
	position: absolute;
	z-index: 9;
	inset: 0;
	background-color: var(--color-brand-600);
	color: var(--color-brand-50);
	padding: 0.44rem 0.8rem;
	border-radius: var(--border-radius-sm);
`;

function Filter({ filterField, options = [], name }) {
	const [searchParams, setSearchParams] = useSearchParams();
	let currentValue = searchParams.get(filterField) || options.at(0).value;

	const handleFilter = (value) => {
		searchParams.set(filterField, value);
		searchParams.get("page") && searchParams.delete("page");
		setSearchParams(searchParams);
	};

	return (
		<StyledFilter>
			<AnimatePresence>
				{options.map((option) => (
					<FilterButton
						key={option.value}
						onClick={() => handleFilter(option.value)}
					>
						<Text $active={currentValue === option.value}>{option.label}</Text>

						{currentValue === option.value && (
							<Highlight
								layoutId={`filter-highlight-${name}`}
								key={option.value + "-highlight"}
							/>
						)}
					</FilterButton>
				))}
			</AnimatePresence>
		</StyledFilter>
	);
}

export default Filter;
