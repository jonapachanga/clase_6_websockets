const toObject = (string) => {
    return JSON.parse(string)
}

const toString = (object) => {
    return JSON.stringify(object, null, 2);
}

module.exports = {
    toString,
    toObject
}
