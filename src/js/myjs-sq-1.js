/*! CREATING PUBLISHER KEY OBJECT - RUN ONCE
=========================================================== */
$('[name=url]').attr('onchange','func_AutoSelectPublisher()');
var ObjAllPublication = {};
$('[name=publisher_id] option').each(function() {
  /* capturing Publishers into Object */
    // ObjAllPublication[$(this).html()] = $(this).val(); // SYNTAX
  ObjAllPublication[$(this).html().replace(/(\s)+/g, '').toLowerCase()] = $(this).val(); // removing spaces and making lowercase
});

/*! PUBLISHER FUNCTIONS
=========================================================== */
/* function func_AutoSelectPublisher() - AutoSelect Publisher
=========================================================== */
function func_AutoSelectPublisher() {
  var PublisherSiteName = $('<a/>').addClass('tempPubFilter').prop('href', $('[name=url]')[1].value).prop('hostname'); $('a.tempPubFilter').remove(); // remove this anchor.tempPubFilter shit
  var RegexPattern = /^(?:www\.)?(\w*)\.(\w*)/;
  PublisherSiteName = PublisherSiteName.match(RegexPattern)[1] ; // Capture PublisherSiteName FINAL
  if (PublisherSiteName == 'dnaindia') PublisherSiteName = 'dna';
  $.each(ObjAllPublication, function(index, el) {
    // console.log(index.toUpperCase(), 'v/s', PublisherSiteName);
    shortPublisherSiteName = PublisherSiteName.substring(0,8);
    if (index.match(PublisherSiteName,'/gi')) {
      $('[name=publisher_id]').val(el).change(); // setting Publisher in console
      func_alert('<span class="h5">Publisher: </span>&nbsp;'+index, 1000, '#d6f481');
      return !(index.match(PublisherSiteName,'/gi'));
    } else if (index.match(shortPublisherSiteName,'/gi')) {
      /* reverse_check: get first eight chars from PublisherSiteName and match */
      $('[name=publisher_id]').val(el).change(); // setting Publisher in console
      func_alert('<span class="h5">Publisher: </span>&nbsp;'+index, 1000, '#d6f481');
      return !(index.match(shortPublisherSiteName,'/gi'));
    } else {
      /* if NOTHING MATCHES, setting default value */
      $('[name=publisher_id]').val('').change();
      func_alert('<span class="h5">Publisher: Select Manually</span>', 2000, '#f4a081', '#fff');
    }
  });
  func_PubSelError();
}

/*! ABBREVIATE FUNCTIONS
=========================================================== */
/* Func_AbbreviateNews() - Starts Abbreviation, Manages Undo
=========================================================== */
function Func_AbbreviateNews() {
  /* disabling further UNDO ***/
  $('#id_news ~ a.btn-danger').remove();
  /* capturing textarea's value in a variable also for undo ***/
  UndoText = HelpMeText = '';
  UndoText = HelpMeText = $('#id_news').val();
  NeedToUndo = false; // safe side approach to reset every time
  /* call regex function to replace abbreviations of the variable */
  if ( HelpMeText ) Func_RegEx(HelpMeText);
  if (NeedToUndo) Func_CreateUndo();
  $('#id_news').focus();
}

/* Func_RegEx() - receives TEXTAREA as HelpMeText, calls RegexReplace, and returns
=========================================================== */
function Func_RegEx(HelpMeText) {
  /* creating array of received value */
  ToBeReplaced = HelpMeText.split(/\n/);
  /* making values nicer */
  NewsTitleToDo = (Func_TrimAndCrisp(ToBeReplaced[0]) ?
   Func_TrimAndCrisp(ToBeReplaced[0]) :
    '*** Title EMPTY ***');
  NewsURLNotToDo = (Func_TrimAndCrisp(ToBeReplaced[1]) ?
   Func_TrimAndCrisp(ToBeReplaced[1]) :
    '*** URL EMPTY ***');
  NewsDscToDo = (Func_TrimAndCrisp(ToBeReplaced[2]) ?
   Func_TrimAndCrisp(ToBeReplaced[2]) :
    '*** News Detail EMPTY ***');
  /* doing abbreviations and capturing results for title and news */
  if (NewsTitleToDo  && typeof NewsTitleToDo !== 'undefined') NewsTitleToDo=Func_RegexReplace(NewsTitleToDo, 'vartitle');
  if (NewsDscToDo  && typeof NewsDscToDo !== 'undefined') NewsDscToDo=Func_RegexReplace(NewsDscToDo, 'vardesc');
  /* add 'http://' protocol if does not exist in the URL */
  NewsURLNotToDo = (NewsURLNotToDo.match('^(https?)(?::\/\/)','gi')) ? NewsURLNotToDo : 'http://'+NewsURLNotToDo;
  /* populating abbreviations in the textarea */
  $('#id_news').val(
                    NewsTitleToDo+'\n'+
                    NewsURLNotToDo+'\n'+
                    NewsDscToDo
                    );
}

