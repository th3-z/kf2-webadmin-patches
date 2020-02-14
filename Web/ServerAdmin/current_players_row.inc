<tr class="<%evenodd%>">
  <td style="background: <%player.teamcolor%>; color: <%player.teamcolor%>;"><%player.teamid%>&#160;</td>
  <td class="center"><%player.name%></td>
  <td class="center"><%player.perk.name%></td>
  <td class="center"><%player.perk.level%></td>
  <td class="center"><%player.ping%></td>
  <td class="center"><%player.ip%></td>
  <td class="center"><%player.uniqueid%></td>
  <td class="center"><a href="https://steamcommunity.com/profiles/<%player.steamid%>"><%player.steamid%></a></td>
  <td class="center"><%player.steamname%></td>
  <td class="center"><%player.admin%></td>
  <td class="center"><%player.spectator%></td>
  
  <td>
    <form method="post" action="<%page.fulluri%>">
      <div>
        <input type="hidden" name="playerid" value="<%player.playerid%>" />
        <input type="hidden" name="playerkey" value="<%player.playerkey%>" />
        <select name="action">
          <option value=""></option>
          <%actions%>
        </select>
        <button type="submit">go</button>
      </div>
    </form>
  </td>
</tr>
