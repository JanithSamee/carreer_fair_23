import useAuth from "./AuthProvider";
import LoadingPage from "../../components/common/LoadingComp";
import Unauthorized from "../../components/common/Unauthorized";

function CoordinatorPrivateRoutes({ children }) {
    const { user, loading } = useAuth();

    if (loading || user == {}) {
        return <LoadingPage></LoadingPage>;
    } else {
        return user.role && user.role === "coordinator" ? (
            <>{children}</>
        ) : (
            <Unauthorized></Unauthorized>
        );
    }
}

export default CoordinatorPrivateRoutes;
