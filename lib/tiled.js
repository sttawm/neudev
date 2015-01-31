/**
 * First tiles the bounding boxes according to 'xdepth' and 'ydepth'
 */
module.exports = function() { 
    'use strict';

    var xdepth = 4,
        ydepth = 4,
        accessors = function(S) {
            return {
                xl: function (i) { return S[i][0]; },
                yl: function (i) { return S[i][1]; },
                xh: function (i) { return S[i][2]; },
                yh: function (i) { return S[i][3]; },
            }
        };

    function report(S, reportPair) {

        if (S.length < 2) {
            return;
        }

        var ctx = accessors(S),
            b = bounds(S, ctx);

        tileReport(xrange(S.length), 0, b[0], b[1], b[2], b[3], reportPair, ctx);
    }

    function arrayItr(arr) {
        var n = arr.length;
        return function (i) {
            if (i == null) {
                i = 0;
            }
            return {
                hasNext : function () {
                    return i < n;
                },
                next : function () {
                    return arr[i++];
                },
                atIndex : function (_i) {
                    i = _i;
                }
            };
        }
    }

    function xrange(n) {
        return function (i) {
            if (i == null) {
                i = 0;
            }
            return {
                hasNext : function () {
                    return i < n;
                },
                next : function () {
                    return i++;
                },
                atIndex : function (_i) {
                    i = _i;
                }
            };
        }
    }

    function tileReport(S, depth, xmin, ymin, xmax, ymax, reportPair, ctx) {
        if (depth >= xdepth && depth >= ydepth) {
            /**
             * Base-case.
             */
            var itr0 = S(0),
                itr1 = S(),
                i = 0,
                a,
                b;

            while (itr0.hasNext()) {
                a = itr0.next();
                itr1.atIndex(i + 1);
                while (itr1.hasNext()) {
                    var b = itr1.next();
                    if (intersects(a, b, ctx)) {
                        reportPair(a, b);
                    }
                }
                i += 1;
            }

        } else {
            /**
             * Recursive-case.
             */
            var xsplit = depth < xdepth,
                ysplit = depth < ydepth,
                xmid = xsplit? -Infinity : (xmax - xmin) / 2,
                ymid = ysplit? -Infinity : (ymax - ymin) / 2,
                t00 = xsplit && ysplit? [] : null,
                t01 = xsplit? [] : null,
                t10 = ysplit? [] : null,
                t11 = [];

            S = S();
            while (S.hasNext()) {
                var r = S.next();
                if (ctx.xl(r) < xmid) {
                    if (ctx.yl(r) < ymid) {
                        t00.push(r);
                    }
                    if (ctx.yh(r) >= ymid) {
                        t01.push(r);
                    }
                }
                if (ctx.xh(r) >= xmid) {
                    if (ctx.yl(r) < ymid) {
                        t10.push(r);
                    }
                    if (ctx.yh(r) >= ymid) {
                        t11.push(r);
                    }
                }
            }

            depth += 1;
            if (t00 && t00.length) {
                tileReport(arrayItr(t00), depth, xmin, xmid, ymin, ymid, reportPair, ctx);
            }
            if (t01 && t01.length) {
                tileReport(arrayItr(t01), depth, xmin, xmid, ymid, ymax, reportPair, ctx);
            }
            if (t10 && t10.length) {
                tileReport(arrayItr(t10), depth, xmid, xmax, ymin, ymid, reportPair, ctx);
            }
            if (t11.length) {
                tileReport(arrayItr(t11), depth, xmid, xmax, ymid, ymax, reportPair, ctx);
            }
        }
    }

    function intersects(i, j, ctx) {
        return !(
            ctx.xh(i) < ctx.xl(j) || ctx.xl(i) > ctx.xh(j) || 
            ctx.yh(i) < ctx.yl(j) || ctx.yl(i) > ctx.yh(j));
    }

    function bounds(S, ctx) {
        var xmin = ctx.xl(0),
            xmax = ctx.xh(0),
            ymin = ctx.yl(0),
            ymax = ctx.yh(0);

        for (var i = 1, n = S.length; i < n; i += 1) {
            if (ctx.xl(i) < xmin) {
                xmin = ctx.xl(i);

            } else if (ctx.xh(i) > xmax) {
                xmax = ctx.xh(i);
            }

            if (ctx.yl(i) < xmin) {
                xmin = ctx.yl(i);

            } else if (ctx.yh(i) > xmax) {
                xmax = ctx.yh(i);
            }
        }

        return [xmin, ymin, xmax, ymax];
    }

    report.xdepth = function(x) {
        if (!arguments.length) {
            return xdepth;
        }
        xdepth = x;
        return this;
    };

    report.ydepth = function(x) {
        if (!arguments.length) {
            return ydepth;
        }
        ydepth = x;
        return this;
    };

    report.accessors = function(x) {
        if (!arguments.length) {
            return accessors;
        }
        accessors = x;
        return this;
    };

    return report;
};
