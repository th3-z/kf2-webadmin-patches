
var toggleChatFrame = function() {
  $('#chatwindowframe').toggle(); 
  var visible = $('#chatwindowframe').is(':visible');
  $.cookie('chatwindowframe', visible, {expires:7,path:webadminPath});
  if (visible) {
    resizeChatWindow();
  }
  else {
    $('#chatwindowPadding').height(40);
  }
  return false;
}

var resizeChatWindow = function() {
  var wnd = $('#chatwindowframe:visible');
  if (wnd.length == 0) {
    return;
  }
  var height = $('#content', wnd[0].contentWindow.document.body).outerHeight();
  height = Math.min(height, 200);
  wnd.height(height);
  $('#chatwindowPadding').height(height+40);
}

var chattoggled = false;

var initToggleChat = function() {
  try {
    $('#chatwindowframe').toggle($.cookie('chatwindowframe')!='false');
    chattoggled = true;
  }
  catch(e){}
}
initToggleChat();

$(document).ready(function(){
  if (!chattoggled) {
    initToggleChat();
  }
  $('body').append('<div id="chatwindowPadding"></div>');
  if (!$('#chatwindowframe').is(':visible')) {
    $('#chatwindowPadding').height(40);
  }
});