/* Func_RegexReplace() - Gets DataToRegEx, sets up the RegEx and returns
=========================================================== */
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
    Replaced = DataToRegEx.replace(SearchTerm, ReplaceWith).trim();
    DataToRegEx = Replaced;
  }
  if (ReceivedField == 'vartitle') {
    DataToRegEx=DataToRegEx.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  } else if ( ReceivedField == 'vardesc') {
    /* To Convert a character followed by a period toUpperCase */
    DataToRegEx=DataToRegEx.replace(/(?:^|\.\s?)\w/g, function(match) {
      return match.toUpperCase();}
    );
    /* To add a period at the end of the news if does not exist */
    if (!RegExp('\\.$','g').test(DataToRegEx)) DataToRegEx+='.';
  } else {}
  return DataToRegEx; // sending the value back
}

/* Func_TrimAndCrisp(ToTrimAndCrisp) - trims the received text and returns
=========================================================== */
function Func_TrimAndCrisp(ToTrimAndCrisp) {
  if ( ToTrimAndCrisp  && typeof ToTrimAndCrisp !== 'undefined' ) {
    TrimmedAndCrisped = $.trim(ToTrimAndCrisp.replace(/\s{2,}/gm, ' '));
    return TrimmedAndCrisped;
  }
}

/* Func_CreateUndo() - Creates Undo Button
=========================================================== */
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

/* Func_PushUndo() - removes Undo Button
=========================================================== */
function Func_PushUndo() {
  $('#id_news').val(UndoText);
  $('#id_news ~ a.btn-danger').remove();
  $('#id_news').focus();
}

/*! LIBRARY: GALLERY functions
=========================================================== */
function func_BetterGallery() {
  /* pp-cell height */
  $('.ImageGallery.customModal .pp-cell > div').css('max-width', '90%');
  /* searchbox removal by over-writing the heading */
  $('.ImageGallery.customModal .pp-cell > div h2').text('Select Image From Gallery:').addClass('h3');
  /* adding .container */
  $('.ImageGallery.customModal .pp-cell > div .img-container').addClass('container');
  /* adding .row and setting height to 70vH */
  $('.ImageGallery.customModal .img-container .gallery')
  .addClass('row align-items-center')
  .css({
    height: '70vH',
    padding: '',
    display: ''
  });
  /* remove style from the image container divs */
  $('.ImageGallery.customModal .img-container .gallery .img').removeAttr('style').addClass('mb-3'); // removes every time
  /* adding columns to image container divs */
  $('.ImageGallery.customModal .img-container .gallery .img').addClass('col-6 col-md-4 col-xl-3').removeAttr('style');
  /* remove excess row-reset between columns */
  $('.ImageGallery.customModal .img-container .gallery div').not(".img").remove();
  /* resetting HEIGHT and WIDTH from IMG elements */
  $('.ImageGallery.customModal .img-container .gallery .img a img').removeAttr('height width');
  /* adding .img-responsive to IMG elements */
  $('.ImageGallery.customModal .img-container .gallery .img a img').addClass('img-responsive').css({
    'border': '4px solid #fff',
    'box-shadow': '0 2px 8px rgba(0,0,0,0.5)'
  });
  /* exiting setup */
  IsGalleryManaged = true;
  $('.ImageGallery.customModal .img-container .gallery').css('display', '');
  setTimeout(function () {
    func_alert('Gallery ready.');
  },1);
}
