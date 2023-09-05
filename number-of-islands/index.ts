type Geo = "0" | "1";

class Vertex {
    loc: string;
    type: Geo;
    adjacencies: { [key: string]: Vertex }

    constructor(loc: string, type: Geo) {
        this.loc = loc;
        this.type = type

        this.adjacencies = {};
    }

    addRoute(loc: string, vertex: Vertex) {
        // add the point to the target vertex
        if (!this.adjacencies[loc]) {
            this.adjacencies[loc] = vertex;
        }

        vertex.adjacencies[this.loc] = this;
    }
}

class Graph {
    vertices: { [key: string]: Vertex }

    constructor() {
        this.vertices = {};
    }

    addPoint(loc: string, v: Vertex) {
        this.vertices[loc] = v;
    }
}

function addDirectionalPoints(x, y, vertex, grid) {
    // north
    if (grid[x - 1] != null) {
        const type = grid[x - 1][y];
        const nLoc = JSON.stringify([x-1, y]);
        const v = new Vertex(nLoc, type);
        vertex.addRoute(nLoc, v);
    }
    // south
    if (grid[x + 1] != null) {
        const type = grid[x + 1][y]
        const nLoc = JSON.stringify([x+1, y]);
        const v = new Vertex(nLoc, type);
        vertex.addRoute(nLoc, v);
    }
    // east
    if (grid[x] && grid[x][y + 1] != null) {
        const type = grid[x][y + 1]
        const nLoc = JSON.stringify([x, y+1]);
        const v = new Vertex(nLoc, type);
        vertex.addRoute(nLoc, v);
    }
    // west
    if (grid[x] && grid[x][y-1] != null) {
        const type = grid[x][y-1]
        const nLoc = JSON.stringify([x, y-1]);
        const v = new Vertex(nLoc, type);
        vertex.addRoute(nLoc, v);
    }
}

function buildGraph(grid): Graph {
    const g = new Graph();

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const pos = JSON.stringify([x, y])
            const v = new Vertex(pos, grid[x][y]);

            addDirectionalPoints(x, y, v, grid);

            g.addPoint(pos, v)
        }
    }

    return g;
}

function rescurseIslandTypes(v: Vertex, g: Graph, visited) {
    visited[v.loc] = true;

    if (!Object.keys(v.adjacencies).length) {
        return;
    }

    Object.values(v.adjacencies).forEach((adj) => {
        if (adj.type === "1" && !visited[adj.loc]) {
            const target = g.vertices[adj.loc];
            return rescurseIslandTypes(target, g, visited);
        }
    })
}

function markVisited(p: Vertex, g: Graph, visited: { [key: string]: boolean }) {
    const queue = [p];

    while (queue.length) {
        const pop = queue.shift();
        visited[pop.loc] = true;

        Object.values(pop.adjacencies).forEach(adj => {
            if (!visited[adj.loc] && adj.type === "1") {
                queue.push(adj)
                rescurseIslandTypes(g.vertices[adj.loc], g, visited);
            }
        })
    }
}

function numIslands(grid: string[][]): number {
    const g = buildGraph(grid);
    const visited = {};
    let islands = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const pos = JSON.stringify([x, y])
            const p = g.vertices[pos];

            if (p && p.type === "1") {
                if (!visited[p.loc]) {
                    // a new island is started... lets see how much
                    // land it covers
                    islands++;
                    // start of an island
                    markVisited(p, g, visited);
                } 
            }
        }
    }

    return islands;
};
