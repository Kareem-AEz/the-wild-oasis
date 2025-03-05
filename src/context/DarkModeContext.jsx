import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useLocalStorage(
		"darkMode",
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark-mode");
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.add("light-mode");
			document.documentElement.classList.remove("dark-mode");
		}
	}, [darkMode]);

	function toggleDark() {
		setDarkMode((d) => !d);
	}
	return (
		<DarkModeContext.Provider value={{ toggleDark, darkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error("useDarkMode must be used within a DarkModeProvider");
	}
	return context;
}

export { DarkModeProvider, useDarkMode };
