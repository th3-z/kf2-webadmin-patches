<form method="post" action="<%page.fulluri%>" id="maplistform">
<fieldset>
<legend>Edit map cycle <em><%editmaplist.friendlyname%></em></legend>
<input type="hidden" name="maplistid" value="<%editmaplist.id%>" />

<dl>
    <dt>Name</dt>
    <dd><input type="text" name="name" value="<%editmaplist.friendlyname%>" /></dd>
    <dt>Game type</dt>
    <dd><%editmaplist.gametype%></dd>
</dl>

<%maplist_editor%>

<div id="mlactions">
<button type="submit" name="action" value="save">save</button>
<button type="submit" name="action" value="activate" title="Make this map cycle the active map cycle for the gametype">activate</button>
<button type="submit" name="action" value="delete">delete</button>
</div>
</fieldset>
</form>

<script type="text/javascript">
//<![CDATA[

var deleteMapListOk = false;

$(document).ready(function() {
  var delCallback = function(retval) {
    deleteMapListOk = retval;
    if (retval) {
      $('#maplistform button[value="delete"]').click();
    }
  };
  $('#maplistform button[value="delete"]').click(function() {
    if (!deleteMapListOk) {
      messageConfirm("Are you sure you want to delete this map cycle?", delCallback);
      return false;
    }
    return true;
  });
});

// ]]>
</script>
