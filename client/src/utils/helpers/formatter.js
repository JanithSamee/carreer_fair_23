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

function ISOtimestringLocalTimeString(_date) {
    try {
        // const _date = new Date();
        // const timeOffset = _date.getTimezoneOffset();
        // const newDate = new Date(date);

        // const dateString = new Date(newDate - timeOffset).toISOString();
        // return date.slice(0, 19);
        const date = new Date(_date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const second = date.getSeconds().toString().padStart(2, "0");
        const localTime = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
        return localTime;
    } catch (error) {
        return undefined;
    }
}
export { formatUserFromAuth, formatError, ISOtimestringLocalTimeString };
