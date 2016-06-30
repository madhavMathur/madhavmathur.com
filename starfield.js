/*
	Starfield lets you take a div and turn it into a starfield.
*/

//	Define the starfield class.
function Starfield() {
	this.fps = 60;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 5; // 15
	this.maxVelocity = 15; // 30
	this.stars = 3000;//275
	this.intervalId = 0;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {

	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*4 - Math.random()*3.9999, //*4+1
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity, getRandomColor());
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;

	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*4 - Math.random()*3.9999, //*4+1
		 	(Math.floor(Math.random()*1000) == 1)? 100:((Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity), getRandomColor());
		}
	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	ctx.fillStyle = '#000012';

	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.
	//ctx.fillStyle = '#FFFFFF';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		ctx.fillStyle = star.color;
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
};

function getRandomColor() {

	if(Math.floor(Math.random()*1) == 0) {
		var letters = '9bb0ff aabfff cad7ff f8f7ff fff4ea ffd2a1 ffcc6f'.split(' ');
		var color = '#';
	    color += letters[Math.floor(Math.random() * 7) + 2];
	    return color;
	}
	else {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	    	// Dampen greens (Green colored stars are rare)
	    	if (i < 4 && i > 1) 
	    		color += letters[Math.floor(Math.random() * 10)];
	    	else if(i < 2)
	    		color += letters[Math.floor(Math.random() * 12) + 4];
	    	else
	        	color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
}

function Star(x, y, size, velocity, color) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
	this.color = color;
}

