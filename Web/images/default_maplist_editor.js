
// prevents flicker
$('#noscript').hide();

$(document).ready(function() {
    $('#noscript').hide();
    $('#noscriptHint').hide();    
    $('#noscript').after('<tbody id="jsmaplist"><tr><td><ul id="jsallmaps"></ul></td><td><ol id="jsmapcycle"></ol></td><td id="jsmlctrls"></td></tr></tbody>');
    $('#noscriptHint').after('<p id="jsmaplistHint"><em>Note:</em> drag items from the left list to the right list to add a map to the cycle. '+
      'To move a map to a different position in the cycle, simply drag it to the desired location. Press the "x" button next to the map cycle entry to remove it. '+
      'You can manually add a map to the cycle using the "manual add".</p>');
    
    _allmaps = $('#allmaps').val().split("\n");
    _jsallmaps = $('#jsallmaps');
    for (i = 0; i < _allmaps.length; i++)
    {
        str = jQuery.trim(_allmaps[i]);
        if (str.length > 0)
        {
            _jsallmaps.append('<li class="mapEntry"><span class="entry">'+str+'</span></li>');
        }
    }
    
    _mapcycle = $('#mapcycle').val().split("\n");    
    _jsmapcycle = $('#jsmapcycle');   
    for (i = 0; i < _mapcycle.length; i++)
    {
        str = jQuery.trim(_mapcycle[i]);
        if (str.length > 0)
        {
            var item = createMapListEntry(str);
            _jsmapcycle.append(item);
            getDeleteMe($(item));
            setupRndLimitEditor($(item));
        }
    }
    _jsmapcycle.sortable({ 
        axis: "y", 
        containment: "parent",
        cancel: ".deleteButton",
        start: function(ev, ui) {
            $(ui.helper).addClass('dragging');
        },
        stop: function(ev, ui) {
            $(ui.helper).removeClass('dragging');
        }
    });
    
    $('#jsallmaps li').draggable({
        helper: 'clone',
        zIndex: 100,
        start: function(ev, ui) {
            $(ui.helper).addClass('dragging');
        },
        stop: function(ev, ui) {
            $(ui.helper).removeClass('dragging');
        }
    });
    $('#jsmapcycle').parent().droppable({
        accept: "li.mapEntry",
        hoverClass: "dropHover",
        activeClass: "droppable",
        drop: function(ev, ui) {
            var item = $('.entry', ui.draggable).text();
            item = createMapListEntry(item);    
            getDeleteMe(item);
            setupRndLimitEditor($(item));
            _jsmapcycle.append(item);            
            _jsmapcycle.sortable("refresh");
            _jsmapcycle.sortable("refreshPositions");
        }
    });
    
    $('#jsmaplist').show();
    $('#jsmaplistHint').show();
    
    var simpleEditBtn = jQuery('<button type="button" id="simpleEditBtn" title="switch to basic map cycle editing mode">basic edit mode</button>');
    simpleEditBtn = $(simpleEditBtn);
    simpleEditBtn.click(function(){
       $(this).remove();
       $('#manualAddBtn').remove();
       updateTextMapList();
       $('#jsmaplist').remove();
       $('#jsmaplistHint').remove();
       $('#noscript').show();
       $('#noscriptHint').show();
    });
    var manualAddBtn = jQuery('<button type="button" id="manualAddBtn" title="add a map by entering the name">manual add</button>');
    manualAddBtn = $(manualAddBtn);
    
    var manualAddCallback = function(res) {
      res = jQuery.trim(res);
      if (res != "") {
        var item = createMapListEntry(res);
        getDeleteMe($(item));
        setupRndLimitEditor($(item));
        _jsmapcycle.append(item);
        _jsmapcycle.sortable("refresh");
        _jsmapcycle.sortable("refreshPositions");
      }
    };
    
    manualAddBtn.click(function(){
        messagePrompt("Enter the map name (without extension) to be added to the map cycle. \nHint: you can include URL options like ?RoundLimit=...", manualAddCallback, "");
        return false;
    });
    
    var addMissingMapsBtn = jQuery('<button type="button" id="addMissingMaps" title="add all maps that are not in the list">add missing</button>');
    addMissingMapsBtn = $(addMissingMapsBtn);
    addMissingMapsBtn.click(addMissingMaps);
    
    var doClearList = function (val) {
      if (val) {
            $('#jsmapcycle li').remove();
            _jsmapcycle.sortable("refresh");
            _jsmapcycle.sortable("refreshPositions");
        }  
    }
    
    var clearMapListBtn = jQuery('<button type="button" id="clearMapList" title="clear the current map list">clear</button>');
    clearMapListBtn = $(clearMapListBtn);
    clearMapListBtn.click(function () {
        messageConfirm('Are you sure you want to clear this map list?', doClearList);    
    });
    
    $('#mleditor table thead tr').append("<td></td>");
    $('#jsmlctrls').append(manualAddBtn).append("<br />").append(addMissingMapsBtn).append("<br />").append(clearMapListBtn);
    
    $('#mlactions').append(simpleEditBtn).append(" ");
    $('#maplistform').submit(function () {
        updateTextMapList();
        return true;
    });
});

