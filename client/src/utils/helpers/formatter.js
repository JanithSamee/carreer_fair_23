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
    };
}

export { formatUserFromAuth };
