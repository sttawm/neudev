var vows = require("vows"),
    assert = require("assert"),
    utils = require("./test-utils"),
    reportPair = require("../lib/set-reporter"),
    neudev = require("../"),
    naive = require("../lib/naive"),
    tiled = require("../lib/tiled"),
    generate = require("./generate");

var suite = vows.describe("neudev");
var asSet = utils.asSet;

suite.addBatch({
    "devai-neumann": {
        "empty-list": function () {
            test([], []);
        },
        "singleton list": function () {
            test([[0, 0, 1, 1]], []);
        },
        "two disjoint": function () {
            test([[0, 0, .9, .9], [1, 1, 2, 2]], []);
        },
        "two overlap": function() {
            test([[0, 0, 2, 2], [1, 1, 3, 3]], ["0/1"]);
        },
        "within": function() {
            test([[0, 0, 3, 3], [1, 1, 2, 2]], ["0/1"]);
        },
        "x-overlaps but y doesnt": function() {
            test([[0, 0, 4, 1], [1, 2, 3, 3]], []);
        },
        "same y": function() {
            test([[0, 0, 2, 1],[5, 5, 6, 6], [1, 0, 3, 1]], ["0/2"]);
        },
        "identical": function() {
            test([[0, 0, 1, 1], [0, 0, 1, 1]], ["0/1"]);
        },
        "three-chain": function() {
            test([[0, 0, 2, 1], [1, 0, 3, 1], [2, 0, 4, 1]], ["0/1", "1/2"])
        },
        "random" : function() {
            for (var i = 0; i < 1000; i++) {
                var S = generate(100, [0, 0, 100, 100], 15, 15);
                var p0 = pairs(naive(), S);
                var p1 = pairs(neudev(), S);
                var p2 = pairs(tiled(), S);
                assert.deepEqual(p1, p0);
                assert.deepEqual(p2, p0);
            }
        }
    }
});

function test(rectangles, expected) {
    for (var i = 0; i < 2; i++) {
        var rep = reportPair();
        var report = neudev(); //.reuse(!!i);
        report(rectangles, rep);
        assert.deepEqual(rep.pairs(), asSet(expected));
    }
}

function pairs(alg, rectangles) {
    var reporter = reportPair();
    alg(rectangles, reporter);
    return reporter.pairs();
}

suite.export(module);
