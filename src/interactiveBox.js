// CANVAS VARIABLES
let canvas, context;
 
// CIRCLE VARIABLES
let circles = [];
const maxCircles = 3;
 
// FPS
let fps = 0;
let oldTimeStamp = 0;
let secondsPassed = 0;
let displayFPS = false;
 
document.addEventListener("DOMContentLoaded", function(){
    // CLASSES
    class Circle
    {
        constructor(x, y, colour, textToDisplay)
        {
            this.x = x;
            this.y = y;
 
            this.colour = colour;
 
            this.radius = 10;
            this.targetRadius = 10;
            this.radiusToAdd = 10;
            this.growthSpeed = 40;
            this.hasBeenClicked = false;
            this.hasFinishedExpanding = false;
            this.onExpandComplete = null;
            this.textToDisplay = textToDisplay;
        }
 
        draw(context)
        {
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
 
            if (this.hasFinishedExpanding){
                context.font = "16px Arial";
                context.fillStyle = "black";
                context.fillText(this.textToDisplay, this.x + this.radius + 10, this.y + 5);
            }
        }
 
        update(deltaTime)
        {
            // Grow to target radius
            if (this.radius < this.targetRadius){
                this.radius += this.growthSpeed * deltaTime;
                // Protect against overgrowth
                if (this.radius > this.targetRadius) {
                    this.radius = this.targetRadius;
                    if (!this.hasFinishedExpanding){
                        this.hasFinishedExpanding = true;
                        if (typeof this.onExpandComplete === "function"){
                            this.onExpandComplete(this);
                        }
                    }
                }
            }
        }
 
        isClicked(mousePosX, mousePosY)
        {
            const dx = mousePosX - this.x;
            const dy = mousePosY - this.y;
            return Math.sqrt(dx * dx + dy * dy) <= this.radius;
        }
 
        explode()
        {
                this.hasBeenClicked = true;
                this.targetRadius += this.radiusToAdd;
        }
    }
   
    function init()
    {
        // Get reference to canvas
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
 
        // Create circles
        let yPos = 60;
 
        createCircle(50, yPos, "orangered", "Mitsubishi Australia's impressive growth also brought a decline in IT infrastructure reliability");
        createCircle(50, yPos*2, "orangered", "Large-scale outages saw significant downtime");
        createCircle(50, yPos*3, "orangered", "Increased demand led to high latency");
 
        createCircle(50, yPos*5, "lightgreen", "Mitsubishi worked with Kyndryl to migrate its SAP infrastructure to IBM Cloud");
        createCircle(50, yPos*6, "lightgreen", "80% reduction in potential downtime for disaster recovery operations");
        createCircle(50, yPos*7, "lightgreen", "Reduces administration time and helps keep salespeople on the sales floor");
 
        // Add click event listener
        canvas.addEventListener("click", function(event){
            const rect = canvas.getBoundingClientRect();
            const mousePosX = event.clientX - rect.left;
            const mousePosY = event.clientY - rect.top;
 
            for (let circle of circles){
                if (circle.isClicked(mousePosX, mousePosY) && !circle.hasBeenClicked){
                    circle.explode();
                    break;
                }
            }
        });
 
        // Start first frame request
        window.requestAnimationFrame(main);
    }
 
    function main(timeStamp)
    {
        // Fixes issue where oldStamp was not set on first frame, causing deltaTime to be NaN and breaking timers
        if (!oldTimeStamp) oldTimeStamp = timeStamp;
 
        // Calculate seconds since last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
 
        // Calculate fps
        fps = Math.round(1 / secondsPassed);
 
        // Update Logic
        update(secondsPassed)
 
        // Draw frame
        draw();
 
        // Keep requesting new frames
        window.requestAnimationFrame(main);
    }
 
    function update(deltaTime){
        // Call each circle's update function
        for (let i = 0; i < circles.length; i++){
            let circle = circles[i];
            circle.update(deltaTime);
        }
    }
 
    function draw()
    {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
 
        // Draw background colour
        context.fillStyle = "white";
        context.fillRect(0, 0 , canvas.width, canvas.height);
 
        // Display fps on screen
        if (displayFPS){
            context.font = "25px Arial";
            context.fillStyle = "black"
            context.fillText("FPS: " + fps, 10, 30);
        }
 
        // Draw circles
        for (let circle of circles){
            circle.draw(context);
        }
    }
 
    function createCircle(x, y, colour, message){
        let circle = new Circle(x, y, colour, message);
 
        circle.onExpandComplete = function(c){
            console.log(`"${c.textToDisplay}" has finished expanding`);
        }
 
        circles.push(circle);
    }
 
    init();
});