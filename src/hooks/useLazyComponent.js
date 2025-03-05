import { lazy } from "react";

/**
 * Custom hook to lazy load components with better error handling
 * @param {string} path - Path to the component
 * @returns {React.LazyExoticComponent} - Lazy loaded component
 */
export function useLazyComponent(path) {
	return lazy(() =>
		import(`../${path}`).catch((error) => {
			console.error(`Error loading component from path: ${path}`, error);
			return { default: () => <div>Error loading component</div> };
		})
	);
}
