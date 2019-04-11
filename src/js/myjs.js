/*! IMPORTS - RUN ONCE
=========================================================== */
$.getScript( "http://localhost/incourt/global-vars.js");

/*! DOCUMENT READY FUNCTION
=========================================================== */
$(function () {
  /*!* STARTUP PREE-HELPSCREEN ***/
  func_Sequencify(); // SETTING FIELDS IN DESIRED ORDER
  func_MakeHelpBtn(); // CREATE AND SHOW HELP BUTTON
  func_MakeDataCapture(); // CREATE DATA_CAPTURE_SCREEN
  func_ActiHelp(); // CALL HELP MODULE UPFRONT // **optional**
  /*!* STARTUP POST-HELPSCREEN ***/
  $('.attachmentType').val(function (AttTypeValue) {
    $('.attachment-images').removeClass('hide');
    $('.attachment-url input').prop('required',false);
    $('.gallery_opner').removeClass('hide');
    $('.attachment-images input').prop('required',true);
    if (!$('.attachment-url').hasClass('hide')) $('.attachment-url').addClass('hide');
    return 'images';
  }).change(); // CHANGE ATTACHMENT TO IMAGE
  func_TitleCBtn(); // CREATE THE BUTTON AND ENABLE TITLE CASE CONVERSION
  func_InitialCatSelect(); // CATEGORY SECTION
  Func_TagSubmit(); // SUBMIT BY PRESSING 'Ctrl+Enter' IN TAGS
  /*!* SETTING ON.CHANGE EVENTS ***/
  $('#cat_select').change(func_CatSelError); // MANAGE ERRORS IN CATEGORY SELECTION
  $('[name="publisher_id"]').change(func_PubSelError); // MANAGE ERRORS IN PUBLICATION SELECTION
  /*!* COLOR VALIDATIONS ***/
  $('#title').on('keypress keyup change blur',func_BL_CountTitle); //  NEWS
  $('#description').on('keypress keyup change blur',func_BL_CountDesc); // DESCRIPTION
  /*!* CREATING KEYBOARD SHORTCUT ***/
  $(window).keydown(function(e){
      if (e.keyCode > 47 && e.keyCode <= 59 && e.ctrlKey && e.shiftKey) func_SelectCategoryFromKeyboard(e.keyCode); // ENABLES CTRL+SHIFT+N BUTTON for CATEGORY SELECTION
      if (e.keyCode == 72 && e.altKey) func_ActiHelp(); // ENABLES ALT+H BUTTON TO CALL HELP MODULE

    });
  $('.time-mask#pub[name="pub_time"]').keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) setTimeout( function () {
        $('#token-input-topic').closest('form').submit();
      }, 300); // SUBMIT THE FORM from TIME FIELD
    });
  /*!* RE-SETTING GALLERY DISPLAY ROW ***/
  $(".gallery_opner").click(function (){
    func_alert('Face-lifting gallery.');
    if (!IsGalleryManaged) { // setup the gallery if not done already
      setTimeout(function () {
        func_BetterGallery();
      },1);
    } else {
       $('.ImageGallery .img-container .gallery').css('display', '');
    }
  });
});

/*! FUNCTIONS
=========================================================== */
/* function func_MakeHelpBtn() - Floating button to offer help
=========================================================== */
function func_MakeHelpBtn() {
  // CREATING DIV AND HELPME BUTTON
  $('<div/>', {
      class: 'HelpDiv HelpDivButton',
      onClick: 'func_ActiHelp(this);'
  }).html('<u style="color: yellow">H</u>elp Me!').appendTo('body'); // HelpDiv CREATED IN BODY
  $( '.card-head header' ).after( $( '.HelpDiv.HelpDivButton' ) ); // RELOCATE
}

