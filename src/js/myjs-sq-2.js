/**
 *      DOCUMENT READY FOR AUTOSCHEDULING NEWS ITEMS
 */
$(function () {
  /*!* AUTO-SCHEDULING NEWS ITEMS ***/
  $('#pub').css('transition', 'all 1300ms ease-in-out');
  func_blAutoSchedule();
});

/* func_blAutoSchedule() - acts if scheduling enabled
=========================================================== */
function func_blAutoSchedule(argument) {
  /* Setting localStorage: Part 1: setting time from localStorage */
  if (localStorage.getItem("previousPost-time") !== null) {
    /* if AUTOSCHEDULING is ENABLED */
    // capturing time in slots
    postHour = parseInt(localStorage.getItem('previousPost-time').match(/^(\d+)/)[1]);
    postMinutes = parseInt(localStorage.getItem('previousPost-time').match(/(\d+)$/)[1]);

    postMinutes += 30; //adding 30 minutes interval
    newPostTimeCF = (postMinutes > 59) ? 1 : 0; // carry-forward '1' to hour if minutes >= 60

    postMinutes = (postMinutes == 60) ? 0  // if minutes == 60
                                      : (postMinutes > 60) ? // if minutes > 60
                                        postMinutes - 60 : postMinutes; // if minutes < 60

    postHour = (newPostTimeCF == 1) ? postHour + newPostTimeCF // if carryFwded
                                    : postHour;

    postHour = (postHour == 24) ? 0  // if Hours == 24
                                : (postHour > 24) ? // if Hours > 24
                                  postHour - 24 : postHour; // if Hours < 24

    postHour = (postHour < 10) ? '0'+postHour // preceeding '0'
                               : String(postHour); // & makes string
    postMinutes = (postMinutes < 10) ? '0'+postMinutes // preceeding '0'
                               : String(postMinutes); // & makes string

    newTime = postHour+':'+postMinutes;

    $('#pub').attr('value', newTime).val(newTime).change();
    $('[name="pub_time"]').val(newTime).change();
    $('form').attr('onsubmit', 'func_blOnSubmit()'); // setting OnSubmit() on the master form
    notAutoTime = setInterval(function(){$('#pub').toggleClass('text-white');},2600); // Visual input/ hint of being enabled.
  } else {
    // if AUTOSCHEDULING is DISABLED
  }
  /* Setting localStorage: Part 2: BUTTON creation, setting tooltips etc. */
    SchBtnTxt = (localStorage.getItem("previousPost-time") === null)?'Start Scheduling':'Stop Scheduling'; // Button Text Variable
    $('<a/>',{id: 'SchBtn',class: 'btn btn-sm',text: SchBtnTxt}).css({'height': 'auto','transition': 'all 600ms ease-in-out','text-transform': 'none','margin-left': 'calc((100% - 120px)/2)'}).attr({'onClick': 'func_decideSubmit();','data-toggle': 'tooltip','data-placement': 'right','title': ''}).insertAfter('#pub+label'); // Create button
    if ($('#SchBtn').text() == 'Start Scheduling') { // set tooltip as needed
      $('#SchBtn').attr('title', 'Enter your "desired time to start with" before clicking the button. The page will reload to make it effective.'); // BS4 ToolTip
    } else {
      $('#SchBtn').attr('title', 'Come back with "desired time to start with" to start next time. The page will reload to make it effective.'); // BS4 ToolTip
    }
}

/* func_decideSubmit() - runs upun scheduling button-click
=========================================================== */
function func_decideSubmit() {
  if ($('#SchBtn').text() == 'Start Scheduling') {
    /* starting scheduling */
    $('#SchBtn').text('Starting .............');
    func_blOnSubmit();
  } else {
    /* stopping scheduling */
    $('#SchBtn').text('Stopping ...........');
    localStorage.removeItem("previousPost-time");
  }
  window.location.reload(); // to make changes effective
}

/* func_blOnSubmit() - runs when form gets submitted
=========================================================== */
function func_blOnSubmit() {
  /* Part 2: setting time in localStorage */
  previousPostTime = $('#pub').val().replace(/[\D]/g,"0").replace(/(.{2})(.)(.{2})/,"$1:$3"); // capture post-time from the field
  localStorage.setItem('previousPost-time', previousPostTime); // store captured post-time
}



/*
create outer-container
  create inner div
    create text blocks
    create close button
  ./
./
function func_LH_Open() {
  $('.LH_Container').fadeIn(200, function () {
    $('.LH_Box').fadeIn(200).focus();
  });
}
function func_LaweredHelp(param_heading) {
  var HelpHeading = param_heading;
  var HelpBody;
  $('<div/>', {
      class: 'LH_Container',
      style: 'display: none'
  }).appendTo('body'); // Container DIV CREATED IN BODY

  $('<div/>', {
      class: 'LH_Box',
      style: 'display: none'
  }).appendTo('.WordData_Container'); // Box DIV CREATED IN CONTAINER

  $('<div/>', {
      class: 'LH_Box__body'
  }).appendTo('.WordData_Box'); // Form CREATED IN Box DIV
  $('<a/>',{
    class: 'btn btn-warning LH_Close',
    onClick: 'func_LH_Close()'
  });
}
function func_LH_Close() {
  $('.LH_Box').fadeOut(200, function () {
    $('.LH_Container').fadeOut(200, function () {
      $('.LH_Box').remove();
      $('.LH_Container').remove();
    });
  });
}
*/
