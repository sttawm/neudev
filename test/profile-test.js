var vows = require("vows"),
    assert = require("assert"),
    utils = require("./test-utils"),
    reportPair = require("../lib/set-reporter"),
    naive = require("../lib/naive"),
    tiled = require("../lib/tiled"),
    neudev = require("../"),
    //NanoTimer = require("nanotimer"),
    generate = require("./generate");

var checkEquality = true; // if true, may confound the profiling results
var suite = vows.describe("profile");
var asSet = utils.asSet;

if (!checkEquality) {
    reportPair = function () {}
}

suite.addBatch({
    "profile": function () {
        profile(100, 5, 5, 400);
        profile(200, 5, 5, 400);
        profile(400, 5, 5, 400);
        profile(800, 5, 5, 400);
    }
});

function profile(n, dx, dy, k) {

    var testData = [],
        alg1 = neudev(),
        alg2 = naive();
        alg3 = tiled();

    for (var i = 0; i < k; i++) {
        testData.push(generate(n, [0, 0, 100, 100], dx, dy));
    }

    function time(fn) {
        var start = new Date().getTime();
        fn();
        return new Date().getTime() - start;
    }

    //var timerObject = new NanoTimer();


    console.log("------------------------------------------------");
    console.log("------- " + n + " rectangles, where h=" + dy + " and w=" + dx + " --------");
    console.log("------------------------------------------------");

    // "warm up"
    run(neudev(), testData)();
    run(naive(), testData)();
    run(tiled(), testData)();

    var t1 = time(run(neudev(), testData));
    console.log("Neudev: " + t1 + "ms at " + (t1 / k) + "ms per run");

    var t2 = time(run(naive(), testData));
    console.log("Naive:" + t2 +  "ms at " + (t2 / k) + "ms per run");

    var t3 = time(run(tiled(), testData));
    console.log("Tiled: " + t3 + "ms at " + (t3 / k) + "ms per run");

}

function run(algorithm, testData) {
    return function () {
        for (var i = 0; i < testData.length; i++) {
            algorithm(testData[i], function () {});
        }
    }
}

suite.export(module);