/* function func_ActiHelp() - Activating HelpMe button
=========================================================== */
function func_ActiHelp() {
  Summary =     (($('[name=url]')[1].value.trim() != '')  ? $('[name=url]')[1].value + '\n'  : '') +
                (($('#title').val().trim() != '')         ? $('#title').val()        + '\n'  : '') +
                (($('#description').val().trim() != '')   ? $('#description').val()          : '') +
                (($('#token-input-topic').val().trim() != '')   ? '\n'+'# '+$('#token-input-topic').val() : '');
  $('#id_news').val(Summary).change();
  $('.HelpDiv').fadeOut('fast', function() {
    $('.WordData_Container').fadeIn( function () {
      $('.WordData_Box').fadeIn(400,function () { // Start Data_Capturing
        $('#id_news').focus();
      });
    });
  });
}

/* function func_MakeDataCapture() - Activating HelpMe button
=========================================================== */
function func_MakeDataCapture() {
  $('<div/>', {
      id: 'WD_Container',
      class: 'WordData_Container',
      style: 'display: none'
  }).appendTo('body') // Container DIV CREATED IN BODY
  .keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey)
        func_DataCaptureSubmit('populate'); // CTRL+ENTER BUTTON TO POPULATE
      if(e.which==27) func_DataCaptureSubmit(this); // ESCAPE BUTTON TO CANCEL
      if (e.keyCode == 65 && e.altKey) Func_AbbreviateNews(); // ALT+A BUTTON TO CALL ABBREVIATE FUNCTION
      if (e.keyCode == 85 && e.altKey) if (NeedToUndo) Func_PushUndo(); // ALT+U BUTTON TO CALL UNDO FUNCTION
    });
  $('<div/>', {
      id: 'WD_Box',
      class: 'WordData_Box',
      style: 'display: none'
  }).appendTo('.WordData_Container'); // Box DIV CREATED IN CONTAINER
  $('<form/>', {
      id: 'WD_Box__form',
      name: 'WD_Box__form',
      class: 'form-group',
      action: '',
      method: ''
  }).appendTo('.WordData_Box'); // Form CREATED IN Box DIV
  var e = $('#WD_Box__form'); // TO REFER THE FORM AS VARIABLE
  e.html('<h4>News</h4>'); // setting the heading
  $('<textarea/>', {
      rows: '12',
      id: 'id_news',
      name: 'news',
      class: 'form-control',
      autofocus: 'autofocus',
      placeholder: 'Help:\n----------\nPara 1: URL\nPara 2: Title\nPara 3: News Description\n\nAny Paragraph starting with "#" will be treated as CSV-HashTags.'
    }).appendTo(e); // ADDING INPUT TEXTAREA TO THE FORM
  $('<a/>', {
    id: 'populate',
    class: 'btn btn-success',
    onClick: 'func_DataCaptureSubmit("populate");'
  })
    .html('[Ctrl+Ent]<span class="d-none d-md-inline"> Populate</span>')
    .appendTo(e).css('text-transform', 'initial'); // POPULATE BUTTON
  $('<a/>',{
    class: 'btn btn-warning',
    id: 'abbreviate',
    onClick: 'Func_AbbreviateNews()'
  })
    .html('[Alt+A]<span class="d-none d-md-inline"> Abbreviate</span>')
    .appendTo(e).css('text-transform', 'initial'); // ABBREVIATE BUTTON
  $('<a/>', {
    id: 'rollback',
    class: 'btn btn-outline-secondary',
    onClick: 'func_DataCaptureSubmit("");'
  })
    .html('[Esc]<span class="d-none d-md-inline"> Cancel</span>')
    .appendTo(e).css('text-transform', 'initial'); // CANCEL BUTTON
}

/* function func_DataCaptureSubmit(e) - Data_Capture Actions
=========================================================== */
function func_DataCaptureSubmit(e) {
  if ( e === 'populate') {
    $('[name=url]').removeAttr('onchange'); // -- RESETTING URL.ONCHANGE
    func_Populate();
    $('[name=url]').attr('onchange','func_AutoSelectPublisher()'); // -- SETTING URL.ONCHANGE
  } // POPULATE if chosen to Populate
  $('.WordData_Box').fadeOut(300, function () {
    $('.WordData_Container').fadeOut(100, function () {
      $('.HelpDiv').fadeIn(100, function () {
        $('#title').focus();
      });
    });
  });
}

