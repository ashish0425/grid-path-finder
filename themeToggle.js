var callTime = 0;

function changeTheme() {
    callTime++;
    callTime %= 2;

    var body = document.body;
    var th1 = document.getElementById("theme1");
    var th2 = document.getElementById("theme-toggle");
    var th8 = document.getElementById("theme8") || document.querySelector("main"); // Fallback to main if theme8 doesn't exist
    var icon = th2.querySelector('i');
    var ins = document.getElementById("Instructions");

    // Get all text elements including the new ones
    var allTextElements = document.querySelectorAll('p, button, label, i, input, h1, h2, h3');

    if (callTime % 2 == 1) {
        // Dark theme
        body.classList.add('dark-theme');
        
        // Apply dark theme styles
        if (th1) {
            th1.style.background = "linear-gradient(to right, #0f2027, #2c5364)";
            th1.style.color = "white";
        }
        
        if (ins) {
            ins.style.color = "white";
        }
        
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            icon.style.color = "white";
        }

        if (th8) {
            th8.style.background = "radial-gradient(circle, #0f2027, #2c5364)";
        }

        // Change all text elements to white
        allTextElements.forEach(function(element) {
            if (element.tagName !== 'INPUT') {
                element.style.color = "white";
            } else {
                // Special handling for input elements
                element.style.color = "white";
                element.style.backgroundColor = "rgba(0,0,0,0.3)";
                element.style.borderColor = "white";
            }
        });
        
        // Update button borders and special elements for dark theme
        var buttons = document.querySelectorAll('.Button, #Instructions, .gid_button, .algorithmPanel, .control_button');
        buttons.forEach(function(button) {
            button.style.borderColor = "white";
            if (button.classList.contains('control_button')) {
                button.style.backgroundColor = "#2c5364";
                button.style.color = "white";
            }
        });

        // Update grid boxes for dark theme
        var gridBoxes = document.querySelectorAll('.box');
        gridBoxes.forEach(function(box) {
            if (box.style.backgroundColor === "rgba(200, 200, 200, 0.2)" || 
                box.style.backgroundColor === "" || 
                box.style.backgroundColor === "rgba(200,200,200,0.2)") {
                box.style.backgroundColor = "rgba(100, 100, 100, 0.3)";
            }
        });
        
        // Save theme preference
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('pathfinder-theme', 'dark');
        }
        
    } else {
        // Light theme
        body.classList.remove('dark-theme');
        
        // Apply light theme styles
        if (th1) {
            th1.style.background = "linear-gradient(to right, #ffecd2, #fcb69f)";
            th1.style.color = "#000";
        }
        
        if (ins) {
            ins.style.color = "black";
        }

        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            icon.style.color = "black";
        }
        
        if (th8) {
            th8.style.background = "radial-gradient(circle, #ffecd2, #fcb69f)";
        }

        // Change all text elements to black
        allTextElements.forEach(function(element) {
            if (element.tagName !== 'INPUT') {
                element.style.color = "black";
            } else {
                // Special handling for input elements
                element.style.color = "black";
                element.style.backgroundColor = "rgba(255,255,255,0.1)";
                element.style.borderColor = "black";
            }
        });
        
        // Update button borders and special elements for light theme
        var buttons = document.querySelectorAll('.Button, #Instructions, .gid_button, .algorithmPanel, .control_button');
        buttons.forEach(function(button) {
            button.style.borderColor = "black";
            if (button.classList.contains('control_button')) {
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
            }
        });

        // Update grid boxes for light theme
        var gridBoxes = document.querySelectorAll('.box');
        gridBoxes.forEach(function(box) {
            if (box.style.backgroundColor === "rgba(100, 100, 100, 0.3)" || 
                box.style.backgroundColor === "" || 
                box.style.backgroundColor === "rgba(200,200,200,0.2)") {
                box.style.backgroundColor = "rgba(200, 200, 200, 0.2)";
            }
        });
        
        // Save theme preference
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('pathfinder-theme', 'light');
        }
    }
}

// Initialize theme based on user preference or system preference
function initializeTheme() {
    var savedTheme = null;
    
    // Check if user has a saved preference (only if localStorage is available)
    if (typeof(Storage) !== "undefined") {
        savedTheme = localStorage.getItem('pathfinder-theme');
    }
    
    // If no saved preference, check system preference
    if (!savedTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            savedTheme = 'dark';
        } else {
            savedTheme = 'light';
        }
    }
    
    // Apply the theme - only call changeTheme if we want dark theme
    // since the page starts in light theme by default
    if (savedTheme === 'dark') {
        changeTheme(); // This will switch to dark theme
    }
}

// Auto-initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        var hasManualPreference = typeof(Storage) !== "undefined" && localStorage.getItem('pathfinder-theme');
        
        if (!hasManualPreference) {
            if (e.matches && callTime % 2 === 0) {
                changeTheme(); // Switch to dark
            } else if (!e.matches && callTime % 2 === 1) {
                changeTheme(); // Switch to light
            }
        }
    });
}