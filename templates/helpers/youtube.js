
// API Docs for the youtube embeded player - https://developers.google.com/youtube/player_parameters?hl=en
// use with {{{youtube 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}}}
// Link can either be to a video, or the embed link for a video or playlist. Attributes to exclude related videos already included
module.exports = function(link) {
	//
	// Helper functions for parsing URLs into their parts
	function parseUri (str) {
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	};

	parseUri.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};
	// Helper functions for parsing URLs into their parts
	//


	//
	// Build the embed link
	var vars = [], embed, embedAppend = '', hash, parser;
	parser = parseUri( link );	// Parse that URL into its parts
	var hashes = parser.query.slice(parser.query.indexOf('?') + 1).split('&');	// Blow apart the arguments
    for( var i = 0; i < hashes.length; i++ ){
        hash = hashes[i].split('=');
		if( hash[0] == 'v' ){
			embed = '//www.youtube.com/embed/' + hash[1];
		}else{
	        vars.push(hash[0] + '=' + hash[1]);
		}
    }
	if( link.indexOf('/embed') > 0 ){
		embed = '//www.youtube.com' + parser.path;
	}

	vars.push('rel=0');
	// vars['rel'] = 'rel=0';	// Disable the related videos at end of play
	vars.push('modestbranding=1');
	// vars['modestbranding'] = 'modestbranding=1';	// Turn off youtube branding
	// Build the embed link
	//

	if( typeof embed == 'undefined' ){
		return '<div class="iframe-wrapper">YouTube link not correctly formed<br />It must include the <em>?v=XXXXXX</em> attribtue. Link included:<br />' + link + '</div>';
	}

	if( vars.length > 0 ){
		embedAppend = '?' + vars.join('&');
	}


	var r = 
		'<div class="iframe-wrapper"><iframe src="'
		+ embed
		+ embedAppend
		+ '" width="560" height="315" frameborder="0" allowfullscreen></iframe></div>';
	return r;
}