/* function func_Populate() - Populate received News
=========================================================== */
function func_Populate() {
  news = $('#id_news').val(); // -- FETCH VALUE
  NewsDetail = news.split(/\n/); // -- CREATE ARRAY BY CARRIAGE RETURNS
  if (NewsDetail.length <3) {func_alert("<b>Err...Incomplete News</b><br/>How can I populate it?", 2400);}
  else {
    for (var a = 0; a < NewsDetail.length; a++) {
      if (typeof NewsDetail[a] === "undefined" || NewsDetail[a] === "") {
        func_alert("<b>Err...Incomplete News</b><br/>How can I populate it?", 2400);
        a = NewsDetail.length;
      }
    }
  }
  HashText = $.grep(NewsDetail, function(n,i){
              return (n.match('^#',''));
            }, false);
  HashText = (HashText.length > 0) ? HashText.join(',').replace(/#\s?/g,'').replace(/\s{1,}/gm,' ').replace(/\s?,\s?/gm,',').trim() : ''; // removing '>' and joining as CSV
  /* filtering sans HashText */
  NewsDetail = $.grep(NewsDetail, function(n,i){
                  return (n.match('^#',''));
                }, true);
  /* concatinating complete news-description block */
    /* To add a period at the end of the news if does not exist */
      if (!RegExp('\\.$','g').test(NewsDetail[2])) NewsDetail[2] +='.';
  for (var i = 3; i < NewsDetail.length; i++) {
    if (typeof NewsDetail[i] === 'undefined' || NewsDetail[i] == '') {} else {
      NewsDetail[2] += ' ' + ((!RegExp('\\.$','g').test(NewsDetail[i])) ? NewsDetail[i] +='.' : NewsDetail[i]);
    }
  }
  /* deleting excess elements*/
  NewsDetail.splice(3);
  /* TRIM RECEIVED ARRAY ELEMENTS AND FINALIZING 'NEWSDETAIL' */
  for (var j = 0; j < NewsDetail.length; j++) {
    NewsDetail[j] = Func_TrimAndCrisp(NewsDetail[j]);
  }
  /* POPULATE RECEIVED ARRAY ELEMENTS */
    // add 'http://' protocol if does not exist in the URL
    NewsDetail[0] = (NewsDetail[0].match('^(https?)(?::\/\/)','gi')) ? NewsDetail[0] : 'http://'+NewsDetail[0];
  $('input#regular1').val(NewsDetail[0]).change(); // POPULATE URL
  titlestr = (function () { // CONVERT TITLE INTO Title Case
      str = Func_RegexReplace(NewsDetail[1].replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                }));
      return str;
    });
  $('input#title').val(titlestr).change(); // POPULATE TITLE
  $('textarea#description').val(Func_RegexReplace(NewsDetail[2], 'vardesc')).change(); // POPULATE DESCRIPTION
  /*!* RUN PROPRIETORY FUNCTION for META and HINTS ***/
  $('#meta_title').val($('#title').val().replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'"<>,.\/? ])+/g, '-').toLowerCase()).change(); // HIDDEN: META TITLE
  $("#title_tag").val($("#title").val()).change(); // HIDDEN: META TITLE_TAG
  $("#meta_des").val($("#description").val()).change(); // HIDDEN: META META_DESC
  countTitle(); // RUN PROPRIETORY NEWS_TITLE VALIDATION
  /*!* END-RUN PROPRIETORY FUNCTION for META and HINTS ***/
  /*!* VALIDATIONS ***/
  /* TITLE ***/
  func_BL_CountTitle(); // RUN OWN NEWS_TITLE VALIDATION
  /* NEWS_DESCRIPTION MIXED VALIDATION ***/
  words = $("#description").val().trim().split(' ').length;
  max = 60;
  if (words > max) {
    $('#characterLeftDesc').text((max-words)+' extra words.');
  } else {
    $('#characterLeftDesc').text((max-words)+' words left');
  }
  func_BL_CountDesc();
  /*!* Push HashTexh ***/
  $('#token-input-topic').val(HashText);
  /*!* CHOOSE PUBLISHER BASED ON ENTERED URL ***/
  func_AutoSelectPublisher();
}

