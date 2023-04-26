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

function UTCStringToCommon(_date) {
    try {
        const date = new Date(_date);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    } catch (error) {
        return "";
    }
}

function getTimeCounter(_date) {
    try {
        const futureDate = new Date(_date); // Example future date
        const currentDate = new Date(); // Current date

        const timeDiff = futureDate.getTime() - currentDate.getTime(); // Time difference in milliseconds
        const seconds = Math.floor(timeDiff / 1000); // Convert milliseconds to seconds
        const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
        const hours = Math.floor(minutes / 60); // Convert minutes to hours
        const days = Math.floor(hours / 24); // Convert hours to days

        let remainingTime = "";
        if (days > 0) {
            remainingTime = days + " days left";
        } else if (hours > 0) {
            remainingTime = hours + " hours left";
        } else if (minutes > 0) {
            remainingTime = minutes + " minutes left";
        } else if (seconds > 0) {
            remainingTime = seconds + " seconds left";
        } else {
            remainingTime = "Expired";
        }

        return remainingTime; // Output: "4 days left" (assuming current date is 27 April 2023)
    } catch (error) {
        return ""; // Output: "4 days left" (assuming current date is 27 April 2023)
    }
}

export {
    formatUserFromAuth,
    formatError,
    ISOtimestringLocalTimeString,
    UTCStringToCommon,
    getTimeCounter,
};
