A javascript implementation of [A Rectangle-Intersection Algorithm with Limited Resource Requirements. Authors: Devai, F, Neumann L.](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=5578313)

## Install
npm install

## Test
npm test

## Overview
Algorithms for reporting intersections between bounding boxes.

Use like:

```javascript
var alg = intersectionAlgorithm(),
    S = [bbox_1, bbox_2, ... bbox_n],
    reportPair = function (i, j) {
    // do something with i and j, the indices of the intersecting bounding boxes
    // note that duplicates may be reported
    };

// Report the intersecting bounding boxes
alg(S, reportPair);
```

### Naive

The naive algorithm, with run-time O(n^2).

```javascript
var naive = naive();
```

### Tiled

A tile-based algorithm, that first breaks the space into tiles, before running the naive algorithm on each tile.

```javascript
// Subdivide the x-space twice, into 4 partitions of equal width
// Subdivide the y-space four times, into 16 partitions of equal height.
var tiled = tiled().xdepth(2).ydepth(4);
```

### Devai-Neumann


A [theoretically optimal algorithm](http://www.icrea.cat/Web/GetFile.asmx/Download?idFile=1IXMTNPNqJ4=)

```javascript
var neudev = neudev();
```

	
