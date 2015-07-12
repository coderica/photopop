///////////////////////////// RUNNER
$(document).on("pagecreate", "#photo", function(e, data){
	// footerToggle(false); // prevent footer toggle
	$('#camera').on('click', function(){ getCamera(); }); //go to native camera
	$('#album').on('click', function(){ getAlbum(); }); //go to native photo album
	// $('#camera').on('click', function(){ goToPage("#doodle") });
});

$(document).on("pagecreate", "#doodle", function(e, data){
	// newCanvas();
	// $(".palette").on("click", updatePalette);
															// setup a new canvas for drawing wait for device init
															setTimeout(function() {
															 newCanvas();
															}, 1000);
															// reset palette selection (css) and select the clicked color for canvas strokeStyle
															$(".palette").click(function() {
																$(".palette").css("border-color", "#777");
																$(".palette").css("border-style", "solid");
																$(this).css("border-color", "#fff");
																$(this).css("border-style", "dashed");
																color = $(this).css("background-color");
																ctx.beginPath();
																ctx.strokeStyle = color;
															});
});

///////////////////////////// FUNCTIONS
function getCamera() {
	navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
};
function getAlbum() {
	// navigator.camera.getPicture(onSuccess, onFail, albumOptions); //this plugin is not working to access photo gallery
	window.imagePicker.getPictures(onSuccess, onFail, albumOptions);
};
function onSuccess(imageData) {
	imgSrc = imageData;
	goToPage("#doodle");
};
function onFail(message) {
  console.log('Failure: ' + message);
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
function newCanvas(){
	sizeCanvas();
	setupCanvas();
	// $("#canvas").drawTouch();
};
function sizeCanvas(){
  var height = $(window).height()-90
  var width = $(window).width()
	$("#content").height(height);
	$("#canvas").height(height);
	$("#canvas").width(width);
};
function setupCanvas(){
	context = document.getElementById('canvas').getContext("2d");
	context.strokeStyle = color;
	context.lineWidth = 5;
	var img = new Image();
	img.onload = function() {
		context.drawImage(img, 69, 50);
	};
	img.source = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
};
// prototype to	start drawing on touch using canvas moveTo and lineTo
											// function to setup a new canvas for drawing
											function newCanvas() {
												//define and resize canvas
											  $("#content").height($(window).height()-90);
											  var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
												$("#content").html(canvas);
											    
											  // setup canvas
												ctx=document.getElementById("canvas").getContext("2d");
												ctx.strokeStyle = color;
												ctx.lineWidth = 5;	
												
												// setup to trigger drawing on mouse or touch
												$("#canvas").drawTouch();
											  $("#canvas").drawPointer();
												$("#canvas").drawMouse();
											};

											$.fn.drawTouch = function() {
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
												$(this).on("touchstart", start);
												$(this).on("touchmove", move);	
											}; 
											    
											// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
											$.fn.drawPointer = function() {
												var start = function(e) {
											        e = e.originalEvent;
													ctx.beginPath();
													x = e.pageX;
													y = e.pageY-44;
													ctx.moveTo(x,y);
												};
												var move = function(e) {
													e.preventDefault();
											        e = e.originalEvent;
													x = e.pageX;
													y = e.pageY-44;
													ctx.lineTo(x,y);
													ctx.stroke();
											    };
												$(this).on("MSPointerDown", start);
												$(this).on("MSPointerMove", move);
											};        
											// prototype to	start drawing on mouse using canvas moveTo and lineTo
											$.fn.drawMouse = function() {
												var clicked = 0;
												var start = function(e) {
													clicked = 1;
													ctx.beginPath();
													x = e.pageX;
													y = e.pageY-44;
													ctx.moveTo(x,y);
												};
												var move = function(e) {
													if(clicked){
														x = e.pageX;
														y = e.pageY-44;
														ctx.lineTo(x,y);
														ctx.stroke();
													}
												};
												var stop = function(e) {
													clicked = 0;
												};
												$(this).on("mousedown", start);
												$(this).on("mousemove", move);
												$(window).on("mouseup", stop);
											};
// function footerToggle(booli) {
// 	$("[data-role=footer]").fixedtoolbar({ tapToggle: booli });
// };



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
