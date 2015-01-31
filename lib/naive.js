module.exports = function() { 
    'use strict';

    var accessors = function(S) {
            return {
                xl: function (i) { return S[i][0]; },
                yl: function (i) { return S[i][1]; },
                xh: function (i) { return S[i][2]; },
                yh: function (i) { return S[i][3]; },
            }
        };

    function report(S, reportPair) {
        var ctx = accessors(S);
        for (var i = 0, n = S.length; i < n; i += 1) {
            for (var j = i + 1; j < n; j += 1) {
                if (intersects(i, j, ctx)) {
                    reportPair(i, j, ctx);
                }
            }
        }
    }

    function intersects(i, j, ctx) {
        return !(
            ctx.xh(i) < ctx.xl(j) || ctx.xl(i) > ctx.xh(j) || 
            ctx.yh(i) < ctx.yl(j) || ctx.yl(i) > ctx.yh(j));
    }

    report.accessors = function(x) {
        if (!arguments.length) {
            return accessors;
        }
        accessors = x;
    };

    return report;
};
