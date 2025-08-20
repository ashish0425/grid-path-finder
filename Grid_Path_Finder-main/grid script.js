/*
This file is the main .js file in which all the event-listeners are defined 
*/
var open = [];			// the common array for algo files
var close = [];			// the common array for algo files
var path = [];			// the common array of path required for algo files

var rows = 25;			// Reduced default size for better mobile experience
var cols = 35;			// Reduced default size for better mobile experience

var actionFlag = 'W';		//to determine which action has to be performed on clicking of grid elements
var selectedAlgo = 1;		//specify which algo is selected for searching

var start_i = 0 , start_j = 0;	//the coordinates of starting point

var end_i = rows-1 , end_j = cols-1;	//the coordinates of destination point

var count_of_search = 0;		//keeping a count of how many times search button has been clicked for a particular grid

var bi = '';

document.addEventListener("DOMContentLoaded", function(event) { 
    // Set default values and create grid
    document.getElementById("numberOfRows").value = rows;
    document.getElementById("numberOfColumns").value = cols;
    changeGridSize(); 
});

document.getElementById("Starting point").addEventListener("click", function(){ setActionFlag('S'); });
document.getElementById("Ending point").addEventListener("click", function(){ setActionFlag('E'); });
document.getElementById("Walls").addEventListener("click", function(){ setActionFlag('W'); });

function setActionFlag(f) {
    actionFlag=f;
    var currentActionFlag = document.getElementById('p');
    switch(f)
    {
        case 'S' : currentActionFlag.innerHTML= 'Select the starting point of the path.';
               break;
        case 'E' : currentActionFlag.innerHTML= 'Select the end point of the path.';
               break;
        case 'W' : currentActionFlag.innerHTML= 'Click on the obstacles of the path.';
               break;
        case 'C' : currentActionFlag.innerHTML= 'Select the checkpoints of the path.';
               break;
        default :  currentActionFlag.innerHTML= 'Select one of the given options to define your path.';
    }
}

function instructionsAlert() {
    alert("1) Use given buttons to specify the required points in the grid.\n2) Green point indicates the starting point.\n3) Red point indicates the end point.\n4) Choose an algorithm from the given panel.\n5) Click on 'Let's begin!' to start the search.");
}

function _createGrid() {
    setArray();
    var gridRows = "";
    var gridBoxes = "";
    rowLength = cols;
    columnLength = rows;
    var i, j;
    
    for (i = 0; i < columnLength; i++) {
        gridBoxes = "";
        for(j = 0; j < rowLength; j++) {
            gridBoxes += '<div class=\"box\" id=\"' + i + ',' + j + '\" onclick = \"boxClick(' + i + ',' + j + ')\" ></div>';
            array[i][j] = 0;
        }
        gridRows += '<div class="row">' + gridBoxes + '</div>';
    }
    
    var container = document.getElementById("grid");
    container.innerHTML = gridRows;
    document.getElementById('p').innerHTML = "Select one of the given options to define your path.";
    
    i--;
    j--;
    start_i = 0;
    start_j = 0;
    end_i = i;
    end_j = j;
    
    document.getElementById( '0,0' ).style.backgroundColor = "green";
    let endPoint = '' + i + ',' + j ;
    document.getElementById( endPoint ).style.backgroundColor = "red";
    
    count_of_search = 0;
    document.getElementById('startPoint').innerHTML = 'Starting from ' + start_i + ',' + start_j ;
    document.getElementById('endPoint').innerHTML = 'Ending at ' + end_i + ',' + end_j;
    path = [];
}

function boxClick( is , js ) {
    var i = parseInt( is , 10 );
    var j = parseInt( js , 10 );
    arrayManipulator( i , j );
    changeColorOfBox( i , j );
}

function arrayManipulator( i , j ) {
    
    switch(actionFlag)
    {
        case 'S' : 
               if( i != end_i || j != end_j ) {
            array[i][j] = 0;
               }
               break;
        case 'E' : 
               if( i != start_i || j != start_j ) {
            array[i][j] = 0;
               }
               break;
        case 'W' : 
               if( array[i][j] === 1) {
            array[i][j] = 0;
               } else if( (array[i][j] === 0) && ((i != start_i) || (j != start_j)) && ((i != end_i) || (j != end_j)) ) {
            array[i][j] = 1;
               } 
               break;
        default :  array[i][j] = 0;
    }
}

