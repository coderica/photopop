///////////////////////////// RUNNER
$(document).on("pagecreate", "#choose-photo", function(e, data){
	// footerToggle(false); // prevent footer toggle
	// $('#camera').on('click', function(){ getCamera(); }); //go to native camera
	// $('#album').on('click', function(){ getAlbum(); }); //go to native photo album

	$('#camera').on('click', function(){ 	
		goToPage("#doodle");
	});
});

$(document).on("pagecreate", "#doodle", function(e, data){
	newCanvas();
	$(".palette").on("click", updatePalette);
});

///////////////////////////// FUNCTIONS
function getCamera() {
	navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
};
function getAlbum() {
	window.imagePicker.getPictures(onSuccess, onFail, albumOptions);
};
function onSuccess(imageData) {
	goToPage("#doodle");
	newCanvas();
  // take image data and make it the img src background for the canvas on the next page
};
function onFail(message) {
  console.log('Failure: ' + message);
};
function goToPage(newPage) {
	window.location.href = newPage;
};
// function footerToggle(booli) {
// 	$("[data-role=footer]").fixedtoolbar({ tapToggle: booli });
// };
function updatePalette() {
	$(".palette").css("border-color", "#777");
	$(".palette").css("border-style", "solid");
	$(this).css("border-color", "#fff");
	$(this).css("border-style", "dashed");
	color = $(this).css("background-color");
	ctx.beginPath();
	ctx.strokeStyle = color;
};
function newCanvas(){
	sizeCanvas();
	setupCanvas();
	$("#canvas").drawTouch();
};
function sizeCanvas(){
  var height = $(window).height()-90
  var width = $(window).width()
	$("#content").height(height);
  var canvas = '<canvas id="canvas" width="'+width+'" height="'+height+'"></canvas>';
	$("#content").html(canvas);
};
function setupCanvas(){
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
};
// start drawing on touch using canvas moveTo and lineTo
// how can I refactor this?
$.fn.drawTouch = function() {
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	

	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.moveTo(x,y);
	};

	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
	};
};

///////////////////////////// VARIABLE SETTINGS
var cameraOptions = { 
	quality: 100,
  destinationType: Camera.DestinationType.FILE_URI, // This kind of path works perfect in the app webview for an img src. EX: "file:///storage/emulated/0/Android/data/com.telerik.CameraTests/cache/resize.jpg?1397645214730".
  sourceType: Camera.PictureSourceType.CAMERA,
  allowEdit: true, //iOS only
  encodingType: Camera.EncodingType.JPEG,
  saveToPhotoAlbum: true,
};

var albumOptions = {
  maximumImagesCount: 1
};

var ctx, color = "#000";
