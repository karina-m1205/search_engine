function mySplit(str) {
    if (typeof str != "string" || !str.trim()) {
        return [];
    }
    const regExp = /[^\w\s]|_/g;
    const result = str.replaceAll(regExp, " ").trim().split(" ");
    return result;
}

module.exports.mySplit = mySplit;
