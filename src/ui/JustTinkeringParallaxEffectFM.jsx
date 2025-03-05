import React, { useCallback, useRef } from "react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";

const ParallaxMotion = () => {
	const containerRef = useRef(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = useCallback((e) => {
		if (!containerRef.current) return; // 👈 safety check

		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) * 0.5; //  dampen for smoother motion
		const y = (e.clientY - top - height / 2) * 0.5;

		mouseX.set(x);
		mouseY.set(y);
	}, []);

	const onMouseLeave = useCallback(() => {
		mouseX.set(0);
		mouseY.set(0);
	}, []);

	const spring = { type: "spring", bounce: 0.05, visualDuration: 0.5 };

	// smooth motion
	const smoothX = useSpring(mouseX, spring);
	const smoothY = useSpring(mouseY, spring);

	const backgroundX = useTransform(smoothX, [-200, 200], [-20, 20]);
	const backgroundY = useTransform(smoothY, [-200, 200], [-20, 20]);
	const backgroundAnimationTemplate = useMotionTemplate`translate3d(${backgroundX}px, ${backgroundY}px, 0)`;

	const midX = useTransform(smoothX, [-200, 200], [-40, 40]);
	const midY = useTransform(smoothY, [-200, 200], [-40, 40]);
	const midAnimationTemplate = useMotionTemplate`translate3d(${midX}px, ${midY}px, 0)`;

	const foregroundX = useTransform(smoothX, [-200, 200], [-60, 60]);
	const foregroundY = useTransform(smoothY, [-200, 200], [-60, 60]);
	const foregroundAnimationTemplate = useMotionTemplate`translate3d(${foregroundX}px, ${foregroundY}px, 0)`;

	return (
		<div
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={onMouseLeave}
			style={{
				position: "relative",
				width: "100%",
				height: "100vh",
				overflow: "hidden",
				backgroundColor: "black",
			}}
		>
			{/* Background Layer */}
			<motion.div
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					background: "linear-gradient(to right, #3b82f6, #a855f7)",
					// Not GPU accelerated
					x: backgroundX,
					y: backgroundY,
					// GPU accelerated using useMotionTemplate
					// transform: backgroundAnimationTemplate,
					willChange: "transform",
				}}
			/>

			{/* Middle Layer */}
			<motion.div
				style={{
					position: "absolute",
					width: "75%",
					height: "75%",
					backgroundColor: "white",
					borderRadius: "1rem",
					boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
					margin: "auto",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					// Not GPU accelerated
					x: midX,
					y: midY,
					// GPU accelerated using useMotionTemplate
					// transform: midAnimationTemplate,
					willChange: "transform",
				}}
			>
				<h1
					style={{
						fontSize: "2.5rem",
						fontWeight: "bold",
						textAlign: "center",
						marginTop: "8rem",
						color: "rgba(31, 41, 55, 1)",
					}}
				>
					Parallax Effect with Framer Motion
				</h1>
			</motion.div>

			{/* Foreground Layer */}
			<motion.div
				style={{
					position: "absolute",
					width: "5rem",
					height: "5rem",
					backgroundColor: "#f87171",
					borderRadius: "50%",
					boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
					// Not GPU accelerated
					x: foregroundX,
					y: foregroundY,
					// GPU accelerated using useMotionTemplate
					// transform: foregroundAnimationTemplate,
					willChange: "transform",
				}}
			/>
		</div>
	);
};

export default ParallaxMotion;
