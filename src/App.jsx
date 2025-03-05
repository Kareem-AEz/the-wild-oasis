import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckInBooking from "./features/check-in-out/CheckInBooking";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000, // 1 minute
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter
					future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
				>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={
									<Navigate
										replace
										to="dashboard"
									/>
								}
							/>
							<Route
								path="dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="bookings"
								element={<Bookings />}
							/>
							<Route
								path="bookings/:bookingId"
								element={<Booking />}
							/>
							<Route
								path="checkin/:bookingId"
								element={<CheckInBooking />}
							/>
							<Route
								path="cabins"
								element={<Cabins />}
							/>
							<Route
								path="users"
								element={<Users />}
							/>
							<Route
								path="settings"
								element={<Settings />}
							/>
							<Route
								path="account"
								element={<Account />}
							/>
						</Route>

						<Route
							path="login"
							element={<Login />}
						/>
						<Route
							path="*"
							element={<PageNotFound />}
						/>
					</Routes>
				</BrowserRouter>
				<Toaster
					position="top-center"
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "1.6rem",
							backgroundColor: "var(--color-grey-0)",
							color: "var(--color-grey-700)",
							padding: "1.6rem 2.4rem",
							maxWidth: "40rem",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
