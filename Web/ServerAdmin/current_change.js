try {
  $('#btnupdate').remove();
  $('#throbber').hide();
}
catch (e) {}

function mapListUpdate(data, textStatus) {
    if (data.length == 0) {
        alert("Network error during updating.");
    }
    jdata = $('<div>'+data+'</div>');
    $('#mutators fieldset').fadeOut('fast', function() {
        $(this).remove();
    });
    $('#mutators .noMutatorsMsg').fadeOut('fast', function() {
        $(this).remove();
    });
    $('#map').fadeOut('fast', function() {
        $('#map option').remove();
        x = jdata.children('#map'); 
        if ($.browser.msie) x = x.contents();
        else x = x.contents().clone();
        $('#map').append(x).fadeIn('fast');
        
        x = jdata.children('#mutators');
        $('#mutators').append(x.contents().clone()).fadeIn('fast');
        
        x = jdata.children('#mutatorGroupCount');
        $('input[name="mutatorGroupCount"]').val(x.val());
        
        $('.mutatorGroup input:radio, .mutatorGroup input:checkbox').click(function(){
            changeHistory = new Array();
            updateSelection(this, this.checked);
        });
    });
    $('#throbber').hide();
}

function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    $('#throbber').hide();
    if (XMLHttpRequest.status == 403) {
        document.location = pageUri;
    }
    else {
        if (confirm("Network error during updating. Try again?")) {
            $('#gametype').change();
        }
    }
}

var changeHistory;
$('.mutatorGroup input:radio, .mutatorGroup input:checkbox').click(function(){
    changeHistory = new Array();
    updateSelection(this, this.checked);
});

function updateSelection(elm, isChecked) {
    if (jQuery.inArray(elm, changeHistory) != -1) return;
    changeHistory[changeHistory.length] = elm;
    // check elements with the same value
    if (elm.value != "") {
        jQuery.each($('input[value="'+elm.value+'"]'), function(idx,obj) {
            obj.checked = isChecked;
            updateSelection(obj, isChecked);
        });
    }
    // uncheck elements in this group
    if (isChecked) {
        jQuery.each($('input[name="'+elm.name+'"]'), function(idx,obj) {
            if (obj == elm) return;
            if (obj.value == "") return;
            updateSelection(obj, false);
        });
    }
    // select 'none' if none selected
    if ($('input[name="'+elm.name+'"]:checked').length == 0 && $('input[name="'+elm.name+'"]').length > 1) {
        $('input[name="'+elm.name+'"]:first').attr("checked", "checked");
    }
}

$(document).ready(function(){
    $('#btnupdate').remove();
    $('#gametype').after(' <div id="throbber"><span>Loading...</span></div>');
    $('#throbber').hide();
    
    $('#gametype').change(function() {
        $('#throbber').fadeIn();
        requestData = {ajax: 1, gametype: $('#gametype').val()};
        requestData.mutatorGroupCount = $('input[name="mutatorGroupCount"]').val();
        $('input[name^="mutgroup"]:checked').each(function() {
            requestData[this.name] = this.value;
        });
        $.ajax({
            type: "POST",
            url: pageUri+'+data',
            data: requestData,
            success: mapListUpdate,
            error: ajaxError
        });
    });
});
