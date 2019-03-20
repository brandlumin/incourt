/*
create outer-container
  create inner div
    create text blocks
    create close button
  ./
./
*/
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
