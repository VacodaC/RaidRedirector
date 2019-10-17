var filter = {urls: ['*://twitch.tv/*', '*://www.twitch.tv/*']};
var specInfo = ['blocking'];
var callbackOnRequest = function(info) {
	if (info.url.includes("?referrer=raid"))
	{
		return{redirectUrl: "https://www.twitch.tv/" + info.url.match("twitch.tv/(.+)$")[1].split("?")[0]}
	}
};
chrome.webRequest.onBeforeRequest.addListener(callbackOnRequest, filter, specInfo);
var callbackOnComplete = function(info){
	if (info.url.includes("?referrer=raid"))
	{
		chrome.tabs.update(info.tabID, {url: "https://www.twitch.tv/" + info.url.match("twitch.tv/(.+)$")[1].split("?")[0]});
	}
	return;
};
chrome.webNavigation.onCompleted.addListener(callbackOnComplete, {url: [{hostSuffix: 'twitch.tv'}]});
chrome.webNavigation.onHistoryStateUpdated.addListener(callbackOnComplete, {url: [{hostSuffix: 'twitch.tv'}]});
