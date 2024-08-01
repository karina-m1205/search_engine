function mySplit(str) {
    if (typeof str !== "string") {
        return [];
    }
    if (str.trim() === "") {
        return [];
    }
    let arr = str.trim().split(" ");
    return arr;
}
function myRun(str) {
    if (typeof str !== "string") {
        return [];
    }
    if (str.trim() === "") {
        return [];
    }
    let arr = str.trim().split(" ");
    return arr;
}

module.exports.mySplit = mySplit;
module.exports.myRun = myRun;