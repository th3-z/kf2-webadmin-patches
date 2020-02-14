try {
  $('#refresh').remove();
}
catch (e) {}

if (typeof maxMessages == "undefined") {
  maxMessages = 50;
}

$(document).ready(function() {
    $('#refresh').remove();
    chtpos = $('#chatmessage').offset();
    window.scrollTo(0, chtpos.top);
    if (window.parent == window) {
        $('#chatmessage').focus();
    }
    setTimeout('getMessages()', chatRefresh);
    $('#chat').after('<div id="autoupdatechatdiv"><input id="autoupdatechat" type="checkbox" checked="checked" value="true" /><label for="autoupdatechat">Auto update chat log</label></div>');
    $('#teamsayctrl input').click(function() {        
        $('#chatmessage').focus();
    });
    $('#teamsayctrl label').accessKeys();       
});

$('#chatform').submit(function() {
    var teamsayval = -1;
    var teamsayelm = $('#chatform :radio:checked');
    if (teamsayelm.size() > 0)
    {
        teamsayval = teamsayelm.val();
    }
    $.ajax({
        type: "POST",
        url: pageUri+'+data',
        data: {ajax: 1, message: $('#chatmessage').val(), teamsay: teamsayval},
        success: chatMessage,
        error: ajaxError
    });
    $('#chatmessage').val('');
    return false;
});

function getMessages() {
    if ($(window).height() > 0) {
        if ($('#autoupdatechat:checked').size() > 0) {
            $.ajax({
                type: "POST",
                url: pageUri+'+data',
                data: {ajax: 1},
                success: chatMessage,
                error: ajaxError
            });
        }
    }
    setTimeout('getMessages()', chatRefresh);
}

function chatMessage(data, textStatus) {
    if (data == '') return;
    cnt = $('.chatmessage').size()-1;
    $('#chatlog').append(data);
    x = $('.chatmessage:gt('+cnt+')');
    x.hide();
    x.fadeIn("fast");
    
    cnt = $('.chatmessage').size();
    oldmsgs = cnt-maxMessages;
    $('.chatmessage:lt('+oldmsgs+')').remove();
    
    if (window.parent && typeof window.parent.resizeChatWindow == "function") {
      window.parent.resizeChatWindow();
    }
    
    chtpos = $('#chatmessage').offset();
    window.scrollTo(0, chtpos.top);
}

function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    if (XMLHttpRequest.status == 403) {
        document.location = pageUri;
    }
}
