module.exports = (function() {
    var utils = {};

    utils.asSet = function(list) {
        var o = {};
        for (var i = 0; i < list.length; i++) {
            o[list[i]] = true;
        }
        return o;
    };

    return utils;

})();
