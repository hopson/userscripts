// ==UserScript==
// @name YouTuber
// @namespace https://github.com/hopson/userscripts/youtuber.user.js
// @description Replace clicked youtube links with youtube:// URLs to hand off to external program
// @include *
// ==/UserScript==
//

var links = document.body.getElementsByTagName('a');

var youtube_domain = new RegExp('(www.)?youtube.com');
var youtube_url = new RegExp('^http://(www.)?youtube.com/watch');
var local_url = new RegExp("^/watch\\?v=");
for(var i=0; i<links.length; i+=1){
	var link = links[i];
	if(!link.hasAttribute('href')) { continue; }
	var url = link.getAttribute('href');
	var res = youtube_url.exec(url);
	if(res != null){
		link.setAttribute('href', url.replace(/^http:/, 'youtube:'));
	} else if(youtube_domain.test(document.domain)){
		res = local_url.exec(url);
		if(res != null){
			var orig_link = link.cloneNode(false);
			orig_link.textContent = "λ";
			link.parentNode.insertBefore(orig_link, link);
			link.setAttribute('href', 'youtube://youtube.com' + url);
		}
	}
}

