function formatError(error) {
    if (error.message && typeof error.message === "string") {
        return error.message;
    } else {
        return "Something went wrong.";
    }
}

function validateIndex(index = "sfds") {
    const regex = /^(18|19|20|21)\d{4}[A-Za-z]$/;
    if (regex.test(index)) {
        return true;
    } else {
        return false;
    }
}

export { formatError, validateIndex };
