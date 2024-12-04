var init = function (window) {
    'use strict';

    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');

    window.opspark.makeGame = function() {
        window.opspark.game = {};
        var game = window.opspark.game;

        ////////////////////////////////////////////////////////////
        /////////////////// PROGRAM SETUP /////////////////////////
        ////////////////////////////////////////////////////////////

        // TODO 1: Declare and initialize our variables
        var circle;
        var circles = [];

        // TODO 2: Create a function that draws a circle
        function drawCircle() {
            // Create a random circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas, 10, 10); // Add random velocity
            view.addChild(circle); // Add the circle to the canvas
            circles.push(circle); // Store the circle in the array
        }

        // TODO 3/7: Call the drawCircle() function in a loop
        for (let i = 0; i < 100; i++) {
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        /////////////////// PROGRAM LOGIC /////////////////////////
        ////////////////////////////////////////////////////////////

        // This function is called 60 times/second producing 60 frames/second.
        function update() {
            // TODO 4/8/9: Iterate through all circles and update their positions
            for (let i = 0; i < circles.length; i++) {
                physikz.updatePosition(circles[i]); // Update position
                game.checkCirclePosition(circles[i]); // Keep circles in bounds
            }
        }

        // This function checks the position of a circle and loops it if it exits the screen
        game.checkCirclePosition = function(circle) {
            // TODO 5/6: Check all edges and loop circles
            if (circle.x > canvas.width) {
                circle.x = 0; // Off right edge, loop to left
            }
            if (circle.x < 0) {
                circle.x = canvas.width; // Off left edge, loop to right
            }
            if (circle.y > canvas.height) {
                circle.y = 0; // Off bottom edge, loop to top
            }
            if (circle.y < 0) {
                circle.y = canvas.height; // Off top edge, loop to bottom
            }
        };

        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////

        view.addChild(fps);
        app.addUpdateable(fps);

        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