function changeColorOfBox( i , j ) {
    
    switch(actionFlag)
    {
        case 'S' : 
               if( i != end_i || j != end_j ) {
                   document.getElementById( ""+start_i+','+start_j ).style.backgroundColor = "rgba(200,200,200,0.2)";
               document.getElementById( ""+i+','+j ).style.backgroundColor = "green";
               start_i = i;
               start_j = j;
               }
               document.getElementById('startPoint').innerHTML = 'Starting from ' + start_i + ',' + start_j ;
               document.getElementById('coordinates').innerHTML = 'Pointing at ' + start_i + ',' + start_j + ' with value ' + array[start_i][start_j] ;
               break;
        case 'E' : 
               if( i != start_i || j != start_j ) {
                   document.getElementById( ""+end_i+','+end_j ).style.backgroundColor = "rgba(200,200,200,0.2)";
               document.getElementById( ""+i+','+j ).style.backgroundColor = "red";
               end_i = i;
               end_j = j; 
               }
               document.getElementById('endPoint').innerHTML = 'Ending at ' + end_i + ',' + end_j;
               document.getElementById('coordinates').innerHTML = 'Pointing at ' + end_i + ',' + end_j + ' with value ' + array[end_i][end_j] ;
               break;
        case 'W' : 
               if( array[i][j] == 1)
               {	
            document.getElementById( ""+i+','+j ).style.backgroundColor = "black";
               }
               else if( array[i][j] == 0 && ((i != start_i) || (j != start_j)) && ((i != end_i) || (j != end_j)))
               {	
            document.getElementById( ""+i+','+j ).style.backgroundColor = "rgba(200,200,200,0.2)";
               }
               document.getElementById('coordinates').innerHTML = 'Pointing at ' + i + ',' + j + ' with value ' + array[i][j] ;
               break;
        default :  array[i][j] = 0;
    }
}

function changeGridSize() {
    rows = parseInt(document.getElementById("numberOfRows").value) || 25;
    cols = parseInt(document.getElementById("numberOfColumns").value) || 35;
    
    // Responsive grid size limits based on screen size
    var maxRows = 42;
    var maxCols = 60;
    
    // Adjust max size for mobile devices
    if (window.innerWidth <= 480) {
        maxRows = 25;
        maxCols = 35;
    } else if (window.innerWidth <= 768) {
        maxRows = 30;
        maxCols = 45;
    }
    
    if( rows > maxRows || rows == 0 ) {
        rows = maxRows;
    }
    if( rows < 2 ) {
        rows = 2;
    }
    if( cols == 0 || cols > maxCols ) {
        cols = maxCols;
    }
    if( cols < 2 ) {
        cols = 2;
    }
    
    // Update input values
    document.getElementById("numberOfRows").value = rows;
    document.getElementById("numberOfColumns").value = cols;
    
    _createGrid();
    document.getElementById('gridSize').innerHTML = 'Rows : ' + array.length + ', Columns : '+ array[0].length ;
}

function selectAlgo() {
    var algoList = document.getElementsByName("algo");
    selectedAlgo = 2; // Default to BFS
    for( let i = 0; i < algoList.length; i++ )
    {
        if(algoList[i].checked)
        {	selectedAlgo = algoList[i].value;	}
    }
}

function pathfinding() {

    count_of_search++; 
    selectAlgo();
    
    for( i=1; i < path.length-1; i++){
        var s = path[i][0] + "," + path[i][1] ;
        var cell = document.getElementById(s);
        if( array[path[i][0]][path[i][1]] == 0)
            cell.style.backgroundColor = "rgba(200,200,200,0.2)";
    }
    path = [];
    open=[];
    close=[];
    
    if(selectedAlgo == 1){	bi = 'Astar';	path= Astar(array, start_i, start_j, end_i, end_j);	}
    if(selectedAlgo == 2){	bi = 'Breadth First Search';	path= BFS(array, start_i, start_j, end_i, end_j);	}	
    if(selectedAlgo == 3){	bi = 'Dijkstra';	path= Dijkstra(array, start_i, start_j, end_i, end_j);	}

    
    document.getElementById('algoSelected').innerHTML = "Selected algo is : " + bi;
    
    if ( checkPath() == 0 )
    {	alert("There was an error finding the path. Please try again for another arrangement!");	}	
    
    var i;
    for( i=0; i < path.length; i++)
    {
            var s = path[i][0] + ',' + path[i][1] ;
            var cell = document.getElementById(s);
            if(( (path[i][0] == start_i && path[i][1] == start_j ) || (path[i][0] == end_i && path[i][1] == end_j ) || (array[path[i][0]][path[i][1]] == 1)) == 0)	
                cell.style.backgroundColor = "#c0c0c0";

    }
    document.getElementById( ""+start_i+','+start_j ).style.backgroundColor = "green";
    document.getElementById( ""+end_i+','+end_j ).style.backgroundColor = "red";

}

function checkPath() {
    
    let flag_start = 0, flag_end = 0 ;
    for(let i = 0; i < path.length ; i++)
    {
        if( path[i][0] == start_i && path[i][1] == start_j)
            flag_start = 1;
        if( path[i][0] == end_i && path[i][1] == end_j)
            flag_end = 1;
    }
    return (flag_start && flag_end);
}

// Add window resize listener for responsive grid
window.addEventListener('resize', function() {
    // Debounce resize event
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function() {
        // Only recreate grid if size limits have changed significantly
        var currentMaxRows = 42;
        var currentMaxCols = 60;
        
        if (window.innerWidth <= 480) {
            currentMaxRows = 25;
            currentMaxCols = 35;
        } else if (window.innerWidth <= 768) {
            currentMaxRows = 30;
            currentMaxCols = 45;
        }
        
        // If current grid size exceeds new limits, recreate it
        if (rows > currentMaxRows || cols > currentMaxCols) {
            changeGridSize();
        }
    }, 250);
});