/* function func_BL_CountTitle() - Color Validation of NEWS
=========================================================== */
function func_BL_CountTitle(){
  words = $("#title").val().length;
  max = 75;
  if (words > max) {
    $('input#title').css({
      'transition': 'background-color 0s linear 0s',
      'background': '#FFE6E6'
    });
  } else {
    $('input#title').css({
      'transition': '',
      'background': ''
    });
  }
}

/* function func_BL_CountDesc() - Color Validation of DESCRIPTION
=========================================================== */
function func_BL_CountDesc (){
  words = $("textarea#description").val().trim().split(' ').length;
  max = 60;
  if (words > max) {
    $('textarea#description').css({
      'transition': 'background-color 0s linear 0s',
      'background': '#FFE6E6'
    });
  } else {
    $('textarea#description').css({
      'transition': '',
      'background': ''
    });
  }
}

/* function func_TitleCBtn() - Create Title Case Button
=========================================================== */
function func_TitleCBtn() {
  $('<div/>', { // CREATE THE BUTTON
    id: 'caseConvert'
  }).appendTo('body');
  $("#caseConvert").css({ // STYLE THE BUTTON
    'color': 'rgb(85, 85, 85)',
    'padding': '1px 1rem 0px',
    'border-radius': '0.25em',
    'background': 'rgba(255, 255, 0, 0.1)',
    'box-shadow': 'rgba(0, 0, 0, 0.33) 0px 1px 3px 0px',
    'cursor': 'pointer',
    'font': '14px/32px Roboto, sans-serif',
    'display': 'inline-block',
    'float': 'right',
    'margin-top': '5px'
  })
    .hover(function() {
      $(this).css({
        'background': 'rgba(255, 255, 0, 0.2)',
        'box-shadow': '0 3px 8px 0 rgba(0, 0, 0, 0.38)'
      });
    }, function() {
      $(this).css({
        'background': 'rgba(255, 255, 0, 0.1)',
        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.33)'
      });
    })
    .html('TitleCase');
  $( 'LABEL[FOR="title"]' ).after( $( '#caseConvert' ) ); // RELOCATE THE BUTTON
  $('#caseConvert').click(func_TitleConvert);
}

/* function func_TitleConvert() - Convert TITLE
=========================================================== */
function func_TitleConvert() {
  str = $('#title').val().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
  $('#title').val(str).change();
}

/* function func_InitialCatSelect() - Category AUTO Setup
=========================================================== */
function func_InitialCatSelect() {
  // add separator
  $('.input-field.col.s12.check-box-inline p').eq(1).after($('<hr style="margin:.5em 0" />'));
  // add the counter at the end
  countCategory = $('[name^=category]').length;
  for (var m = 0; m < countCategory+1; m++) {
    GetThisValue = '.input-field.col.s12.check-box-inline p:nth-of-type(' + m + ') label';
    if (m<countCategory) {
      $(GetThisValue).append('&nbsp;&nbsp;&nbsp;&nbsp;(c+s+'+m+')');
    } else {
      $(GetThisValue).append('&nbsp;&nbsp;&nbsp;&nbsp;(c+s+0)');
    }
  }
  $("#cat_1").prop('checked', true).change(); // AUTOSELECT 'Top Stories'
  $("#cat_4").prop('checked', true).change(); // AUTOSELECT 'Legal'
  $("#cat_select").val(1).change(); // CHOOSE 'Top Stories' IN THE DROPDOWN
  /* Nikita asked NOT TO DO IT
    $('input[name="push_button"]').prop('checked', true); // 'Push Notification'
  */
}

