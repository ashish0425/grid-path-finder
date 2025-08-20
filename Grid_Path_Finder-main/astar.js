//  (A-star) Pathfinding Algorithm Implementation

//heuristic function
function heuristic1(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    dx = Math.abs(dx);
    dy = Math.abs(dy);
    
    return dx + dy; // Manhattan distance
}

//node constructor
function point1(i, j, wall) {
    this.x = i;
    this.y = j;
    
    this.f = 0;
    this.g = 0;
    this.h = 0;
    
    this.parent = null;
    this.wall = wall;
}

//find neighbours function
function findneighbours1(point, grid) {
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
        
        // Check bounds and wall status
        if (newI >= 0 && newI < c && newJ >= 0 && newJ < r && grid[newI][newJ].wall == 0) {
            neighbours.push(grid[newI][newJ]);
        }
    }
    
    return neighbours;
}

//Astar search algorithm
function Astar(given, start_i, start_j, end_i, end_j) {
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
            grid[i][j] = new point1(i, j, given[i][j]);
        }
    }
    
    // Initialize starting and ending points
    var start = grid[start_i][start_j];
    var end = grid[end_i][end_j];
    
    // Check if start or end is a wall
    if (start.wall == 1 || end.wall == 1) {
        console.warn("Start or end point is a wall");
        return [];
    }
    
    open.push(start);
    
    // Start searching
    while (open.length > 0) {
        // Find node with lowest f score
        var lowest = 0;
        for (var i = 0; i < open.length; i++) {
            if (open[i].f < open[lowest].f) {
                lowest = i;
            }
        }
        
        var current = open[lowest];
        
        // Path found
        if (current === end) {
            var path = [];
            var temp = current;
            
            while (temp.parent) {
                path.push([temp.x, temp.y]);
                temp = temp.parent;
            }
            
            path.push([start.x, start.y]);
            path.reverse();
            
            return path;
        } 
        else {
            // Move current from open to closed
            const index = open.indexOf(current);
            open.splice(index, 1);
            close.push(current);
            
            // Explore neighbours
            var neighbours = findneighbours1(current, grid);
            
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                
                if (!close.includes(neighbour)) {
                    var tentativeG = current.g + 1;
                    
                    if (open.includes(neighbour)) {
                        if (tentativeG < neighbour.g) {
                            neighbour.g = tentativeG;
                        }
                    } else {
                        neighbour.g = tentativeG;
                        open.push(neighbour);
                    }
                    
                    neighbour.h = heuristic1(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = current;
                }
            }
        }
    }
    
    // No path found
    console.warn("No path found");
    return [];
}