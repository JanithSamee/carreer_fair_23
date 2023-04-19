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
import VerfyTheEmail from "./pages/VerfyTheEmail";
function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" Component={Login} />
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/company" Component={Company} />
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
                    <Route path="/admin">
                        {/* TODO: add private routes */}
                        <Route path="dashboard" element={<Admin></Admin>} />
                    </Route>
                    <Route path="*" Component={NotFound} />
                    <Route path="/unauthorized" Component={Unauthorized} />
                    <Route path="/verify-email" Component={VerfyTheEmail} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
