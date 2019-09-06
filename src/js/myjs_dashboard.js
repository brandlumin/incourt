/* PREFLIGHT SECTION #1 */
$('#header .headerbar-right ul.header-nav.header-nav-options li a').text('InCourt'); // HEADER's button name change
$('tr').each(function () {$('td:nth-of-type(4) span:nth-of-type(1)').addClass('text-muted');$('td:nth-of-type(4) span:nth-of-type(2)').addClass('text-info');}); // timestamp underlining
$('a[title="Edit Post"]').click(func_CaptureNewsTime); // Creates timestamp in localStorage for edit



/* Visibility Change */
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
    } else {
      if ( (document.referrer.match(/edit/)) || (location.href.match(/#/)) ) {
        setTimeout( function () {location.href = "http://beta.incourt.in/contributor/#";}, 1000); // delayed forward
      } else {
        window.location.reload();
      }
    }
});


/* Setting Alt+C to Add Post */
$(window).keydown(function(e){
  if(e.which==67  && e.altKey) {
    func_alert('Proceeding to Add Post');
    window.location.href = "http://beta.incourt.in/contributor/add/post";
  }
});
/* Setting Alt+E to Add Post */
$(window).keydown(function(e){
  if(e.which==65  && e.altKey) {
    $('table tbody tr:first-child td:nth-of-type(9) a[title="Edit Post"]')[0].click();
    func_alert('<b>ALTERING</b> the top-most news.',600);
  }
});



if ( (document.referrer.match(/edit/)) || (location.href.match(/#/)) ) {
  /* EDIT mode. Auto-proceeding is DISABLED. */
  $(document).prop('title', ' Edit News -- InCourt'); // setting PAGE TITLE
  console.log('Editing News');
} else {
  $(document).prop('title', ' Dashboard -- InCourt'); // setting PAGE TITLE
  console.log('Adding News');
  /* ADD NEWS mode. Auto-proceeding is ENABLED. */
  var blMsg = '<p style="margin-bottom: .5rem">Auto Action <b style="font-weight:700">@ 2</b> secs.</p>' ;
  blMsg += '<p style="margin-bottom: 0">"alt+C" => Add News</p>';
  func_alert(blMsg, 1000);            // WELCOME BANNER
  var idleTime = 0, runOnce  = true, idleInterval;
  $(window).mousemove(function (e) {  // setting mousemove
    idleTime = 0; runOnce = false; clearInterval(idleInterval);
    $(window).off( "mousemove").off( "keypress");      // resetting mousemove
    func_alert("Movement detected. Auto-proceeding stopped.",1500,"purple","white");
  });
  $(window).keypress(function (e) {   // setting keypress
    idleTime = 0; runOnce = false; clearInterval(idleInterval);
    $(window).off( "keypress").off( "mousemove");       // resetting keypress
    func_alert("Keypress detected. Auto-proceeding stopped.",1500,"purple","white");
  });
  /* Running AutoScheduling */
  idleInterval = setInterval( function () {
    if ( runOnce === true ) {         // if NO mousemove or keypress
       timerIncrement();
    } else {                          // if YES mousemove or keypress
      clearInterval(idleInterval);
    }
  }, 2000); // every 2 second
}



function timerIncrement() {
  idleTime += 1;
  if ((idleTime == 1)) { // 4 (x2) seconds
    func_alert('Proceeding to Add Post');
    window.location.href = "http://beta.incourt.in/contributor/add/post";
  }
}

/**
 * ALERT WINDOW
 * @param  {text} msg The message to be shown
 * @param  {numeric} dur Duration to show the message
 * @param  {text} bgc the background-color
 * @param  {text} tc  the text-color
 * @return {NULL}     N/A
 */
function func_alert(msg,dur,bgc,tc) {
  if (typeof dur === "undefined") {dur=300;} // default; if not provided by caller
  if (typeof bgc === "undefined") {bgc="#F5DA81";} // default; if not provided by caller
  if (typeof tc  === "undefined") {tc="#000";} // default; if not provided by caller
  if ($('#myalertwindow'.length)) $('#myalertwindow').remove(); // remove any existing window
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
      'font-size'        : '1em',
      'font-weight'      : '400',
      "background-color" : bgc,
      "color"            : tc,
      "box-shadow"       : "0 .15em .25em rgba(0, 0, 0, .5)",
      "text-shadow"      : "0 0 .5px rgba(0, 0, 0, .25)",
      "z-index"          : "99000000",
  }).appendTo('body').html(msg);
  box.mouseover(function() { // Pause on hover
    $(this).stop(true, false);
  });
  box.mouseout(function() {  // fadeOut on hover
    if ($(this).is(":visible") === true) {
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

/**
 * CAPTURES NEWS ITEM'S SELECTED FOR EDIT,
 * AND STORES IN THE LOCALSTORAGE.
 */
function func_CaptureNewsTime() {
  SelectedNewsTime = $(this).closest('tr').find('td:nth-of-type(4)').text().trim().match(/\d{2}\:\d{2}/)[0];
  localStorage.setItem('selectedNews-time', SelectedNewsTime); // store captured post-time
}
