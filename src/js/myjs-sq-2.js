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
    recArrayRet: recArray,
    recElRet: recEl,
    recHashRet: recHash
  };
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
