/*! IMPORTS - RUN ONCE
=========================================================== */
$.getScript( "http://localhost/incourt/global-vars.js");

/*! DOCUMENT READY FUNCTION
=========================================================== */
$(function () {
/*!* STARTUP PREE-HELPSCREEN ***/
  func_Sequencify(); 
  func_MakeHelpBtn(); 
  func_MakeDataCapture(); 
  func_ActiHelp(); 
/*!* STARTUP POST-HELPSCREEN ***/
  $('.attachmentType').val(function (AttTypeValue) {
    $('.attachment-images').removeClass('hide');
    $('.attachment-url input').prop('required',false);
    $('.gallery_opner').removeClass('hide');
    $('.attachment-images input').prop('required',true);
    if (!$('.attachment-url').hasClass('hide')) $('.attachment-url').addClass('hide');
    return 'images';
  }).change(); 
  func_TitleCBtn(); 
  func_InitialCatSelect(); 
  Func_TagSubmit(); 
/*!* SETTING ON.CHANGE EVENTS ***/
  $('#cat_select').change(func_CatSelError); 
  $('[name="publisher_id"]').change(func_PubSelError); 
/*!* COLOR VALIDATIONS ***/
  $('#title').on('keypress keyup change blur',func_BL_CountTitle); 
  $('#description').on('keypress keyup change blur',func_BL_CountDesc); 
/*!* CREATING KEYBOARD SHORTCUT ***/
  $(window).keydown(function(e){
      if (e.keyCode > 47 && e.keyCode <= 59 && e.ctrlKey && e.shiftKey) func_SelectCategoryFromKeyboard(e.keyCode); 
      if (e.keyCode == 72 && e.altKey) func_ActiHelp(); 

    });
  $('.time-mask#pub[name="pub_time"]').keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) setTimeout( function () {
        $('#token-input-topic').closest('form').submit();
      }, 300); 
    });
/*!* RE-SETTING GALLERY DISPLAY ROW ***/
  $(".gallery_opner").click(function (){
    if (!IsGalleryManaged) { 
      func_alert('Readying gallery.',5000);
      func_BetterGallery();
    } else {
       $('.ImageGallery .img-container .gallery').css('display', '');
    }
  });
});

/*! FUNCTIONS
=========================================================== */
function func_MakeHelpBtn() {
  $('<div/>', {
      class: 'HelpDiv HelpDivButton',
      onClick: 'func_ActiHelp(this);'
  }).html('<u style="color: yellow">H</u>elp Me!').appendTo('body'); 
  $( '.card-head header' ).after( $( '.HelpDiv.HelpDivButton' ) ); 
}

function func_ActiHelp() {
  Summary =     (($('#title').val().trim() != '')         ? $('#title').val().trim() + '\n'         : '') +
                (($('[name=url]')[1].value.trim() != '')  ? $('[name=url]')[1].value.trim() + '\n'  : '') +
                (($('#description').val().trim() != '')   ? $('#description').val().trim()          : '');
  $('#id_news').val(Summary).change();
  $('.HelpDiv').fadeOut('fast', function() {
    $('.WordData_Container').fadeIn( function () {
      $('.WordData_Box').fadeIn(400,function () { 
        $('#id_news').focus();
      });
    });
  });
}

