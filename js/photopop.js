///////////////////////////// RUNNER
$(document).on("pagecreate", "#photo", function() {
	// $('#camera').on('click', getCamera); //go to native camera
	$('#album').on('click', getAlbum); //go to native photo album
	$('#camera').on('click', function(){ goToPage("#doodle") });
});

$(document).on("pagecreate", "#doodle", function() {
	newCanvas();
	$(".palette").on("click", updatePalette);
	$("#clear").on("click", newCanvas);
	$("#share").on("click", function(){ share(imgSrc) });
	$('#restart').on("click", function(){ goToPage("#photo") })
	$("#color").colorPicker();
});


///////////////////////////// FUNCTIONS
function getCamera() {
	navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
};
function getAlbum() {
	window.imagePicker.getPictures(onSuccess, onFail, albumOptions);
};

// document.addEventListener("deviceready", function () {

//     var options = {
//       quality: 50,
//       destinationType: Camera.DestinationType.DATA_URL,
//       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//       allowEdit: true,
//       encodingType: Camera.EncodingType.JPEG,
//       targetWidth: 100,
//       targetHeight: 100,
//       popoverOptions: CameraPopoverOptions,
//       saveToPhotoAlbum: false
//     };

//     $cordovaCamera.getPicture(options).then(function(imageData) {
//       // var image = document.getElementById('myImage');
//     	var image = new Image();
//       image.src = "data:image/jpeg;base64," + imageData;
//     	// img.source = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
//       alert(image.src)
//     	// img.onload = function() {
//     	// 	context.drawImage(img, 69, 50);
//     	// };
//     }, function(err) {
//       // error
//     });

//   }, false);

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
	color = $("#color").css("background-color");
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
	img.onload = function() {
		context.drawImage(img, 0, 0);
	};
	img.src = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
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
function share(image) {
	var title = "Made with PhotoPop!"
	window.plugins.socialsharing.share(null, title, image, null)
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
  maximumImagesCount: 1,
};
// var colorPickerOptions = {
// 	change: function(color){ color.toHexString() },
// 	renderCallback: function(){ color = this.color },
// };
var context, color = "#000";
var imgSrc
