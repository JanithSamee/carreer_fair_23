import React, { createContext, useState, useEffect, useContext } from "react";
import {
    auth,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "../firebase/firebaseConfig";
import { formatUserFromAuth } from "../helpers/formatter";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider({ children }) {
    const [user, setuser] = useState({});
    const [loading, setloading] = useState(false);
    const [initialLoad, setinitialLoad] = useState(true);
    const navigate = useNavigate();

    async function signIn(email, password) {
        setloading(true);
        const _res = await signInWithEmailAndPassword(auth, email, password);
        if (_res) {
            const _user = formatUserFromAuth(_res.user);
            setuser(_user);

            if (!_user.emailVerified) {
                await sendEmailVerification(auth.currentUser);
                return navigate("/verify-email");
            }

            if (_user.role === "student") {
                navigate("/student/dashboard");
                window.location.reload();
            } else if (_user.role === "admin") {
                navigate("/admin/dashboard");
                window.location.reload();
            } else {
                navigate("/tbe");
            }
        } else {
            setuser({});
        }
        setloading(false);
    }

    async function logout() {
        setloading(true);
        await auth.signOut();
        setloading(false);
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        //console.count("auth");
        setinitialLoad(false);

        return auth.onAuthStateChanged((_user) => {
            console.log("at provider begin");
            if (_user) {
                console.log("at provider end");
                const currentDate = new Date();

                const _fUser = formatUserFromAuth(_user);
                if (!_fUser.emailVerified) {
                    return navigate("/verify-email");
                }
                localStorage.setItem("token", _fUser.token);
                if (_fUser.tokenExp < currentDate.getTime()) {
                    return setuser({});
                }
                setuser(_fUser);
            } else {
                setuser({});
            }
        });
    }, []);

    return (
        <authContext.Provider
            value={{ user, signIn, loading, logout, setuser }}
        >
            {children}
        </authContext.Provider>
    );
}
