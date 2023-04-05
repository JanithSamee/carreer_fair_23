import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import Company from "./pages/Company";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={Login} />
				<Route path="/SignUp" Component={SignUp} />
				<Route path="/Company" Component={Company} />
				<Route path="/Admin" Component={Admin} />
			</Routes>
		</Router>
	);
}

export default App;
