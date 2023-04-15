import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import SignUp from "./pages/SignUp";
import Company from "./pages/Company";
import { AuthProvider } from "./utils/providers/AuthProvider";
import StudentDashboard from "./pages/student/Dashboard";
import NotFound from "./pages/NotFound";
import Unauthorized from "./components/common/Unauthorized";
import PrivateStudentRoute from "./utils/providers/StudentPrivateRoutes";
function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" Component={Login} />
                    <Route path="/SignUp" Component={SignUp} />
                    <Route path="/Company" Component={Company} />
                    <Route path="/Admin" Component={Admin} />
                    <Route path="/student">
                        <Route
                            path="dashboard"
                            element={
                                <PrivateStudentRoute>
                                    <StudentDashboard></StudentDashboard>
                                </PrivateStudentRoute>
                            }
                        />
                    </Route>
                    <Route path="*" Component={NotFound} />
                    <Route path="/unauthorized" Component={Unauthorized} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
