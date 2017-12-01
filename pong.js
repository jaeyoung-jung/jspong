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
var angleDisplay;
var scoreDisplay;
var scores=[0,0];

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
	if (ballCoords[0]+ballSpeed*Math.cos(ballAngle)+ballDiameter>=canvasWidth-paddleWidth) { //to the right
		if (ballCoords[1]<paddleLocations[1]+paddleHeight && ballCoords[1]>paddleLocations[1]-ballDiameter) {
			ballAngle=Math.PI-ballAngle;
		} else {
			scores[0]++;
			reset();
			displayScore();
		}
	} else if (ballCoords[0]+ballSpeed*Math.cos(ballAngle)<=paddleWidth) {//to the left
		if (ballCoords[1]<paddleLocations[0]+paddleHeight && ballCoords[1]+ballDiameter>paddleLocations[0]) {
			ballAngle=Math.PI-ballAngle;
			console.log("ok");
		} else {
			scores[1]++;
			reset();
			displayScore();
		}
	} else {
		ballCoords[0]+=ballSpeed*Math.cos(ballAngle);
	}

	if (ballCoords[1]+ballSpeed*Math.sin(ballAngle)+ballDiameter>canvasHeight) {//to the bottom
		ballAngle = -ballAngle;
	} else if (ballCoords[1]+ballSpeed*Math.sin(ballAngle)-ballDiameter<0) {//to the top
		ballAngle = -ballAngle;
	} else {
		ballCoords[1]+=ballSpeed*Math.sin(ballAngle);
	}
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
	ballAngle=(1/2*Math.random()-1/4)*Math.PI;
}
function displayScore(){
	scoreDisplay.value=scores[0]+" : "+scores[1];
}
function init () {
	document.onkeydown=keyDown;
	document.onkeyup=keyUp;
	canvas0=document.getElementById("canvas0");
	context=canvas0.getContext("2d");
	setInterval(frame,16.66666);
	canvasWidth=canvas0.width;
	canvasHeight=canvas0.height;
	reset();
	//angleDisplay=document.getElementById("angle");
	scoreDisplay=document.getElementById("score");
	displayScore();
}

window.onload=init;