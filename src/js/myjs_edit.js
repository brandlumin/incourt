$(function() {

	
	/**
	 * CODE-BUNCH TO RESET THE PAGE AND TRIM NONSENSES
	 */
	$('html body input[type], html body textarea.materialize-textarea, html body textarea, html body select').css('font','normal 400 15px/1.5 "Roboto", sans-serif'); // resetting fonts
	$('div#menubar').css('top','0');
	$('header#header, div#menubar').slideUp('slow');
	$('#base').css('padding-left', '0');
	$('#content').css('padding-top', '0');
	$('.page').css('margin-top', '0');


	/**
	 * SETTING THE FORM
	 */
	$('.col-md-8 .card-head').slideUp('slow'); // hiding CARD-HEAD
	$('.token-input-list').css({ // token list UL
		'font'         :'normal 400 .95em/1.5 "Roboto", sans-serif',
		'margin-top'   : '5px',
		'border-radius': '.25em',
		'border'       : 'none',
		'z-index'      : '100% !important'
	}).find('li').css({ // token list LI
		'font-weight': 'normal'
	}).find('p').css({ // token P
		'margin-right': '.5em'
	});
	$('#regular1[name=url]').parent('.form-group').slideUp('fast'); // hiding URL
	if (!$('#attachmentType').val()) $('#attachmentType').val('images').change(); // attachment
	$('.tile-icon.main_image').parent('.tile-content.clearfix').slideUp(); // hiding large image


	/**
	 * VIEWPORT ADAPTATIONS
	 */
	fn_AdaptViewPort(); // calls the function to create changes according to the viewport.

	if (localStorage.getItem("selectedNews-time") !== null) fn_UseLocalstorage(); // gets and sets the time from localstorage


	/**
	 * Calls the function upon Window resize
	 */
	$(window).resize(function(){
		fn_AdaptViewPort(); // calls the function to create changes according to the viewport.
	});

});


/**
 * Adds responsive to select areas.
 * ONE-WAY ONLY.
 */
function fn_AdaptViewPort() {
	// create changes according to the viewport.
	var cViewport = $(window).innerWidth();
	if (cViewport < 768) {


		$('#preview,#draft_button,[type="submit"]').prependTo('.col-md-8 .card-body > .text-right'); // shifting to TOP
		$('.col-md-4 .pub-btn > p, .col-md-4 .pub-btn > br').remove(); // cleanup empty space
		$('.col-md-8 .card-body > .text-right button').removeAttr('style');
		$('.col-md-8 .card-body > .text-right a').addClass('btn-warning pull-left').removeClass('btn-primary');
		$('button[name=preview]').removeClass('btn-primary').css('margin-left','5%');
		$('button[name=submitStatus]').addClass('pull-right btn-success');
		$('.col-md-8 .card-body > .text-right').removeAttr('class');
		$('#draft_button').removeClass('btn-warning').addClass('btn-danger').hide('slow');



		// $('.col-md-4 .pub-btn').prependTo('.col-md-8 .card-body > .text-right'); // shifting to TOP
		// $('.col-md-8 .card-body > .text-right button').removeAttr('style').unwrap();
		// $('.col-md-8 .card-body > .text-right a').addClass('btn-warning pull-left').removeClass('btn-primary').css('margin-right', '5%');
		// $('button[name=preview]').removeClass('btn-primary');
		// $('button[name=submitStatus]').addClass('pull-right btn-success');
		// $('.col-md-8 .card-body > .text-right').removeAttr('class');
	}
}




/**
 * GETS AND SETS THE TIME FROM LOCALSTORAGE
 */
function fn_UseLocalstorage() {
	// capturing time in slots
	postHour = parseInt(localStorage.getItem('selectedNews-time').match(/^(\d+)/)[1]);
	postMinutes = parseInt(localStorage.getItem('selectedNews-time').match(/(\d+)$/)[1]);

	postHour = (postHour < 10) ? '0'+postHour // preceeding '0'
	                           : String(postHour); // & makes string
	postMinutes = (postMinutes < 10) ? '0'+postMinutes // preceeding '0'
	                           : String(postMinutes); // & makes string
	newTime = postHour+':'+postMinutes;

	$('#pub').attr('value', newTime).val(newTime).change();
	// $('[name="pub_time"]').val(newTime).change(); delete it if the line above it works fine.
	$('form#autoform').attr('onsubmit', 'fn_CleanupLocalstorage();'); // setting fn_CleanupLocalstorage to run OnSubmit() on the master form 
	$('.col-md-8 .card-body > div a').attr('onclick','fn_CleanupLocalstorage();'); // setting fn_CleanupLocalstorage to run on BACK button
}




/**
 * CLEANUP LOCALSTORAGE
 */
function fn_CleanupLocalstorage() {
	localStorage.removeItem("selectedNews-time");
}



/* ******************************************************
/* function func_alert() - raise notificaton anywhere
/* :: receives four parameters (msg,dur,background-color,
/* :: and text-color)
****************************************************** */
function fn_alert(msg,dur,bgc,tc) {
  if (typeof dur === "undefined") {dur=300;} // default; if not provided by caller
  if (typeof bgc === "undefined") {bgc="#F5DA81";} // default; if not provided by caller
  if (typeof tc  === "undefined") {tc="#000";} // default; if not provided by caller
  if ($('#myalertwindow'.length)) {
    $('#myalertwindow').remove();
  }
  box = $('<div/>', { // THE ALERT WINDOW
      id    : 'myalertwindow',
      class : 'text-center'
  }).css({
      "position"         : "absolute",
      "left"             : "50%",
      "top"              : "50%",
      "transform"        : "translate(-50%,-50%)",
      'border-radius'    : '.25em',
      'border'           : '5px solid #fff',
      'padding'          : '1.25em 3em',
      'font-size'        : '1.15em',
      'font-weight'      : '400',
      "background-color" : bgc,
      "color"            : tc,
      "box-shadow"       : "0 .5em 1em rgba(0, 0, 0, .5)",
      "text-shadow"      : "0 0 .5px rgba(0, 0, 0, .25)",
      "z-index"          : "99000000",
  }).appendTo('body').html(msg);
  box.mouseover(function() { // Pause on hover
    $(this).stop(true, false);
  });
  box.mouseout(function() {  // fadeOut on hover
    if ($(this).is(":visible") == true) {
      $(this).fadeOut(300, function () {
        box.remove();
      });
    }
  });
  box.fadeIn(300)
    .delay(dur)
    .fadeOut(300, function () {
      box.remove();
    });
}
