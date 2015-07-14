///////////////////////////// RUNNER
$(document).on("pagecreate", "#photo", function() {
	$('#album').on('click', getAlbum); //go to native photo album
	$('#camera').on('click', getCamera); //go to native camera
	
	$('#blank').on('click', function(){ 
		window.location.href = "#doodle" 
	});
});

$(document).on("pagecreate", "#doodle", function() {
	newCanvas();
	
	$("#clear").on("click", newCanvas);
	$('#restart').on("click", restart);
	$("#share").on("click", share);

	$("#color").colorPicker({
		renderCallback: function($elm, toggled) {
	    var color = "#" + this.color.colors.HEX
	    updateBrushColor(color)
	  },
	  margin: '-7em 0 0 -1em',
	});
});

///////////////////////////// PROGRAM
var context;
var imgSrc;

function getCamera() {
	navigator.camera.getPicture(
		onSuccess, 
		onFail, { 
		quality: 100,
	  destinationType: Camera.DestinationType.FILE_URI,
	  sourceType: Camera.PictureSourceType.CAMERA,
	  allowEdit: true, //iOS only
	  encodingType: Camera.EncodingType.JPEG,
	  saveToPhotoAlbum: true,
	});
};
// function getAlbum() {
// 	window.imagePicker.getPictures(
// 		onSuccess, 
// 		onFail, 
// 		{ maximumImagesCount: 1 }
// 	);
// };

function getAlbum() {
	navigator.camera.getPicture(
		onSuccess, 
		onFail, { 
	  quality: 100,
	  destinationType: Camera.DestinationType.FILE_URI,
	  sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	  allowEdit: true, //iOS only
	  encodingType: Camera.EncodingType.JPEG,
	  saveToPhotoAlbum: true,
	});
};
function onSuccess(imageData){
	imgSrc = imageData;
	window.location.href = "#doodle";
};
function onFail(message){
	console.log("Failure:" + message);
	restart();
};
function restart(){
	window.location.hash = "#page";
	location.reload();
};
function updateBrushColor(color){
	$("#color").css("color", color);
	context.beginPath();
	context.strokeStyle = color;
};
function newCanvas() {
	sizeCanvas();
	setupCanvas();
	setImageBackground();
	$("#canvas").drawTouch();
};
function sizeCanvas() {
	var height = $(window).height();
	var width = $(window).width();
  $("#content").height(height);
	$("#canvas").attr({
		"height": height,
		"width": width
	});
};
function setupCanvas() {
	context = document.getElementById("canvas").getContext("2d");
	context.strokeStyle = color;
	context.lineWidth = 5;
};
function setImageBackground(){
	var img = new Image();
	img.src = imgSrc;
	img.onload = function() {
		var width = $(window).width()
		var height = width * this.height/this.width;
		context.drawImage(img, 0, 0, width, height);
	};
};
function saveDrawing(){
	imgSrc = canvas.toDataURL("image/jpeg");
	// use on "app close"? background processes?
};
function share() {
	saveDrawing();
	var title = "Made with PhotoPop!";
	window.plugins.socialsharing.share(null, title, imgSrc, null);
};
// needs refactoring
$.fn.drawTouch = function() {
	var start = function(e) {
    e = e.originalEvent;
		context.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
		context.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY;
		context.lineTo(x,y);
		context.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
};