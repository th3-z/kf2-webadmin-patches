<tr>
  <td><%ban.uniqueid%></td>
  <td><%ban.steamid%></td>
  <td><%ban.steamname%></td>
  <td>
    <form style="display: inline" method="post" action="<%webadmin.path%>/policy/bans"><input type="hidden" name="uniqueid" value="<%ban.uniqueid%>" /><input type="hidden" name="action" value="add" /><button type="submit" title="Make this ban permanent">Make permanent</button></form>
    <form style="display: inline" method="post" action=""><input type="hidden" name="banid" value="<%ban.banid%>" /><button type="submit" name="action" value="revoke">Revoke</button></form>
  </td>
</tr>
