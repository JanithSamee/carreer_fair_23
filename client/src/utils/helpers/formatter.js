function formatUserFromAuth(user) {
    let role = "";

    if (user.reloadUserInfo && user.reloadUserInfo.customAttributes) {
        try {
            var jsonString = user.reloadUserInfo.customAttributes;
            role = JSON.parse(jsonString).role;
        } catch (error) {
            role = "";
        }
    }

    return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        token: user.accessToken,
        tokenExp: user.stsTokenManager && user.stsTokenManager.expirationTime,
        role: role,
        photoURL: user.photoURL,
    };
}
function formatError(error) {
    if (error.response) {
        return (
            error.response.data || {
                error: true,
                data: error.message || "Uknown Error!",
            }
        );
    } else if (error.message) {
        return { error: true, data: error.message };
    } else {
        return { error: true, data: "Uknown Error Occured!" };
    }
}
export { formatUserFromAuth, formatError };
