const logFormatter = (message) => {
    return "[" + new Date().toJSON().slice(0, 19).replace(/[-T]/g, ":") + "] " + message;
};

export { logFormatter };