/* function func_SelectCategoryFromKeyboard() - by Keyboard
=========================================================== */
function func_SelectCategoryFromKeyboard(CatKeyPressed) {
  arr = CatMapArray.filter( function( el ) {
      return !!~el.indexOf( CatKeyPressed );
  } );
  SelCatChosen = arr[0][1]; // Returns Chosen Category VALUE (i.e. 1 to 13_or_ last number of categories)
  CountCats = $('[name^=category]').length; // counting elements starting with 'category' in name attribute
  LastCatSeqValue = parseInt($('[name^=category]').eq(CountCats-1).attr('value'),10); // getting last cat's VALUE as numeric
  if ( SelCatChosen == 0 ) {                                // if keypress is 0 i.e. 10th element
    func_toggleCategory(SelCatChosen, 0, 0);
  } else if ( SelCatChosen > 0 && SelCatChosen < 3 ) {      // if keypress is between or equal to 1 & 2
    func_toggleCategory(SelCatChosen, 1, 2);
  } else if ( SelCatChosen >= 3 ) {                         // if keypress is between or equal to 3 to 9
    func_toggleCategory(SelCatChosen, 3, LastCatSeqValue);
  }
  function func_toggleCategory(CatToAdd, RangeStart, RangeEnd) {
    console.log('RangeEnd: ', RangeEnd);
    /* UnSet List */
    for (var i = RangeStart; i < RangeEnd+1; i++) {
      CatUnset = '#cat_'+i;                                   // creating CATEGORY ID to be selected into variable
      $(CatUnset).prop('checked', false).change();            // List UnSet
    }
    /* Set List */
    CatSet = '#cat_'+CatToAdd;
    $(CatSet).prop('checked', true).change();                 // List Set
    if ( CatToAdd == 1 || CatToAdd == 2 ) {                   // Drop down: only for First two options
      $("#cat_select").val(CatToAdd).change();                // Drop down
    }
  }
  /* Validation */
  func_CatSelError();
}

/* function func_CatSelError() - Category Error Capture
=========================================================== */
function func_CatSelError() {
  if ( !($('#cat_select').val()) ) { // IF contains NO value
    $("#cat_select").css({ // ERROR
      background: 'orangered',
           color: 'white'
    });
  } else {
    $("#cat_select").css({ // SUCCESS
      background: '',
           color: ''
    });
  }
}

/* function func_PubSelError() - Category Error Capture
=========================================================== */
function func_PubSelError() {
  if ( !($('[name=publisher_id]').val()) ) { // IF contains NO value
    $("[name=publisher_id]").css({ // ERROR
      background: 'orangered',
           color: 'white'
    });
  } else {
    $("[name=publisher_id]").css({ // SUCCESS
      background: '',
           color: ''
    });
  }
}

/* function func_Sequencify() - Sequencing FIELDS
=========================================================== */
function func_Sequencify() {
    Func_SeqInputGroups(); // IDENTIFY INPUT GROUPS AND SEQUENTIALIZE GROUPS
    Func_RePosition(); // RELPOSITION INPUT GROUP
}