function func_MakeDataCapture() {
  $('<div/>', {
      id: 'WD_Container',
      class: 'WordData_Container',
      style: 'display: none'
  }).appendTo('body') 
  .keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey)
        func_DataCaptureSubmit('populate'); 
      if(e.which==27) func_DataCaptureSubmit(this); 
      if (e.keyCode == 65 && e.altKey) if ($('#id_news').val().trim()) Func_AbbreviateNews(); 
      if (e.keyCode == 85 && e.altKey) if (NeedToUndo) Func_PushUndo(); 
    });
  $('<div/>', {
      id: 'WD_Box',
      class: 'WordData_Box',
      style: 'display: none'
  }).appendTo('.WordData_Container'); 
  $('<form/>', {
      id: 'WD_Box__form',
      name: 'WD_Box__form',
      class: 'form-group',
      action: '',
      method: ''
  }).appendTo('.WordData_Box'); 
  var e = $('#WD_Box__form'); 
  e.html('<h4>News</h4>'); 
  $('<textarea/>', {
      rows: '10',
      id: 'id_news',
      name: 'news',
      class: 'form-control',
      autofocus: 'autofocus',
      placeholder: 'Line #1: Title\nLine #2: URL\nLine #3: News Description\n\nNOTE: Extra content will be taken away.'
    }).appendTo(e); 
  $('<a/>', {
    id: 'populate',
    class: 'btn btn-success',
    onClick: 'func_DataCaptureSubmit("populate");'
  })
    .html('<span class="text-white">[Ctrl+Enter]</span> Populate')
    .appendTo(e).css('text-transform', 'initial'); 
  $('<a/>',{
    class: 'btn btn-warning',
    id: 'abbreviate',
    onClick: 'Func_AbbreviateNews()'
  })
    .html('<span class="text-white">[Alt+A]</span> Abbreviate')
    .appendTo(e).css('text-transform', 'initial'); 
  $('<a/>', {
    id: 'rollback',
    class: 'btn btn-outline-secondary',
    onClick: 'func_DataCaptureSubmit("");'
  })
    .html('<span class="text-white">[Esc]</span> Cancel')
    .appendTo(e).css('text-transform', 'initial'); 
}

function func_DataCaptureSubmit(e) {
  if ( e === 'populate') {
    $('[name=url]').removeAttr('onchange'); 
    func_Populate();
    $('[name=url]').attr('onchange','func_AutoSelectPublisher()'); 
  } 
  $('.WordData_Box').fadeOut(300, function () {
    $('.WordData_Container').fadeOut(100, function () {
      $('.HelpDiv').fadeIn(100, function () {
        $('#title').focus();
      });
    });
  });
}

