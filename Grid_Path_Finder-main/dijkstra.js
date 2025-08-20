// Dijkstra's Pathfinding Algorithm Implementation

//node constructor for Dijkstra
function point3(i, j, wall) {
    this.x = i;
    this.y = j;
    this.g = Infinity; // Initialize with infinity for Dijkstra
    this.parent = null;
    this.wall = wall;
}

//find neighbours function for Dijkstra
function findneighbours3(point, grid) {
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
        
        // Check bounds and wall status (wall == 1 means passable in Dijkstra)
        if (newI >= 0 && newI < c && newJ >= 0 && newJ < r && grid[newI][newJ].wall == 1) {
            neighbours.push(grid[newI][newJ]);
        }
    }
    
    return neighbours;
}

//Dijkstra search algorithm
function Dijkstra(given, start_i, start_j, end_i, end_j) {
    // Reset global arrays
    path = [];
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
            // Note: Dijkstra uses inverted wall logic (!given[i][j])
            grid[i][j] = new point3(i, j, !given[i][j]);
        }
    }
    
    // Initialize starting and ending points
    var start = grid[start_i][start_j];
    var end = grid[end_i][end_j];
    
    // Check if start or end is a wall (wall == 0 means blocked)
    if (start.wall == 0 || end.wall == 0) {
        console.warn("Start or end point is blocked");
        return [];
    }
    
    // Set starting point distance to 0
    start.g = 0;
    open.push(start);
    
    // Dijkstra's algorithm
    while (open.length > 0) {
        // Find node with lowest distance
        var lowest = 0;
        for (var i = 0; i < open.length; i++) {
            if (open[i].g < open[lowest].g) {
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
            var neighbours = findneighbours3(current, grid);
            
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                
                if (!close.includes(neighbour)) {
                    var tentativeDistance = current.g + 1; // Uniform cost of 1
                    
                    if (open.includes(neighbour)) {
                        if (tentativeDistance < neighbour.g) {
                            neighbour.g = tentativeDistance;
                            neighbour.parent = current;
                        }
                    } else {
                        neighbour.g = tentativeDistance;
                        neighbour.parent = current;
                        open.push(neighbour);
                    }
                }
            }
        }
    }
    
    // No path found
    console.warn("No path found");
    return [];
}