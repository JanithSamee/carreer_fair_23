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
import PrivateAdminRoute from "./utils/providers/AdminPrivateRoutes";
import VerfyTheEmail from "./pages/VerfyTheEmail";
import Navbar from "./components/common/NavBar";
import { Box } from "@chakra-ui/react";
import About from "./pages/About";
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
                                    <Navbar></Navbar>
                                    <StudentDashboard></StudentDashboard>
                                </PrivateStudentRoute>
                            }
                        />
                    </Route>
                    <Route path="/admin">
                        <Route
                            path="dashboard"
                            element={
                                <PrivateAdminRoute>
                                    <Admin></Admin>
                                </PrivateAdminRoute>
                            }
                        />
                    </Route>
                    <Route path="*" Component={NotFound} />
                    <Route path="/unauthorized" Component={Unauthorized} />
                    <Route path="/verify-email" Component={VerfyTheEmail} />
                    <Route path="/about" Component={About} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
