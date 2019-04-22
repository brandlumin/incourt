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
  if ( !(/^https?/i).test($('[name=url]')[1].value) ) {
    x = $('[name=url]')[1].value;
    $('input#regular1').val('http://'+x).change();
  }
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

  /* setting vars to be returned */
  NewsURLNotToDo = NewsTitleToDo = NewsDscToDo = HashText = '';

  /* capturing textarea's value in a variable, also for undo ***/
  UndoText   = HelpMeText = '';
  UndoText   = HelpMeText = $('#id_news').val();
  NeedToUndo = false; // safe side approach to reset every time

  /* disabling previous UNDO ***/
  $('#id_news ~ a.btn-danger').remove();

  /* call regex function to replace abbreviations of the variable */
  Func_RegEx(HelpMeText);
  /* Upon returning, check if Undo needed, and create it accordingly */
  if (NeedToUndo) Func_CreateUndo();

  $('#id_news').focus();

  return {
    NewsURLNotToDoRet : NewsURLNotToDo,
    NewsTitleToDoRet  : NewsTitleToDo,
    NewsDscToDoRet    : NewsDscToDo,
    HashTextRet       : HashText
  };
}

/* Func_RegEx() - receives TEXTAREA as HelpMeText, calls RegexReplace, and returns
=========================================================== */
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
  HashText = (HashText.length > 0) ? '# '+HashText.join(',').replace(/#\s?/g,'').replace(/\s{1,}/gm,' ').replace(/\s?,\s?/gm,', ').trim().replace(/,[\s]*$/gm,'') : ''; // removing '#' and joining as CSV

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

  /* making NEWS values nicer */
  NewsURLNotToDo = Func_TrimAndCrisp(ToBeReplaced[0]);
  NewsTitleToDo  = Func_TrimAndCrisp(ToBeReplaced[1]);
  NewsDscToDo    = Func_TrimAndCrisp(ToBeReplaced[2]);

  /* add protocol 'http://' if does not exist in the URL */
  NewsURLNotToDo = (NewsURLNotToDo.match('^(https?)(?::\/\/)','gi')) ? NewsURLNotToDo : 'http://'+NewsURLNotToDo;

  /* doing abbreviations and capturing results for title and news */
  NewsTitleToDo = Func_RegexReplace(NewsTitleToDo, 'vartitle');
  NewsDscToDo   = Func_RegexReplace(NewsDscToDo, 'vardesc');

  /* populating abbreviations in the textarea */
  HashText = (HashText.trim().length >0) ?
              HashText :
              '# '+NewsTitleToDo.split(' ').join(', ');
  $('#id_news').val(
                    NewsURLNotToDo+'\n'+
                    NewsTitleToDo+'\n'+
                    NewsDscToDo+
                    // ((HashText.replace('/^#\s?/','').trim().length > 0) ? '\n'+HashText+', ' : '\n# ')
                    ((HashText) ? '\n'+HashText : '\n# ')
                    );

  /* FLASHING Status Message */
  nTitleCount = NewsTitleToDo.length; // Title
  sTitleMessg = (nTitleCount <= 75) ? '<b>OK</b> by '+(75 - nTitleCount)+' <span class="d-none d-md-inline">char(s)</span>' : '<b>exceeds</b> by <b>'+(nTitleCount - 75)+'</b> <span class="d-none d-md-inline">char(s)</span>'; // Message Creation

  nDescrCount = NewsDscToDo.split(' ').length; // Description
  sDescrMessg = (nDescrCount <= 60) ? '<b>OK</b> by '+(60 - nDescrCount)+' <span class="d-none d-md-inline">word(s)</span>' : '<b>exceeds</b> by <b>'+(nDescrCount - 60)+'</b> <span class="d-none d-md-inline">word(s)</span>'; // Message Creation
  bgc = (nTitleCount > 75 || nDescrCount > 60) ? erMsgColor : okMsgColor;
  flashMessage = '<b>Title</b> '+sTitleMessg+'<br><b>Desc</b> '+sDescrMessg;
  hmmmPrepend = ((/exceeds/).test(sDescrMessg) || (/exceeds/).test(sTitleMessg))?'<h5 class="mb-2">Hmm...</h5>':'<h5 class="mb-2">Good!</h5>';

  if (window.innerWidth >= 768) {     // Message Flash
    $('#id_news__count').html('<b>Title</b> '+sTitleMessg+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Desc</b> '+sDescrMessg).css({
      'background-color': bgc,
      'box-shadow': '1px 2px 4px rgba(0,0,0,0.15)'
    });
  } else {
    func_alert(hmmmPrepend+flashMessage, ((/exceeds/).test(sDescrMessg) || (/exceeds/).test(sTitleMessg))?2100:600, bgc);
  }

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
    Replaced    = DataToRegEx.replace(SearchTerm, ReplaceWith).trim();
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
    .html('[Alt+U]<span class="d-none d-md-inline"> Undo</span>')
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
