// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

/************************ Simple Canvas */
var clickX_simple = new Array();
var clickY_simple = new Array();
var clickDrag_simple = new Array();
var paint_simple;
var canvas_simple;
var context_simple;

function prepareSimpleCanvas(){
	// Create the canvas ------------------------------------------------
	var canvasDiv = document.getElementById('canvasSimpleDiv');
	canvas_simple = document.createElement('canvas');
	canvas_simple.setAttribute('width', canvasWidth);
	canvas_simple.setAttribute('height', canvasHeight);
	canvas_simple.setAttribute('id', 'canvasSimple');
	canvasDiv.appendChild(canvas_simple);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simple = G_vmlCanvasManager.initElement(canvas_simple);
	}
	context_simple = canvas_simple.getContext("2d");
	
	// Add mouse events ------------------------------------------------
	$('#canvasSimple').mousedown(function(e){
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simple = true;
		addClickSimple(mouseX, mouseY, false);
		redrawSimple();
	});
	
	$('#canvasSimple').mousemove(function(e){
		if(paint_simple){
			addClickSimple(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimple();
		};
	});
	
	$('#canvasSimple').mouseup(function(e){
		paint_simple = false;
	  	redrawSimple();
	});
	
	$('#canvasSimple').mouseleave(function(e){
		paint_simple = false;
	});
	
	$('#clearCanvasSimple').mousedown(function(e){
		clickX_simple = new Array();
		clickY_simple = new Array();
		clickDrag_simple = new Array();
		clearCanvas_simple(); 
	});
};
function addClickSimple(x, y, dragging){
	clickX_simple.push(x);
	clickY_simple.push(y);
	clickDrag_simple.push(dragging);
};
function clearCanvas_simple(){
	context_simple.clearRect(0, 0, canvasWidth, canvasHeight);
};
function redrawSimple(){
	clearCanvas_simple();
	
	var radius = 5;
	context_simple.strokeStyle = "#df4b26";
	context_simple.lineJoin = "round";
	context_simple.lineWidth = radius;
			
	for(var i=0; i < clickX_simple.length; i++){		
		context_simple.beginPath();
		if(clickDrag_simple[i] && i){
			context_simple.moveTo(clickX_simple[i-1], clickY_simple[i-1]);
		}else{
			context_simple.moveTo(clickX_simple[i]-1, clickY_simple[i]);
		};
		context_simple.lineTo(clickX_simple[i], clickY_simple[i]);
		context_simple.closePath();
		context_simple.stroke();
	};
}


/************************ Simple Canvas With Tools */

var clickX_simpleTools = new Array();
var clickY_simpleTools = new Array();
var clickDrag_simpleTools = new Array();
var clickColor_simpleTools = new Array();
var clickSize_simpleTools = new Array();
var paint_simpleTools;
var canvas_simpleTools;
var context_simpleTools;
var curColor_simpleTools = colorPurple;
var curSize_simpleTools = "normal";

var clickTool_simpleTools = new Array();
var curTool_simpleTools = "crayon";

function prepareSimpleToolsCanvas()
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById('canvasSimpleToolsDiv');
	canvas_simpleTools = document.createElement('canvas');
	canvas_simpleTools.setAttribute('width', canvasWidth);
	canvas_simpleTools.setAttribute('height', canvasHeight);
	canvas_simpleTools.setAttribute('id', 'canvasSimpleTools');
	canvasDiv.appendChild(canvas_simpleTools);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simpleTools = G_vmlCanvasManager.initElement(canvas_simpleTools);
	}
	context_simpleTools = canvas_simpleTools.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	// Add mouse events
	// ----------------
	$('#canvasSimpleTools').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		
		paint_simpleTools = true;
		addClickSimpleTools(mouseX, mouseY, false);
		redrawSimpleTools();
	});
	
	$('#canvasSimpleTools').mousemove(function(e){
		if(paint_simpleTools){
			addClickSimpleTools(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redrawSimpleTools();
		}
	});
	
	$('#canvasSimpleTools').mouseup(function(e){
		paint_simpleTools = false;
	  	redrawSimpleTools();
	});
	
	$('#canvasSimpleTools').mouseleave(function(e){
		paint_simpleTools = false;
	});
	
	$('#choosePurpleSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorPurple;
	});
	$('#chooseGreenSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorGreen;
	});
	$('#chooseYellowSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorYellow;
	});
	$('#chooseBrownSimpleTools').mousedown(function(e){
		curColor_simpleTools = colorBrown;
	});	
	$('#chooseSmallSimpleTools').mousedown(function(e){
		curSize_simpleTools = "small";
	});
	$('#chooseNormalSimpleTools').mousedown(function(e){
		curSize_simpleTools = "normal";
	});
	$('#chooseLargeSimpleTools').mousedown(function(e){
		curSize_simpleTools = "large";
	});
	$('#chooseHugeSimpleTools').mousedown(function(e){
		curSize_simpleTools = "huge";
	});
	$('#chooseCrayonSimpleTools').mousedown(function(e){
		curTool_simpleTools = "crayon";
	});
	$('#chooseMarkerSimpleTools').mousedown(function(e){
		curTool_simpleTools = "marker";
	});
	$('#chooseEraserSimpleTools').mousedown(function(e){
		curTool_simpleTools = "eraser";
	});
	
	$('#clearCanvasSimpleTools').mousedown(function(e)
	{
		clickX_simpleTools = new Array();
		clickY_simpleTools = new Array();
		clickDrag_simpleTools = new Array();
		clickColor_simpleTools = new Array();
		clickSize_simpleTools = new Array();
		clearCanvas_simpleTools();
	});
}

function addClickSimpleTools(x, y, dragging)
{
	clickX_simpleTools.push(x);
	clickY_simpleTools.push(y);
	clickDrag_simpleTools.push(dragging);
	clickTool_simpleTools.push(curTool_simpleTools);
	if(curTool_simpleTools == "eraser"){
		clickColor_simpleTools.push("#ffffff");
	}else{
		clickColor_simpleTools.push(curColor_simpleTools);
	}
	clickSize_simpleTools.push(curSize_simpleTools);
}

function clearCanvas_simpleTools()
{
	context_simpleTools.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimpleTools()
{
	// Make sure required resources are loaded before redrawing
	if(curLoadResNum < totalLoadResources){ return; }
	
	clearCanvas_simpleTools();
	
	var radius;
	context_simpleTools.lineJoin = "round";
			
	for(var i=0; i < clickX_simpleTools.length; i++)
	{
		if(clickSize_simpleTools[i] == "small"){
			radius = 2;
		}else if(clickSize_simpleTools[i] == "normal"){
			radius = 5;
		}else if(clickSize_simpleTools[i] == "large"){
			radius = 10;
		}else if(clickSize_simpleTools[i] == "huge"){
			radius = 20;
		}
	
		context_simpleTools.beginPath();
		if(clickDrag_simpleTools[i] && i){
			context_simpleTools.moveTo(clickX_simpleTools[i-1], clickY_simpleTools[i-1]);
		}else{
			context_simpleTools.moveTo(clickX_simpleTools[i]-1, clickY_simpleTools[i]);
		}
		context_simpleTools.lineTo(clickX_simpleTools[i], clickY_simpleTools[i]);
		context_simpleTools.closePath();
		context_simpleTools.strokeStyle = clickColor_simpleTools[i];
		context_simpleTools.lineWidth = radius;
		context_simpleTools.stroke();
	}
	
	if(curTool_simpleTools == "crayon"){
		context_simpleTools.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
	}
}
