<span id="<%setting.formname%>_presec" class="<%multisetting.predef.class%>"><%multisetting.predef%></span>
<span id="<%setting.formname%>_rawsec" class="<%multisetting.rawval.class%>"><%multisetting.raw%></span>
<script type="text/javascript">
//<![CDATA[
$(document).ready(function() {
  $('#<%setting.formname%>_presec').append(' <button id=\"<%setting.formname%>_btnraw\" type=\"button\" title=\"Enter a custom value instead of the preselected values.\">custom value</button> ');
  $('#<%setting.formname%>_rawsec').append(' <button id=\"<%setting.formname%>_btnpre\" type=\"button\" title=\"Use a predefined value.\">pre defined value</button> ');
  $('#<%setting.formname%>_btnraw').click(function(){
    var elm = $('#<%setting.formname%>');
    var rawelm = $('#<%setting.formname%>_raw');
    console.log(elm);
    console.log(rawelm);
    rawelm.val(elm.val());
    rawelm.attr('id', elm.attr('id'));
    rawelm.attr('name', elm.attr('name'));
    elm.attr('id', elm.attr('id')+'_pre');
    elm.attr('name', elm.attr('name')+'_pre');
    $('#<%setting.formname%>_presec').hide();
    $('#<%setting.formname%>_rawsec').show();
  });
  $('#<%setting.formname%>_btnpre').click(function(){
    var elm = $('#<%setting.formname%>');
    var preelm = $('#<%setting.formname%>_pre');
    console.log(elm);
    console.log(preelm);
    preelm.val(elm.val());
    preelm.attr('id', elm.attr('id'));
    preelm.attr('name', elm.attr('name'));
    elm.attr('id', elm.attr('id')+'_raw');
    elm.attr('name', elm.attr('name')+'_raw');
    $('#<%setting.formname%>_rawsec').hide();
    $('#<%setting.formname%>_presec').show();
  });
});
//]]>
</script>
