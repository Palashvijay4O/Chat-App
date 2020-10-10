let id = 0;
const generateMessage = (username, text) => {
    id += 1;
    return {
        id,
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (username, text) => {
    id += 1;
    return {
        id,
        username,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}