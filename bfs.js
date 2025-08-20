// Breadth-First Search (BFS) Pathfinding Algorithm Implementation

//node constructor for BFS
function point2(i, j, wall) {
    this.x = i;
    this.y = j;
    this.parent = null;
    this.wall = wall;
}

//find neighbours function for BFS
function findneighbours2(point, grid) {
    var i = point.x;
    var j = point.y;
    var neighbours = [];
    
    // Check all four directions: up, down, left, right
    var directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];
    
    for (var d = 0; d < directions.length; d++) {
        var newI = i + directions[d][0];
        var newJ = j + directions[d][1];
        
        // Check bounds and wall status (note: wall == 1 means passable in BFS)
        if (newI >= 0 && newI < c && newJ >= 0 && newJ < r && grid[newI][newJ].wall == 1) {
            neighbours.push(grid[newI][newJ]);
        }
    }
    
    return neighbours;
}

//BFS search algorithm
function BFS(given, start_i, start_j, end_i, end_j) {
    // Reset global arrays
    open = [];
    close = [];
    
    c = given.length;
    r = given[0].length;
    
    // Validate inputs
    if (start_i < 0 || start_i >= c || start_j < 0 || start_j >= r ||
        end_i < 0 || end_i >= c || end_j < 0 || end_j >= r) {
        console.error("Invalid start or end coordinates");
        return [];
    }
    
    // Initialize the grid
    var grid = new Array(c);
    for (var i = 0; i < c; i++) {
        grid[i] = new Array(r);
    }
    
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            // Note: BFS uses inverted wall logic (!given[i][j])
            grid[i][j] = new point2(i, j, !given[i][j]);
        }
    }
    
    var start = grid[start_i][start_j];
    var end = grid[end_i][end_j];
    
    // Check if start or end is a wall (wall == 0 means blocked in BFS)
    if (start.wall == 0 || end.wall == 0) {
        console.warn("Start or end point is blocked");
        return [];
    }
    
    open.push(start);
    
    // BFS uses queue (FIFO) - process nodes in order they were added
    while (open.length > 0) {
        // Take first element (queue behavior)
        var current = open.shift();
        
        // Path found
        if (current === end) {
            var path = [];
            var temp = current;
            
            while (temp.parent != null) {
                path.push([temp.x, temp.y]);
                temp = temp.parent;
            }
            
            path.push([start.x, start.y]);
            path.reverse();
            
            return path;
        } 
        else {
            close.push(current);
            
            var neighbours = findneighbours2(current, grid);
            
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                
                // Add to queue if not already visited or queued
                if (!close.includes(neighbour) && !open.includes(neighbour)) {
                    neighbour.parent = current;
                    open.push(neighbour);
                }
            }
        }
    }
    
    // No path found
    console.warn("No path found");
    return [];
}