/* function Func_SeqInputGroups() - ATTACH IDENTIFIER 'SEQ'
=========================================================== */
function Func_SeqInputGroups(e) {
  /*!* ADDING LEFTPANEL AND RIGHTPANEL ***/
  $('.page .col-md-8').attr('panel', 'LEFTPANEL').removeClass('col-md-8').addClass('col-md-9');
  $('.page .col-md-4').attr('panel', 'RIGHTPANEL').removeClass('col-md-4').addClass('col-md-3');
  /*!* ADDING 'SEQ' IDENTIFIER ***/
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(2)').attr('seq', 'TITLE');  // TITLE
      $('[SEQ="TITLE"] input').attr('placeholder', 'TITLE');  // TITLE
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(3)').attr('seq', 'PUBLISHER');  // PUBLISHER
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(4)').attr('seq', 'HASHTAGS');  // HASHTAGS
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(5)').attr('seq', 'URL');  // URL
      $('[SEQ="URL"] input').attr('placeholder', 'URL');  // URL
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(6)').attr('seq', 'ATTACH_6');  // ATTACHMENT 6
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) input').attr('placeholder', 'please enter URL of the video here...');  // ATTACHMENT 7 - mentioning placeholder
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7)').attr('seq', 'ATTACH_7');  // ATTACHMENT 7
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) + DIV').attr('seq', 'ATTACH_8');  // ATTACHMENT 8
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) + DIV + DIV').attr('seq', 'ATTACH_9');  // ATTACHMENT 9
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(10)').attr('seq', 'NEWSDESCRIPTION');  // NEWSDESCRIPTION
      $('[SEQ="NEWSDESCRIPTION"] textarea').attr('placeholder', 'NEWS DETAIL');  // NEWSDESCRIPTION
  Func_ClubAttach(); // CLUB ATTACHMENTS INTO ONE
    function Func_ClubAttach(e) { // ATTACH IDENTIFIER 'SEQ'
      $('<div/>', { // CREATE DIV.ATTACHMENT TO BODY
          seq: 'ATTACHMENT'
      }).appendTo('body');
      /* RELOCATE ATTACHMENTS INTO DIV.ATTACHMENT */
      $('[seq="ATTACH_6"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_7"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_8"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_9"]').appendTo('[seq="ATTACHMENT"]');
      /* RELOCATE DIV.ATTACHMENT AFTER HASHTAGS */
      $('[seq="HASHTAGS"]').after( $('[seq="ATTACHMENT"]') );
    }
}

/* function Func_RePosition() - REPOSITION ON THE BASIS OF 'SEQ'
=========================================================== */
function Func_RePosition(e) {
  $('input[name="_token"]').after( $('[seq="URL"]') );
  $('[seq="TITLE"]').after( $('[seq="NEWSDESCRIPTION"]') );
  $('[seq="NEWSDESCRIPTION"]').after( $('[seq="ATTACHMENT"]') );
  $('label[for="pub_select"]').html('Publisher');
  $('#topic + label').html('#Tags');
}

/* function Func_TagSubmit() - Submit by pressing 'Ctrl+Enter'
=========================================================== */
function Func_TagSubmit(e) {
  $('#token-input-topic').keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) setTimeout( function () {
        func_alert('Saving News',1300);
        setTimeout(function () {
          $('#token-input-topic').closest('form').submit();
        }, 1000);
      }, 0); // SUBMIT THE FORM
    });
}

/* ******************************************************
/* function func_alert() - raise notificaton anywhere
/* :: receives four parameters (msg,dur,background-color,
/* :: and text-color)
****************************************************** */
function func_alert(msg,dur,bgc,tc) {
  if (typeof dur === "undefined") {dur=300;} // default; if not provided by caller
  if (typeof bgc === "undefined") {bgc="#F5DA81";} // default; if not provided by caller
  if (typeof tc === "undefined") {tc="#000";} // default; if not provided by caller
  if ($('#myalertwindow'.length)) {
    $('#myalertwindow').remove();
  }
  box = $('<div/>', { // THE ALERT WINDOW
      id: 'myalertwindow',
      class: 'text-center'
  }).css({
      "position": "absolute",
      "left": "50%",
      "top": "50%",
      "transform": "translate(-50%,-50%)",
      'border-radius': '.25em',
      'border': '5px solid #fff',
      'padding': '1.25em 3em',
      'font-size': '1.15em',
      'font-weight': '400',
      "background-color": bgc,
      "color": tc,
      "box-shadow": "0 .5em 1em rgba(0, 0, 0, .4)",
      "text-shadow": "0 0 .5px rgba(0, 0, 0, .25)",
      "z-index": "99000000",
  }).appendTo('body').html(msg);
  box.fadeIn(300)
    .delay(dur)
    .fadeOut(300, function () {
      box.remove();
    });
}
