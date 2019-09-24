<div id="chatwindow">
<h2>
  Chat Console
  <span id="chatframeactions">
    <span class="chatmin" onclick="toggleChatFrame();" title="Toggle"><span>[&plusmn;]</span></span> 
    <a class="chatmax" href="<%webadmin.path%>/current/chat" title="Maximize"><span>[&uArr;]</span></a>
  </span>
</h2>
<iframe id="chatwindowframe" src="<%webadmin.path%>/current/chat+frame" width="100%" height="150px" onload="resizeChatWindow()"></iframe>
<script type="text/javascript" src="/images/current_chat_frame.js?gzip"></script>
</div>
