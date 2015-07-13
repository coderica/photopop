///////////////////////////// RUNNER
$(document).on("pagecreate", "#photo", function() {
	// footerToggle(false); // prevent footer toggle
	// $('#camera').on('click', getCamera); //go to native camera
	$('#album').on('click', getAlbum); //go to native photo album
	$('#camera').on('click', function(){ goToPage("#doodle") });
});

$(document).on("pagecreate", "#doodle", function() {
	newCanvas();
	$(".palette").on("click", updatePalette);
	$("#clear").on("click", newCanvas);
	$("#share").on("click", share);
});

///////////////////////////// FUNCTIONS
function getCamera() {
	navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
};
function getAlbum() {
	window.imagePicker.getPictures(onSuccess, onFail, albumOptions);
};
function onSuccess(imageData) {
	imgSrc = imageData;
	goToPage("#doodle");
};
function onFail(message) {
	alert(message);
};
function goToPage(newPage) {
	window.location.href = newPage;
};
function updatePalette() {
	$(".palette").css("border-color", "#777");
	$(".palette").css("border-style", "solid");
	$(this).css("border-color", "#fff");
	$(this).css("border-style", "dashed");
	color = $(this).css("background-color");
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
	var height = $(window).height()-90;
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
	img.onload = function() {
		context.drawImage(img, 69, 50);
	};
	img.source = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
};
// prototype to	start drawing on touch using canvas moveTo and lineTo
// how can I refactor this???
$.fn.drawTouch = function() {
	var start = function(e) {
        e = e.originalEvent;
		context.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		context.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		context.lineTo(x,y);
		context.stroke();
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
}; 
// function footerToggle(booli) {
// 	$("[data-role=footer]").fixedtoolbar({ tapToggle: booli });
// };
function share() {
	var text = "Check out this awesome thing I did!"
	var title = "PhotoPop"
	navigator.share(text, title, "image/jpeg")
}



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
var context, color = "#000";
var imgSrc;
