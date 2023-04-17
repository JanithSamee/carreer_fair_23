import useAuth from "./AuthProvider";
import LoadingPage from "../../components/common/LoadingComp";
import Unauthorized from "../../components/common/Unauthorized";
import { useEffect, useState } from "react";

function PrivateStudentRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading || user == {}) {
        return <LoadingPage></LoadingPage>;
    } else {
        return user.role || user.role === "student" ? (
            <>{children}</>
        ) : (
            <Unauthorized></Unauthorized>
        );
    }
}

export default PrivateStudentRoute;
