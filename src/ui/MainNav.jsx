import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
	HiOutlineHomeModern,
	HiOutlineUsers,
} from "react-icons/hi2";
import { motion } from "motion/react";

const NavList = styled(motion.ul)`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		position: relative;
		z-index: 1;

		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}
	f

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

const Highlight = styled(motion.div)`
	background-color: var(--color-grey-100);
	position: absolute;
	inset: 0;
	border-radius: var(--border-radius-sm);
	width: 100%;
	height: 100%;
	z-index: 0;
`;

const links = [
	{ to: "/dashboard", icon: <HiOutlineHome />, label: "Home" },
	{ to: "/bookings", icon: <HiOutlineCalendarDays />, label: "Bookings" },
	{ to: "/cabins", icon: <HiOutlineHomeModern />, label: "Cabins" },
	{ to: "/users", icon: <HiOutlineUsers />, label: "Users" },
	{ to: "/settings", icon: <HiOutlineCog6Tooth />, label: "Settings" },
];

function MainNav() {
	const location = useLocation();
	const activeTab = location.pathname;

	return (
		<nav>
			<NavList>
				{links.map(({ to, icon, label }) => (
					<li
						key={to}
						style={{ position: "relative" }}
					>
						<StyledNavLink
							to={to}
							className={activeTab === to ? "active" : ""}
						>
							{icon}
							<span>{label}</span>
						</StyledNavLink>
						{/* Renders only once and moves instead of re-rendering */}
						{activeTab === to && (
							<Highlight
								transition={{ type: "spring", duration: 0.369, bounce: 0 }}
								layoutId="nav-indicator"
							/>
						)}
					</li>
				))}
			</NavList>
		</nav>
	);
}

export default MainNav;
