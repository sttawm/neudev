/**
 * Generate 'n' rectangles, with centroids in the 'bounds', with x and y span
 * 'dx' and 'dy', and place them in 'S'.
 */
module.exports = function generate(n, bounds, dx, dy) {
    var S = [],
        w = bounds[2] - bounds[0];
        h = bounds[3] - bounds[1];

    for (var i = 0; i < n; i++) {
        var x = Math.random() * w + bounds[0] - dx / 2,
            y = Math.random() * h + bounds[1] - dy / 2;

        S.push([x, y, x + dx, y + dy]);
    }
    return S;
}
