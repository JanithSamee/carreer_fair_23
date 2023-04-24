import useAuth from "./AuthProvider";
import LoadingPage from "../../components/common/LoadingComp";
import Unauthorized from "../../components/common/Unauthorized";

function PrivateAdminRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading || user == {}) {
        return <LoadingPage></LoadingPage>;
    } else {
        return user.role && user.role === "admin" ? (
            <>{children}</>
        ) : (
            <Unauthorized></Unauthorized>
        );
    }
}

export default PrivateAdminRoute;
