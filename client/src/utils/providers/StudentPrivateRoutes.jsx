import useAuth from "./AuthProvider";
import LoadingPage from "../../components/common/LoadingComp";
import Unauthorized from "../../components/common/Unauthorized";

function PrivateStudentRoute({ children }) {
    const { user, loading } = useAuth();
    const isStudent = user?.role === "student";
    if (loading) {
        return <LoadingPage></LoadingPage>;
    }

    return isStudent ? <>{children}</> : <Unauthorized></Unauthorized>;
}

export default PrivateStudentRoute;