function getDeleteMe(forItem) {
    var res = jQuery('<span class="deleteButton" title="delete this map">&nbsp;</span>');
    res = $(res);
    res.click(deleteme);
    forItem.prepend(res);
    forItem.hover(function() {
        $(this).addClass('sorting');
    }, function() {
        $(this).removeClass('sorting');
    });
}

function deleteme() {
    $(this).parent().remove();
}

function updateTextMapList() {
    // check manual mode  
    if ($('#jsmapcycle').size() == 0)
    {
        return;      
    }
    var maplist = $('#jsmapcycle li');
    var txtlist = "";
    for (i = 0; i < maplist.size(); i++) {
        var elm = maplist.get(i);
        txtlist += jQuery.trim($('.entry', elm).text());
        var rndLmt = parseInt($('.roundLimit input', elm).val());
        if (rndLmt && rndLmt > 0) {
          txtlist += '?RoundLimit='+rndLmt;
        }
        txtlist += '\n';
    }
    $('#mapcycle').val(txtlist);
}

function addMissingMaps() {
    var maplist = $('#jsmapcycle li');
    var maps = new Array();
    for (var i = 0; i < maplist.size(); i++) {
        maps[i] = jQuery.trim($('.entry', maplist.get(i)).text());
    }
    maplist = $('#jsallmaps li');
    for (var i = 0; i < maplist.size(); i++) {
        var item = jQuery.trim($('.entry', maplist.get(i)).text());
        if (jQuery.inArray(item, maps) == -1) {
            var item = createMapListEntry(item);
            getDeleteMe($(item));
            setupRndLimitEditor($(item));
            _jsmapcycle.append(item);
        }
    }
    _jsmapcycle.sortable("refresh");
    _jsmapcycle.sortable("refreshPositions");
}


var rndLmtRegEx = new RegExp("\\?RoundLimit=([0-9]+)", "i");

function createMapListEntry(str) {
    var roundLimit = 0;
    var match = rndLmtRegEx.exec(str);
    if (match) {
        roundLimit = parseInt(match[1]);
        str = str.replace(rndLmtRegEx, "");
    }
    //var item = jQuery('<li><span class="entry">'+str+'</span><span class="roundLimit"><input title="Round limit for this map" type="text" size="2" value="'+roundLimit+'" /></span></li>');
    var item = jQuery('<li><span class="entry">'+str+'</span></li>');
    return item;
}

function setupRndLimitEditor(item) {
    // set up round limit editor
    var item = $(item); 
    var edtr = $('.roundLimit', item);
    if (!edtr) {
        return;
    }
    var input = $('input', edtr);
    input.numeric("\n");
    input.SpinButton({min: 0, step: 1, page: 5, asint: true});
    item.hover(function () {  },
        function () {  }
    );
}
