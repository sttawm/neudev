/**
 * A reportPair() function that stores the pairs in a set.
 * Provides a "pairs()" function to return the pairs.
 * This is useful for testing.
 */ 
module.exports = function () {
    'use strict';

    var pairs = {};

    function reportPair(i, j) {
        if (j < i) {
            reportPair(j, i);

        } else {
            pairs[i + "/" + j] = true;
        }
    }

    reportPair.pairs = function () {
        return pairs;
    };

    return reportPair;
};