function func_Populate() {
  news = $('#id_news').val().trim(); 
  count_ln  = news.split(/\n/).length; 
  NewsDetail = news.split("\n"); 
  var i;
  for (i = 0; i < count_ln; i++) {
    NewsDetail[i] = NewsDetail[i].trim();
  }
  if (i<3) {func_alert('Incomplete News.');}
  titlestr = (function () { 
      str = Func_RegexReplace(NewsDetail[0].replace(/(?:^|\s)\w/g, function(match) {
                    return match.toUpperCase();
                }));
      return str;
    });
  $('input#title').val(titlestr).change(); 
    NewsDetail[1] = (NewsDetail[1].match('^(https?)(?::\/\/)','gi')) ? NewsDetail[1] : 'http://'+NewsDetail[1];
  $('input#regular1').val(NewsDetail[1]).change(); 
  $('textarea#description').val(Func_RegexReplace(NewsDetail[2], 'vardesc')).change(); 
/*!* RUN PROPRIETORY FUNCTION for META and HINTS ***/
  $('#meta_title').val($('#title').val().replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'"<>,.\/? ])+/g, '-').toLowerCase()).change(); 
  $("#title_tag").val($("#title").val()).change(); 
  $("#meta_des").val($("#description").val()).change(); 
  countTitle(); 
/*!* END-RUN PROPRIETORY FUNCTION for META and HINTS ***/
/*!* VALIDATIONS ***/
  func_BL_CountTitle(); 
  words = $("#description").val().trim().split(' ').length;
  max = 60;
  if (words > max) {
    $('#characterLeftDesc').text((max-words)+' extra words.');
  } else {
    $('#characterLeftDesc').text((max-words)+' words left');
  }
  func_BL_CountDesc();
/*!* CHOOSE PUBLISHER BASED ON ENTERED URL ***/
  func_AutoSelectPublisher();
}

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

function func_TitleCBtn() {
  $('<div/>', { 
    id: 'caseConvert'
  }).appendTo('body');
  $("#caseConvert").css({ 
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
  $( 'LABEL[FOR="title"]' ).after( $( '#caseConvert' ) ); 
  $('#caseConvert').click(func_TitleConvert);
}

function func_TitleConvert() {
  str = $('#title').val().replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
  $('#title').val(str).change();
}

function func_InitialCatSelect() {
  $('.input-field.col.s12.check-box-inline p').eq(1).after($('<hr style="margin:.5em 0" />'));
  countCategory = $('[name^=category]').length;
  for (var m = 0; m < countCategory+1; m++) {
    GetThisValue = '.input-field.col.s12.check-box-inline p:nth-of-type(' + m + ') label';
    if (m<countCategory) {
      $(GetThisValue).append('&nbsp;&nbsp;&nbsp;&nbsp;(c+s+'+m+')');
    } else {
      $(GetThisValue).append('&nbsp;&nbsp;&nbsp;&nbsp;(c+s+0)');
    }
  }
  $("#cat_1").prop('checked', true).change(); 
  $("#cat_4").prop('checked', true).change(); 
  $("#cat_select").val(1).change(); 
}

function func_SelectCategoryFromKeyboard(CatKeyPressed) {
  arr = CatMapArray.filter( function( el ) {
      return !!~el.indexOf( CatKeyPressed );
  } );
  SelCatChosen = arr[0][1]; 
  CountCats = $('[name^=category]').length; 
  LastCatSeqValue = parseInt($('[name^=category]').eq(CountCats-1).attr('value'),10); 
  if ( SelCatChosen == 0 ) {                                
    func_toggleCategory(SelCatChosen, 0, 0);
  } else if ( SelCatChosen > 0 && SelCatChosen < 3 ) {      
    func_toggleCategory(SelCatChosen, 1, 2);
  } else if ( SelCatChosen >= 3 ) {                         
    func_toggleCategory(SelCatChosen, 3, LastCatSeqValue);
  }
  function func_toggleCategory(CatToAdd, RangeStart, RangeEnd) {
    console.log('RangeEnd: ', RangeEnd);
    for (var i = RangeStart; i < RangeEnd+1; i++) {
      CatUnset = '#cat_'+i;                                   
      $(CatUnset).prop('checked', false).change();            
    }
    CatSet = '#cat_'+CatToAdd;
    $(CatSet).prop('checked', true).change();                 
    if ( CatToAdd == 1 || CatToAdd == 2 ) {                   
      $("#cat_select").val(CatToAdd).change();                
    }
  }
  func_CatSelError();
}

function func_CatSelError() {
  if ( !($('#cat_select').val()) ) { 
    $("#cat_select").css({ 
      background: 'orangered',
           color: 'white'
    });
  } else {
    $("#cat_select").css({ 
      background: '',
           color: ''
    });
  }
}

function func_PubSelError() {
  if ( !($('[name=publisher_id]').val()) ) { 
    $("[name=publisher_id]").css({ 
      background: 'orangered',
           color: 'white'
    });
  } else {
    $("[name=publisher_id]").css({ 
      background: '',
           color: ''
    });
  }
}

function func_Sequencify() {
    Func_SeqInputGroups(); 
    Func_RePosition(); 
}

function Func_SeqInputGroups(e) {
/*!* ADDING LEFTPANEL AND RIGHTPANEL ***/
  $('.page .col-md-8').attr('panel', 'LEFTPANEL').removeClass('col-md-8').addClass('col-md-9');
  $('.page .col-md-4').attr('panel', 'RIGHTPANEL').removeClass('col-md-4').addClass('col-md-3');
/*!* ADDING 'SEQ' IDENTIFIER ***/
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(2)').attr('seq', 'TITLE');  
      $('[SEQ="TITLE"] input').attr('placeholder', 'TITLE');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(3)').attr('seq', 'PUBLISHER');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(4)').attr('seq', 'HASHTAGS');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(5)').attr('seq', 'URL');  
      $('[SEQ="URL"] input').attr('placeholder', 'URL');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(6)').attr('seq', 'ATTACH_6');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) input').attr('placeholder', 'please enter URL of the video here...');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7)').attr('seq', 'ATTACH_7');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) + DIV').attr('seq', 'ATTACH_8');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(7) + DIV + DIV').attr('seq', 'ATTACH_9');  
  $('[panel="LEFTPANEL"] .card-body > .form-group:nth-of-type(10)').attr('seq', 'NEWSDESCRIPTION');  
      $('[SEQ="NEWSDESCRIPTION"] textarea').attr('placeholder', 'NEWS DETAIL');  
  Func_ClubAttach(); 
    function Func_ClubAttach(e) { 
      $('<div/>', { 
          seq: 'ATTACHMENT'
      }).appendTo('body');
      $('[seq="ATTACH_6"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_7"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_8"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="ATTACH_9"]').appendTo('[seq="ATTACHMENT"]');
      $('[seq="HASHTAGS"]').after( $('[seq="ATTACHMENT"]') );
    }
}

