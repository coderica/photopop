# PhotoPop
A mobile hybrid app for drawing on photos in any color, wooooot! Currently only compatible with Android.

##To Use

Online emulator (quicker, many features unavailable)

	1. Clone repo
	2. Open file in command line
	3. Run "python -m SimpleHTTPServer"
	4. Open Chrome and navigate to the running server
	5. Open Devtools and click the phone icon

PhoneGap Upload (longer, all features available)

	1. Clone repo
	2. Compress file
	3. Login to Adobe Build (or create account)
	4. Upload .zip file
	5. Scan QR code with Google Goggles on your Android mobile device
	6. Tap the download link
	7. Open the download file && install
	8. Time to play!

##Challenges

	* Prioritizing core features over improving existing features, user experience and refactoring
	* Bugs born from outside code
	* Bad (or no) documentation


##User Stories

A user can...

	* Choose a photo from their gallery
	* Take a new photo
	* Draw on a photo
	* Choose any color to draw with
	* Start the drawing over
	* Start over and choose a new photo
	* Share the drawing on social media
	
Stretch goals

	* Change the size of the brush
	* Save the drawing to native gallery
		Resource: "https://jbkflex.wordpress.com/2013/06/19/save-html5-canvas-image-to-gallery-phonegap-android-plugin/"
	* Add a caption
	* Crop, resize and place photo
	* Erase parts of their drawing
	* Start with an empty canvas
	* Add a background color
	* Undo their last action
	* Draw shapes

##Future Goals

// crop photo automatically or manually? don't crop at all but fit whole photo in canvas and draw around it?
// limit imagepicker to one photo

	* Write cleaner drawing algorithm
		Resource: http://codetheory.in/html5-canvas-drawing-lines-with-smooth-edges/
	* Use background process to enable user to return to an unfinished drawing
	* Create a smaller, more basic color picker
	* Fix any existing bugs
	* Modify for iOS use
	* Implement stretch goal features
	* Continue to re-factor code & enhance UI


##Resources

	* Theme Roller
	* JQuery Mobile
	* Phonegap Build & Plugins
	* Tiny Color Picker: http://www.dematte.at/tinyColorPicker/?type=IE8#demo