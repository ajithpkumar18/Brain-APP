import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import OtherDash from "./pages/OtherDash";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { Private } from "./pages/Private/Private";
import { Anonymous } from "./pages/Anonymous/Anonymous";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route element={<Anonymous />}>
					<Route path='/signin' element={<Signin />} />
					<Route path='/signup' element={<Signup />} />
				</Route>
				<Route
					path='/dashboard'
					element={
						<Private>
							<Dashboard />
						</Private>
					}
				/>
				<Route path='/dashboard/:id' element={<OtherDash />} />
				<Route path='/notfound' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