function Func_RePosition(e) {
  $('input[name="_token"]').after( $('[seq="URL"]') );
  $('[seq="TITLE"]').after( $('[seq="NEWSDESCRIPTION"]') );
  $('[seq="NEWSDESCRIPTION"]').after( $('[seq="ATTACHMENT"]') );
  $('label[for="pub_select"]').html('Publisher');
  $('#topic + label').html('#Tags');
}

function Func_TagSubmit(e) {
  $('#token-input-topic').keydown(function(e){
      if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) setTimeout( function () {
        $('#token-input-topic').closest('form').submit();
      }, 300); 
    });
}

function func_alert(msg,dur,bgc,tc) {
  if (typeof dur === "undefined") {dur=300;} 
  if (typeof bgc === "undefined") {bgc="#F5DA81";} 
  if (typeof tc === "undefined") {tc="#000";} 
  if ($('#myalertwindow'.length)) {
    $('#myalertwindow').remove();
  }
  box = $('<div/>', { 
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
      'font-size': '1.25em',
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

/*! CREATING PUBLISHER KEY OBJECT - RUN ONCE
=========================================================== */
$('[name=url]').attr('onchange','func_AutoSelectPublisher()');
var ObjAllPublication = {};
$('[name=publisher_id] option').each(function() {
  ObjAllPublication[$(this).html().replace(/(\s)+/g, '').toLowerCase()] = $(this).val(); 
});

/*! PUBLISHER FUNCTIONS
=========================================================== */
function func_AutoSelectPublisher() {
  var PublisherSiteName = $('<a/>').addClass('tempPubFilter').prop('href', $('[name=url]')[1].value).prop('hostname'); $('a.tempPubFilter').remove(); 
  var RegexPattern = /^(?:www\.)?(\w*)\.(\w*)/;
  PublisherSiteName = PublisherSiteName.match(RegexPattern)[1] ; 
  if (PublisherSiteName == 'dnaindia') PublisherSiteName = 'dna';
  $.each(ObjAllPublication, function(index, el) {
    shortPublisherSiteName = PublisherSiteName.substring(0,8);
    if (index.match(PublisherSiteName,'/gi')) {
      $('[name=publisher_id]').val(el).change(); 
      func_alert('<span class="h5">Publisher: </span>&nbsp;'+index, 1000, '#d6f481');
      return !(index.match(PublisherSiteName,'/gi'));
    } else if (index.match(shortPublisherSiteName,'/gi')) {
      $('[name=publisher_id]').val(el).change(); 
      func_alert('<span class="h5">Publisher: </span>&nbsp;'+index, 1000, '#d6f481');
      return !(index.match(shortPublisherSiteName,'/gi'));
    } else {
      $('[name=publisher_id]').val('').change();
      func_alert('<span class="h5">Publisher: Select Manually</span>', 2000, '#f4a081', '#fff');
    }
  });
  func_PubSelError();
}

/*! ABBREVIATE FUNCTIONS
=========================================================== */
function Func_AbbreviateNews() {
  $('#id_news ~ a.btn-danger').remove();
  UndoText = HelpMeText = '';
  UndoText = HelpMeText = $('#id_news').val();
  NeedToUndo = false; 
  if ( HelpMeText ) Func_RegEx(HelpMeText);
  if (NeedToUndo) Func_CreateUndo();
  $('#id_news').focus();
}

function Func_RegEx(HelpMeText) {
  ToBeReplaced = HelpMeText.split(/\n/);
  NewsTitleToDo = (Func_TrimAndCrisp(ToBeReplaced[0]) ?
   Func_TrimAndCrisp(ToBeReplaced[0]) :
    '*** Title EMPTY ***');
  NewsURLNotToDo = (Func_TrimAndCrisp(ToBeReplaced[1]) ?
   Func_TrimAndCrisp(ToBeReplaced[1]) :
    '*** URL EMPTY ***');
  NewsDscToDo = (Func_TrimAndCrisp(ToBeReplaced[2]) ?
   Func_TrimAndCrisp(ToBeReplaced[2]) :
    '*** News Detail EMPTY ***');
  if (NewsTitleToDo  && typeof NewsTitleToDo !== 'undefined') NewsTitleToDo=Func_RegexReplace(NewsTitleToDo, 'vartitle');
  if (NewsDscToDo  && typeof NewsDscToDo !== 'undefined') NewsDscToDo=Func_RegexReplace(NewsDscToDo, 'vardesc');
  NewsURLNotToDo = (NewsURLNotToDo.match('^(https?)(?::\/\/)','gi')) ? NewsURLNotToDo : 'http://'+NewsURLNotToDo;
  $('#id_news').val(
                    NewsTitleToDo+'\n'+
                    NewsURLNotToDo+'\n'+
                    NewsDscToDo
                    );
}

function Func_RegexReplace(DataToRegEx, ReceivedField) {
  for (i = 1; i < GlobalNewsArray.length; i++) { 
    ReplaceThis = GlobalNewsArray[i][0]; 
    ReplaceWith = GlobalNewsArray[i][1]; 
    SearchTerm = new RegExp(ReplaceThis, "gim"); 
    NeedToUndo =
      (NeedToUndo) ? true
        : DataToRegEx.match(SearchTerm) ? true
          : false;
    Replaced = DataToRegEx.replace(SearchTerm, ReplaceWith).trim();
    DataToRegEx = Replaced;
  }
  if (ReceivedField == 'vartitle') {
    DataToRegEx=DataToRegEx.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  } else if ( ReceivedField == 'vardesc') {
    DataToRegEx=DataToRegEx.replace(/(?:^|\.\s?)\w/g, function(match) {
      return match.toUpperCase();}
    );
    if (!RegExp('\\.$','g').test(DataToRegEx)) DataToRegEx+='.';
  } else {}
  return DataToRegEx; 
}

function Func_TrimAndCrisp(ToTrimAndCrisp) {
  if ( ToTrimAndCrisp  && typeof ToTrimAndCrisp !== 'undefined' ) {
    TrimmedAndCrisped = $.trim(ToTrimAndCrisp.replace(/\s{2,}/gm, ' '));
    return TrimmedAndCrisped;
  }
}

function Func_CreateUndo() {
  $('#id_news ~ a:last-of-type()').after(
    $('<a/>',{
      class: 'btn btn-danger float-right',
      onClick: 'Func_PushUndo(this);'
    })
    .html('<span class="text-white">[Alt+U]</span> Undo')
    .css('text-transform', 'initial')
  );
}

function Func_PushUndo() {
  $('#id_news').val(UndoText);
  $('#id_news ~ a.btn-danger').remove();
  $('#id_news').focus();
}

/*! LIBRARY: GALLERY functions
=========================================================== */
function func_BetterGallery() {
  $('.ImageGallery.customModal .pp-cell > div').css('max-width', '90%');
  $('.ImageGallery.customModal .pp-cell > div h2').text('Select Image From Gallery:').addClass('h3');
  $('.ImageGallery.customModal .pp-cell > div .img-container').addClass('container');
  $('.ImageGallery.customModal .img-container .gallery')
  .addClass('row align-items-center')
  .css({
    height: '70vH',
    padding: '',
    display: ''
  });
  $('.ImageGallery.customModal .img-container .gallery .img').removeAttr('style').addClass('mb-3'); 
  $('.ImageGallery.customModal .img-container .gallery .img').addClass('col-6 col-md-4 col-xl-3').removeAttr('style');
  $('.ImageGallery.customModal .img-container .gallery div').not(".img").remove();
  $('.ImageGallery.customModal .img-container .gallery .img a img').removeAttr('height width');
  $('.ImageGallery.customModal .img-container .gallery .img a img').addClass('img-responsive').css({
    'border': '4px solid #fff',
    'box-shadow': '0 2px 8px rgba(0,0,0,0.5)'
  });
  IsGalleryManaged = true;
  $('.ImageGallery.customModal .img-container .gallery').css('display', '');
  setTimeout(function () {
    func_alert('Gallery ready.');
  },300);
}

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
  }).appendTo('body'); 

  $('<div/>', {
      class: 'LH_Box',
      style: 'display: none'
  }).appendTo('.WordData_Container'); 

  $('<div/>', {
      class: 'LH_Box__body'
  }).appendTo('.WordData_Box'); 
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
