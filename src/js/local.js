/*! ===========================================================
 *      FUNCTION DECLARATIONS
 =========================================================== */

/** ===========================================================
 *      FUNC_ALERT
 *      Shows an alert type window with custom text, duration and colors
 *      with a mouseover pause type functionality.
 *
 *      @param  {TEXT   } msg - the message to be shown
 *      @param  {NUMBER } dur - duration to show the alert window
 *      @param  {COLOR  } bgc - the background color of the window
 *      @param  {COLOR  } tc  - the text's color
 *      @return {NOTHING}
 */
function func_alert(msg,dur,bgc,tc) {
  if (typeof dur === "undefined") {dur=300;} // default; if not provided by caller
  if (typeof bgc === "undefined") {bgc="#F5DA81";} // default; if not provided by caller
  if (typeof tc  === "undefined") {tc="#000";} // default; if not provided by caller
  /* if window already exists, remove it from DOM */
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
      "transform"        : "translateX(-50%)translateY(calc(-50% - .5px))",
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
  box.mouseout(function() {  // Resume, fadeOut on hover
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

/** ===========================================================
 *      FUNC_ABBREVIATENEWS
 *      @param {TEXTAREA.VALUE} HelpMeText - text captured from the textarea
 */
function Func_AbbreviateNews(HelpMeText) {
  /* setting vars to be returned */
  NewsURLNotToDo = NewsTitleToDo = NewsDscToDo = HashText = '';

  /* capturing textarea's value in a variable, also for undo ***/
  UndoText   = HelpMeText;
  NeedToUndo = false; // safe side approach to reset every time

  /* disabling previous UNDO ***/
  $('.action_set-buttons a.btn-danger').hide('fast');

  /* call regex function to replace abbreviations of the variable */
  Func_RegEx(HelpMeText);
  /* Upon returning, check if Undo needed, and create it accordingly */
  if (NeedToUndo) $('.action_set-buttons a.btn-danger').show();

  $('#helpdiv').focus();

  return;
  /*{
    NewsURLNotToDoRet : NewsURLNotToDo,
    NewsTitleToDoRet  : NewsTitleToDo,
    NewsDscToDoRet    : NewsDscToDo,
    HashTextRet       : HashText
  };*/
}

/** ===========================================================
 *      FUNC_REGEX
 *      It does the primary qualification, fetches hashtags
 *      and calls Func_RegEx_Replace to do Abbreviations.
 *
 *      @param {ANYTHING} HelpMeText - passed by caller function.
 */
function Func_RegEx(HelpMeText) {
  /* creating array of received value */
  ToBeReplaced = HelpMeText.split(/\n/);
  ToBeReplaced = ToBeReplaced.filter(Boolean); // removing blanks
  if (ToBeReplaced.length <3) {func_alert('<strong>Err...Wake up!</strong><br/>Write the news peroperly.', 1200, erMsgColor);return false;}

  /* getting HashText */
  HashText = $.grep(ToBeReplaced, function(n,i){
              return (n.match('^#',''));
            }, false);
  HashText = HashText.filter(Boolean); // removing blanks
  HashText = (HashText.length > 0) ? '# '+HashText.join(',').replace(/#\s?/g,'').replace(/\s{2,}/gm,' ').replace(/\s?,\s?/gm,', ').trim().replace(/,[\s]*$/gm,'') : ''; // removing '#' and joining as CSV

  /* filtering sans HashText */
  ToBeReplaced = $.grep(ToBeReplaced, function(n,i){
                  return (n.match('^#',''));
                }, true);

  /* concatinating complete news-description block */
    for (i = 2; i < ToBeReplaced.length; i++) {
      /* To replace comma by a period at the end of the paragraph if does not exist */
      ToBeReplaced[i] = ((/,$/).test(ToBeReplaced[i])) ? ToBeReplaced[i].replace(/,$/,'') : ToBeReplaced[i];
      /* To add a period at the end of the paragraph if does not exist */
      if (!(/\.$/).test(ToBeReplaced[i])) ToBeReplaced[i] +='.';
    }
  for (i = 3; i < ToBeReplaced.length; i++) {
    if (typeof ToBeReplaced[i] === 'undefined' || ToBeReplaced[i] == '') {} else {
      ToBeReplaced[2] += ' ' + ((!RegExp('\\.$','g').test(ToBeReplaced[i])) ? ToBeReplaced[i] +='.' : ToBeReplaced[i]);
    }
  }
  /* deleting excess elements*/
  ToBeReplaced.splice(3);


  /* fetching hash from between-the-news */
    var tempValidate1 = fetchHash(ToBeReplaced,1,HashText);
    HashText          = tempValidate1.recHashRet;
    ToBeReplaced[1]   = tempValidate1.recArrayRet[tempValidate1.recElRet];

    var tempValidate2 = fetchHash(ToBeReplaced,2,HashText);
    HashText          = tempValidate2.recHashRet;
    ToBeReplaced[2]   = tempValidate2.recArrayRet[tempValidate2.recElRet];

    HashText = HashText.replace(/(,\s,)/gm,','); // remove by replacing ', ,' by ','

  /* making NEWS values nicer */
  NewsURLNotToDo = Func_TrimAndCrisp(ToBeReplaced[0]);
  NewsTitleHash  = NewsTitleToDo  = Func_TrimAndCrisp(ToBeReplaced[1]);
  NewsDscToDo    = Func_TrimAndCrisp(ToBeReplaced[2]);

  /* add protocol 'http://' if does not exist in the URL */
  NewsURLNotToDo = (NewsURLNotToDo.match('^(https?)(?::\/\/)','gi')) ? NewsURLNotToDo : 'http://'+NewsURLNotToDo;

  /* doing ABBREVIATIONS and capturing results for title and news */
  NewsTitleToDo = Func_RegexReplace(NewsTitleToDo, 'vartitle');
  NewsDscToDo   = Func_RegexReplace(NewsDscToDo, 'vardesc');

  /* populating abbreviations in the textarea */
  NewsTitleHash = NewsTitleHash
                  .replace(/\s?\/?\:/g,',')
                  .replace(/(,?\s\[?Read[a-zA-Z\s]+\]?)$/gi,'');
  HashText = (HashText.trim().length >0) ?
              HashText :
              '# '+NewsTitleHash; //.split(' ').join(', ');
  $('#helpdiv').val(
                    NewsURLNotToDo+'\n'+
                    '\n'+
                    NewsTitleToDo+'\n'+
                    '\n'+
                    NewsDscToDo+
                    '\n'+
                    ((HashText) ? '\n'+HashText : '\n# ')
                    );

  /* SHOWING Status Message */
  nTitleCount = NewsTitleToDo.length; // Title
  sTitleMessg = (nTitleCount <= 75) ?
                  'OK<span class="d-lg-none">:</span> <span class="d-none d-lg-inline">by </span>'+(75 - nTitleCount)+'<span class="d-none d-lg-inline"> char(s)</span>' :
                  '<b>exceeds: '+(nTitleCount - 75)+'</b><span class="d-none d-lg-inline"> char(s)</span>'; // Message Creation

  nDescrCount = NewsDscToDo.split(' ').length; // Description
  sDescrMessg = (nDescrCount <= 60) ?
                  'OK<span class="d-lg-none">:</span> <span class="d-none d-lg-inline">by </span>'+(60 - nDescrCount)+'<span class="d-none d-lg-inline"> word(s)</span>' :
                  '<b>exceeds: '+(nDescrCount - 60)+'</b><span class="d-none d-lg-inline"> word(s)</span>'; // Message Creation

  erMsgColor = '#FFBABA'; // '#FFE6F6EE';
  okMsgColor = '#DFF2BF'; // '#E6FFA6EE';

  bgcTitle = (nTitleCount > 75) ? erMsgColor : okMsgColor;
  bgcDescr = (nDescrCount > 60) ? erMsgColor : okMsgColor;

  $('#news_count_head').html(sTitleMessg).css({
    'background-color': bgcTitle,
    'box-shadow': '-1px 2px 2px rgba(0,0,0,0.35)'
  });
  $('#news_count_desc').html(sDescrMessg).css({
    'background-color': bgcDescr,
    'box-shadow': '-1px 2px 2px rgba(0,0,0,0.35)'
  });
}

/** ===========================================================
 *      FETCHHASH
 *      Fetches hashtags from the received element of the array,
 *      replaces '_' with spacebar, and resturns a set-done object.
 *
 *      @param  {ARRAY  } recArray - the array, to work upon.
 *      @param  {NUMERIC} recEl    - the element number, to fetch hashtext.
 *      @param  {TEXT   } recHash  - already fetched hashtags, to be appended.
 *      @return {OBJECT }          - the finalized object
 */
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

/** ===========================================================
 *      FUNC_TRIMANDCRISP
 *      Captures and Returns the same variable after replacing doublt spacebars
 *      with single spacebar.
 *
 *      @param {TEXT} ToTrimAndCrisp - variable to work upon
 */
function Func_TrimAndCrisp(ToTrimAndCrisp) {
  if ( ToTrimAndCrisp  && typeof ToTrimAndCrisp !== 'undefined' ) {
    TrimmedAndCrisped = $.trim(ToTrimAndCrisp.replace(/\s{2,}/gm, ' '));
    return TrimmedAndCrisped;
  }
}

/** ===========================================================
 *      FUNC_REGEXREPLACE DESCRIPTION
 *      It abbreviates the received text based on an external file
 *      'global_vars.js' and specified conditions while calling it.
 *
 *      @param {TEXT} DataToRegEx   - received and returned after abbreviation
 *      @param {TEXT} ReceivedField - type of field to abbreviate accordingly
 */
function Func_RegexReplace(DataToRegEx, ReceivedField) {
  for (i = 1; i < GlobalNewsArray.length; i++) { // i=1 to omit header
    ReplaceThis = GlobalNewsArray[i][0]; // long name
    ReplaceWith = GlobalNewsArray[i][1]; // short name
    SearchTerm = new RegExp(ReplaceThis, "gim"); // creating regex
    /* capturing if there is any change */
    NeedToUndo =
      (NeedToUndo) ? true
        : DataToRegEx.match(SearchTerm) ? true
          : false;
    /* capturing replaced regex in variable */
    Replaced    = DataToRegEx.replace(SearchTerm, ReplaceWith).trim();
    DataToRegEx = Replaced;
  }
  if (ReceivedField == 'vartitle') {
    DataToRegEx=DataToRegEx.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  } else if ( ReceivedField == 'vardesc') {
    /* To Convert a character followed by a period or QuestionMark toUpperCase */
    DataToRegEx=DataToRegEx.replace(/(?:^|[\.\?]\s?)\w/g, function(match) {
      return match.toUpperCase();}
    );
  } else {}
  return DataToRegEx; // sending the value back
}

/** ===========================================================
 *      FUNC_PUSHUNDO
 *      Brings the Undo button back
 */
function Func_PushUndo() {
  $('#helpdiv').val(UndoText);
  $('.action_set-buttons a.btn-danger').hide();
  $('#helpdiv').focus();
}

/** ===========================================================
 *      [Func_ExitSq1 description]
 *      Called by Pressing 'Esc' or Button to Reset the Form using
 *      2 support functions Func_ResetConf() and Func_ResetDecl()
 */
function Func_Reset() {
  if ($('#sureMsg'.length)) {
    $('#sureMsg').remove();
  }
  $('section.form').fadeOut();
  sureMsg = '<h5 class="text-center">Caution:</h5><p>Are you Sure to RESET the form?</p>';
  sureMsg += '<div class="text-center">';
  sureMsg += '<a href="JavaScript:void(0)" onclick="Func_ResetConf();" class="btn btn-danger mr-3">Yes</a>';
  sureMsg += '<a href="JavaScript:void(0)" onclick="Func_ResetDecl();" class="btn btn-outline-secondary">No</a>';
  sureMsg += '<div>';
  $('<div/>', {
    id: 'sureMsg'
  }).css({
    "display"         : "none",
    "position"         : "absolute",
    "left"             : "50%",
    "top"              : "50%",
    "transform"        : "translate(-50%,-50%)",
    'border-radius'    : '.25em',
    'border'           : '5px solid #ff0',
    'padding'          : '1.25em 3em',
    'font-size'        : '1.1em',
    'background'        : 'lightgray',
    "box-shadow"       : "0 .25em 1em rgba(0, 0, 0, .83)",
    "text-shadow"      : "0 0 .5px rgba(0, 0, 0, .25)",
    "z-index"          : "99000000",
  }).appendTo('body').html(sureMsg);
  $('#sureMsg').fadeIn();
}
function Func_ResetConf() {
  $('#helpdiv').val('');
  if ($('#news_count_head').length) $('#news_count_head').html('').removeAttr('style');
  if ($('#news_count_desc').length) $('#news_count_desc').html('').removeAttr('style');
  $('section.form').fadeIn(function() {
    $('#sureMsg').fadeOut();
  });
  $('#sureMsg').remove();
}
function Func_ResetDecl() {
  $('section.form').fadeIn(function() {
    $('#sureMsg').fadeOut();
  });
  $('#sureMsg').remove();
}




/*! ===========================================================
 *      DOCUMENT READY FUNCTION
 =========================================================== */

/** IMPORT - RUN ONCE ====================================== */
$.getScript( "./global-vars.js");

/** DocReady =============================================== */
$('#helpdiv').keydown(function(e){
  if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey)
    // func_DataCaptureSubmit('populate'); // CTRL+ENTER BUTTON TO POPULATE
    func_alert('Oh Snap!<br/>This function is disabled in this module.',1000);
  if (e.which==27) Func_Reset(); // ESCAPE BUTTON TO CANCEL
  if (e.keyCode == 65 && e.altKey) Func_AbbreviateNews(document.getElementById('helpdiv').value); // ALT+A BUTTON TO CALL ABBREVIATE FUNCTION
  if (e.keyCode == 85 && e.altKey) if (NeedToUndo) Func_PushUndo(); // ALT+U BUTTON TO CALL UNDO FUNCTION
});