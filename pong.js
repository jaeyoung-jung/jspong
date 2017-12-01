var _keys= new Object();
_keys[87]=0; //w
_keys[83]=0; //s
_keys[38]=0; //up
_keys[40]=0; //down
var canvas0;
var context;
var paddleLocations=[0,0];
var paddleHeight=100;
var paddleWidth=10;
var ballDiameter=10;
var canvasHeight;
var canvasWidth;
var paddleSpeed=10;
var up=[87,38];
var down=[83,40];
var ballCoords;
var ballSpeed=5;
var ballAngle; //angle from +x axis
var ballVelocity;
var ballAcceleration=10;
var angleDisplay;
var scoreDisplay;
var scores=[0,0];
var fps=60;
var serve=Math.random()<0.5;

function keyDown (x) {
	var key=x.keyCode;
	if (key in _keys) {
		_keys[key]=1;
	}
}

function keyUp (x) {
	var key=x.keyCode;
	if (key in _keys) {
		_keys[key]=0;
	}
}

function frame() {
	for (var i=0; i<=1; i++){
		if (_keys[up[i]]==1) {
			if (paddleLocations[i]>paddleSpeed) paddleLocations[i] -= paddleSpeed;
			else if (paddleLocations[i]>0) paddleLocations[i]=0;
		}
		if (_keys[down[i]]==1) {
			if (paddleLocations[i]<canvasHeight-paddleHeight-paddleSpeed) paddleLocations[i] += paddleSpeed;
			else if (paddleLocations[i]<canvasHeight-paddleHeight) paddleLocations[i]=canvasHeight-paddleHeight;
		}
	}
	if (ballCoords[0]+ballVelocity[0]+ballDiameter>=canvasWidth-paddleWidth) { //to the right
		if (ballCoords[1]<paddleLocations[1]+paddleHeight && ballCoords[1]>paddleLocations[1]-ballDiameter) {
			ballVelocity[0]*=-1;
			ballVelocity[1]+=[2*(ballDiameter/2+ballCoords[1]-paddleLocations[1])/paddleHeight-1]*ballAcceleration;
			//console.log(ballVelocity[1]);
		} else {
			serve=0;			
			scores[0]++;
			ballVelocity=[0,0];
			setTimeout(reset,1000);
		}
	} else if (ballCoords[0]+ballVelocity[0]<=paddleWidth) {//to the left
		if (ballCoords[1]<paddleLocations[0]+paddleHeight && ballCoords[1]+ballDiameter>paddleLocations[0]) {
			ballVelocity[0]*=-1;
			ballVelocity[1]+=[2*(ballDiameter/2+ballCoords[1]-paddleLocations[0])/paddleHeight-1]*ballAcceleration;
			//console.log(ballVelocity[1]);
		} else {
			serve=1;
			scores[1]++;
			ballVelocity=[0,0];
			setTimeout(reset,1000);
		}
	}
	ballCoords[0]+=ballVelocity[0];

	if (ballCoords[1]+ballVelocity[1]+ballDiameter>canvasHeight) {//to the bottom
		ballVelocity[1]*=-1;
	} else if (ballCoords[1]+ballVelocity[1]-ballDiameter<0) {//to the top
		ballVelocity[1]*=-1;
	}
	ballCoords[1]+=ballVelocity[1];
	//angleDisplay.value=ballAngle;
	context.clearRect(0,0,canvas0.width,canvas0.height);
	context.beginPath();
	context.rect(0,paddleLocations[0],paddleWidth,paddleHeight);
	context.rect(canvasWidth-paddleWidth,paddleLocations[1],paddleWidth,paddleHeight);
	context.rect(ballCoords[0],ballCoords[1],ballDiameter,ballDiameter);
	context.fillStyle="#FFFFFF";
	context.fill();
}
function reset() {
	ballCoords=[(canvasWidth-ballDiameter)/2,(canvasHeight-ballDiameter)/2];
	ballVelocity=[5*(2*serve-1),5];
	scoreDisplay.value=scores[0]+" : "+scores[1];
}
function init () {
	document.onkeydown=keyDown;
	document.onkeyup=keyUp;
	canvas0=document.getElementById("canvas0");
	context=canvas0.getContext("2d");
	setInterval(frame,1000/fps);
	canvasWidth=canvas0.width;
	canvasHeight=canvas0.height;
	scoreDisplay=document.getElementById("score");
	reset();
	//angleDisplay=document.getElementById("angle");
}

window.onload=init;
