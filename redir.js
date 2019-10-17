var callback = function(info) {
		var redir = info.url
		if (info.url.includes("?refer=raid"))
		{
			redir = info.url.substring(0, info.url.length - 11);
		}
		if (info.url.includes("?referrer=raid"))
		{
			redir = info.url.substring(0, info.url.length - 14);
		}
		return {redirectUrl: redir};
	};
var filter = {urls: ['*://twitch.tv/*', '*://www.twitch.tv/*']};
var specInfo = ['blocking'];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, specInfo);
