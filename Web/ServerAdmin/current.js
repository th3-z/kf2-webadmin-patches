try {
  $('#notectrl').hide();
}
catch (e) {};

$(document).ready(function(){
    $('#notectrl').hide();
     // bug in sortedtable causes a javascript error when the table is empty.
    if ($("#players td").size() > 1) {
        $("#players th a").each(function(){
            jthis = $(this);
            jthis.before(jthis.html());
            jthis.remove();
        });
        $("#players th").wrapInner("<span></span>");
        $("#players").tablesorter({sortList:[[3,1]], widgets: ['zebra']});
    }
    
    $('#notes').change(function() {
        $.ajax({
            type: "POST",
            url: pageUri+'+data',
            data: {ajax: 1, action: 'save', notes: $('#notes').val()},
            success: handleMessages,
            error: ajaxError
        });
    });
    
    var fields = $('#content fieldset');
    
    if (fields.size() > 1) {
        var tabs = $('<ul id="infotabs"></ul>');
        $('#content').prepend(tabs);
        fields.each(function() {
            var title = $('legend', this);
            tabs.append('<li><a href="#'+this.id+'"><span>'+title.text()+'</span></a></li>');
            title.remove();
        });
        tabs.tabs();
    }
});

function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    if (XMLHttpRequest.status == 403) {
        document.location = pageUri;
    }
}

function handleMessages(data, textStatus) {
    if (data.length == 0) {
        alert("Network error during updating.");
    }
    var jdata = $(data);
    var old = $('#messages .oldMessage');
    var newmsg = $(jdata.find('request messages').text());
    newmsg.hide();
    $('#messages').prepend(newmsg);
    newmsg.fadeIn();
    old.remove();
    $('#messages *').addClass('oldMessage');
}
