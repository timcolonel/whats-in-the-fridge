var eachSlice = function (array, size, callback) {
    for (var i = 0, l = array.length; i < l; i += size) {
        callback.call(array, array.slice(i, i + size));
    }
};
