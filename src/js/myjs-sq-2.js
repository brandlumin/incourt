function fetchHash(recArray,recEl,recHash) {
  // create hashPattern
  var hashPattern = /#([-|\w]+)/gmi;
  // run IF hashPattern.test(recArray[recEl]) is true
  if (hashPattern.test(recArray[recEl])) {
    tempHash = recArray[recEl].match(hashPattern);
    tempHash = Func_TrimAndCrisp(tempHash.join(',').replace(/#\s?/g,'').replace(/\s?,\s?/gm,', ').replace(/[_]/gm,' '));
    if (recHash.replace(/#\s?/g,'').length > 0) tempHash = ', '+tempHash;
    recHash = (recHash+tempHash).replace(/,[\s]*$/gm,'');
    if (!(/^#/).test(recHash)) recHash = '# '+recHash;
    recArray[recEl] = recArray[recEl].replace(/#/g,'').replace(/_/g,' ');
  }  // ENDIF
  return {
    recArrayRet : recArray,
    recElRet    : recEl,
    recHashRet  : recHash
  };
}


function func_blAutoSchedule(argument) {
  /* Setting localStorage: Part 1: setting time from localStorage */
  if (localStorage.getItem("previousPost-time") !== null) {
    previousPostTime1 = parseInt(localStorage.getItem('previousPost-time').match(/^(\d+)/)[1]);
    previousPostTime2 = parseInt(localStorage.getItem('previousPost-time').match(/(\d+)$/)[1]);
    previousPostTime2 += 30; //adding 30 minutes
    newPostTimeCF = (previousPostTime2 > 59) ? 1 : 0; // newPostTimeCF minutes if >= 60
    previousPostTime2 = (previousPostTime2 == 60) ? 0  // if minutes == 60
                                                  : (previousPostTime2 > 60) ? // if minutes > 60
                                                    previousPostTime2 - 60 : previousPostTime2; // if minutes < 60
    previousPostTime1 = (newPostTimeCF > 0) ? previousPostTime1 + newPostTimeCF // if carryFwded
                                            : previousPostTime1;
    previousPostTime1 = (previousPostTime1 < 10) ? '0'+previousPostTime1 // preceeding '0'
                                                 : String(previousPostTime1); // & makes string
    previousPostTime2 = (previousPostTime2 < 10) ? '0'+previousPostTime2 // preceeding '0'
                                                 : String(previousPostTime2); // & makes string
    newTime = previousPostTime1+':'+previousPostTime2;
    $('#pub').attr('value', newTime).val(newTime).change();
    $('[name="pub_time"]').val(newTime).change();
  } else {
    func_alert('Auto-Scheduling Disabled.',1500,'#FFE6F6EE');
    notAutoTime = setInterval(function(){$('#SchBtn').toggleClass('btn-info');$('#SchBtn').toggleClass('btn-warning');$('#SchBtn').toggleClass('text-white');},1800);
  }
  /* Setting localStorage: Part 2: setting time in localStorage upon form submit */
    SchBtnTxt = (localStorage.getItem("previousPost-time") === null)?'Start Scheduling':'Stop Scheduling'; // Button Text Variable
    $('<a/>',{id: 'SchBtn',class: 'btn btn-info btn-sm text-white',text: SchBtnTxt}).css({'height': 'auto','transition': 'all 600ms ease-in-out','text-transform': 'none','margin-left': 'calc((100% - 120px)/2)'}).attr({'onClick': 'func_decideSubmit();','data-toggle': 'tooltip','data-placement': 'right','title': ''}).insertAfter('#pub+label'); // Create button
    if ($('#SchBtn').text() == 'Start Scheduling') { // set tooltip as needed
      $('#SchBtn').attr('title', 'Its Easy. Enter your "desired time to start with" before clicking the button.'); // BS4 ToolTip
    } else {
      $('#SchBtn').attr('title', 'Its Easy. Come back with "desired time to start with" to start next time.'); // BS4 ToolTip
    }
  $('form').attr('onsubmit', 'func_blOnSubmit()'); // setting OnSubmit() on the master form
}
function func_decideSubmit() {
  if ($('#SchBtn').text() == 'Start Scheduling') {
    /* starting scheduling */
    previousPostTime = $('#pub').val(); // capture time from the field
    localStorage.setItem('previousPost-time', previousPostTime); // store it
    $('#SchBtn').attr('title', 'Its Easy. Come back with "desired time to start with" to start next time.'); // BS4 ToolTip
    $('#SchBtn').text('Stop Scheduling');
    clearInterval(notAutoTime);
    $('#SchBtn').removeAttr('class').delay(300).addClass('btn btn-info btn-sm text-white');
  } else {
    /* stopping scheduling */
    $('#SchBtn').attr('title', 'Its Easy. Enter your "desired time to start with" before clicking the button.'); // BS4 ToolTip
    localStorage.removeItem("previousPost-time");
    $('#SchBtn').text('Start Scheduling');
    notAutoTime = setInterval(function(){$('#SchBtn').toggleClass('btn-info');$('#SchBtn').toggleClass('btn-warning');$('#SchBtn').toggleClass('text-white');},1800);
  }
  func_alert('<p class="my-0 text-center"><strong>Remember:</strong><br/>You may consider a Page Refresh to ensure effectiveness.</p>',2500); // Advisory
}


function func_blOnSubmit() {
  /* Part 2: setting time in localStorage */
  if ($('#SchBtn').text() == 'Stop Scheduling') {
    previousPostTime = $('#pub').val(); // capture time from the field
    localStorage.setItem('previousPost-time', previousPostTime); // store it
  }
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
