import { useEffect, useRef } from "react";

export function useClickOutside(action, isCapturing = true) {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) action?.();

			// *** KEY CHANGES: Stop event propagation ***
			// e.stopPropagation();
			// e.preventDefault(); // Might not always be necessary, but good practice
		}

		document.addEventListener("click", handleClick, isCapturing);

		return () =>
			document.removeEventListener("click", handleClick, isCapturing);
	}, [action, isCapturing]);

	return { ref };
}
