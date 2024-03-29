var filter = {urls: ['*://twitch.tv/*', '*://www.twitch.tv/*']};
var specInfo = ['blocking'];
var redirectPatterns = ['?referrer=raid'];
var callbackOnRequest = function(info) {
	var redir = info.url
	if (redirectPatterns.some(redirPattern => info.url.includes(redirPattern)))
	{
		redir = info.url.substring(0, info.url.indexOf("?"));
	}
	return {redirectUrl: redir};
};
chrome.webRequest.onBeforeRequest.addListener(callbackOnRequest, filter, specInfo);
var callbackOnComplete = function(info){
	var redir = info.url
	if (redirectPatterns.some(redirPattern => info.url.includes(redirPattern)))
	{
		redir = info.url.substring(0, info.url.indexOf("?"));
	}
	if(redir != info.url)
	{
		chrome.tabs.update(info.tabId, {url: redir});
	}
	return;
};
chrome.webNavigation.onCompleted.addListener(callbackOnComplete, {url: [{hostSuffix: 'twitch.tv'}]});
chrome.webNavigation.onHistoryStateUpdated.addListener(callbackOnComplete, {url: [{hostSuffix: 'twitch.tv'}]});
