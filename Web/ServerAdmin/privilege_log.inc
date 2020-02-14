
<div id="privilege_log_container">
<div>
  <button type="button" id="privilege_log_btn" title="Show/hide the privilege log">&Pi;</button>
</div>

<div id="privilege_log">
<h4>Checked privileges for this page</h4>
<ul>
  <%privilege.log%>
</ul>
</div>

<script type="text/javascript">
// <![CDATA[
$(document).ready(function(){
  $('#privilege_log_btn').click(function() {
    $('#privilege_log').toggle();
  });
});
// ]]>
</script>
</div>
