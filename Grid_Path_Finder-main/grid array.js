/*
This is run once when the file is included in script in the html file.
The array of maximum pre-defined size is created with all entries as 0 initially.
This array is represented in the form of a grid formed using <div></div> for each array element. 
When resizing of array is done, the immediate next row and column after the specified size is set to 1 so that they are identified as obstacles. All other elements are set to 0 again.
The grid visible has size as specified by user. 
The values of the array elements are modified using the arrayManipulator() according to the clicked <div></div>

*/

var array = [];

function setArray() {
    array = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for(let j = 0; j < cols; j++) {
            row.push(0);
        }
        array.push(row);
    }
}

// Utility function to get optimal grid size based on screen size
function getOptimalGridSize() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    
    var optimalRows, optimalCols;
    
    if (screenWidth <= 320) {
        // Very small screens (old phones)
        optimalRows = 15;
        optimalCols = 20;
    } else if (screenWidth <= 480) {
        // Small phones
        optimalRows = 20;
        optimalCols = 25;
    } else if (screenWidth <= 768) {
        // Tablets and large phones
        optimalRows = 25;
        optimalCols = 35;
    } else if (screenWidth <= 1024) {
        // Small laptops and tablets in landscape
        optimalRows = 30;
        optimalCols = 45;
    } else {
        // Desktop and large screens
        optimalRows = 42;
        optimalCols = 60;
    }
    
    return {
        rows: Math.min(optimalRows, 42),
        cols: Math.min(optimalCols, 60)
    };
}

// Function to validate and adjust grid size for current screen
function validateGridSize(targetRows, targetCols) {
    var optimal = getOptimalGridSize();
    
    // Ensure we don't exceed optimal size for current screen
    var validRows = Math.min(targetRows, optimal.rows);
    var validCols = Math.min(targetCols, optimal.cols);
    
    // Ensure minimum size
    validRows = Math.max(validRows, 2);
    validCols = Math.max(validCols, 2);
    
    return {
        rows: validRows,
        cols: validCols
    };
}

function initializeArrayOptimized(targetRows, targetCols) {
    var validated = validateGridSize(targetRows, targetCols);
    
    // Clear existing array to free memory
    if (array.length > 0) {
        array.length = 0;
    }
    
    // Create new array with validated dimensions
    array = new Array(validated.rows);
    for (let i = 0; i < validated.rows; i++) {
        array[i] = new Array(validated.cols).fill(0);
    }
    
    return validated;
}