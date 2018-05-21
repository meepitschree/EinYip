//$(document).ready(function() {

	//CLICK TO BEGIN ie the only jquery i know
	$("#startButton").click(function () {
		        $("#splashScreen").hide();
		        $("#canvas").show();
		        document.body.style.backgroundColor = "#a59477";
	});

	(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
	})();

	document.body.addEventListener("keydown", function(e) {
	    keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function(e) {
	    keys[e.keyCode] = false;
	});

	function sound(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload", "auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	        this.sound.play();
	    }
	    this.stop = function(){
	        this.sound.pause();
	    }
	}
	var yip = new sound("ein_yip.wav");

	var bkgd = new Image();
	bkgd.src = 'bkgd.png';

	var ein_R;
	var ein_L;
	ein_R = new Image();
	ein_R.src = 'ein_R.png';

	ein_L = new Image();
	ein_L.src = 'ein_L.png';

    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth,
    height = window.innerHeight*.9,
    ein = {
	  x : width/2,
	  y : height - 5,
	  jumping : false,
	  left : false,
	  right : true,
	  width : 340,
	  height : 340,
	  speed: 3,
	  velX: 0,
	  velY: 0
	},
	keys = [],
	friction = 0.7,
	gravity = 0.4;

	canvas.width = width;
	canvas.height = height;

	//EIN CAN MOVE!
	function update(){

		//right arrow
		if (keys[39]) {
			if (ein.velX < ein.speed) {
				ein.velX++;
			}
			ein.left = false;
			ein.right = true;
		}

		//left arrow
		if (keys[37]) {                                  
			if (ein.velX > -ein.speed) {
			   ein.velX--;
			}
			ein.left = true;
			ein.right = false;
		}

		if (!ein.jumping) {
			ein.jumping = true;
			ein.velY = -ein.speed*2;
		}

	    ein.velX *= friction;
   		ein.velY += gravity;

	    ein.x += ein.velX;
		ein.y += ein.velY;

		//bounds QQ
		if (ein.x >= width-ein.width) {
		    ein.x = width - ein.width;
		} else if (ein.x <= 0) {
		    ein.x = 0;
		}
		if(ein.y >= height-ein.height){
		    ein.y = height - ein.height;
		    ein.jumping = false;
		    //asdfghjkjhgfds
		    if($('#canvas').is(":visible")) yip.play();
		}


		// ein ein ein
		ctx.clearRect(0,0,width,height);
		ctx.drawImage(bkgd,0,0,width,height);
	    // ctx.fillStyle = "red";
	    // ctx.fillRect(ein.x, ein.y, ein.width, ein.height)

	    if(ein.right) {
		    ctx.drawImage(ein_R, ein.x, ein.y, ein.width, ein.height);
		}
		if(ein.left) {
			ctx.drawImage(ein_L, ein.x, ein.y, ein.width, ein.height);
		}

	    // RUN
	    requestAnimationFrame(update);
	}

	window.addEventListener("load", function(){
		update();
	});
//});
