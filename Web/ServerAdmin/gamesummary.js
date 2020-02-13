
// Update every 30 seconds
var updateGameSummaryDelay = 30000;

var updateGameSummary = function() {
    $.ajax({
        type: "POST",
        url: webadminPath+'/current+gamesummary',
        data: {ajax: 1},
        success: newGameSummary,
        error: gameSummaryAjaxError
    });
};

function gameSummaryAjaxError() {
    setTimeout(updateGameSummary, updateGameSummaryDelay);
}

function newGameSummary(data, textStatus) {
    setTimeout(updateGameSummary, updateGameSummaryDelay);
    var jdata = $(data);
    var newsummary = jdata.find('response gamesummary').text();
    if (newsummary == '') return;
    $('#gamesummary-details').empty();
    $('#gamesummary-details').append(newsummary);
}

$(document).ready(function() {
    setTimeout(updateGameSummary, updateGameSummaryDelay);
});
