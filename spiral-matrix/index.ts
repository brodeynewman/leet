function createPointKey(x, y): string {
    return JSON.stringify([x,y]);
}

function newVertex(pos: string, val: any) {
    return {
        pos,
        val,
        adjacencies: {
            north: null,
            south: null,
            east: null,
            west: null,
        },
    }
}

function addPoint(x, y, matrix, graph) {
    const currKey = createPointKey(x, y);
    const currVertex = newVertex(currKey, matrix[x][y]);

    // north
    if (matrix[x - 1] != null) {
        const val = matrix[x-1][y];
        const pKey = createPointKey(x - 1, y);
        const vertex = newVertex(pKey, val);

        currVertex.adjacencies.north = vertex;
        vertex.adjacencies.south = currVertex;
    }
    // south
    if (matrix[x + 1] != null) {
        const val = matrix[x + 1][y];
        const pKey = createPointKey(x + 1, y);
        const vertex = newVertex(pKey, val);

        currVertex.adjacencies.south = vertex;
        vertex.adjacencies.north = currVertex;
    }
    // east
    if (matrix[x] && matrix[x][y + 1] != null) {
        const val = matrix[x][y + 1]
        const pKey = createPointKey(x, y + 1);
        const vertex = newVertex(pKey, val);

        currVertex.adjacencies.east = vertex;
        vertex.adjacencies.west = currVertex;
    }
    // west
    if (matrix[x] && matrix[x][y - 1] != null) {
        const val = matrix[x][y - 1]
        const pKey = createPointKey(x, y-1);
        const vertex = newVertex(pKey, val);

        currVertex.adjacencies.west = vertex;
        vertex.adjacencies.east = currVertex;
    }

    graph[currKey] = currVertex;
}

function recurse(graph, matrix): number[] {
    const nodes = [];
    const visited = {};

    const key = createPointKey(0, 0);
    const point = graph[key];

    const stack = [point];

    while (stack.length) {
        const curr = stack.shift();
        visited[curr.pos] = true;

        nodes.push(curr.val)

        if (curr.adjacencies.east && !visited[curr.adjacencies.east.pos]) {
            // prefer north
            if (curr.adjacencies.north && !visited[curr.adjacencies.north.pos]) {
                stack.push(graph[curr.adjacencies.north.pos])
            } else {
                stack.push(graph[curr.adjacencies.east.pos])
            }
        } else if (curr.adjacencies.south && !visited[curr.adjacencies.south.pos]) {
            stack.push(graph[curr.adjacencies.south.pos])
        } else if (curr.adjacencies.west && !visited[curr.adjacencies.west.pos]) {
            stack.push(graph[curr.adjacencies.west.pos])
        } else if (curr.adjacencies.north && !visited[curr.adjacencies.north.pos]) {
            stack.push(graph[curr.adjacencies.north.pos])
        }
    }

    return nodes;
}

function spiralOrder(matrix: number[][]): number[] {
    const graph = {};

    // x
    for (let x = 0; x < matrix.length; x++) {
        // y
        for (let y = 0; y < matrix[x].length; y++) {
            addPoint(x, y, matrix, graph)
        }
    }

    const nodes = recurse(graph, matrix);

    return nodes;
};
