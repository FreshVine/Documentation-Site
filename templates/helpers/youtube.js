

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
			embed = hash[1];
		}else{
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[0] + '=' + hash[1];
		}
    }

	if( typeof embed == 'undefined' ){
		return '<div class="iframe-wrapper">YouTube link not correctly formed<br />It must include the <em>?v=XXXXXX</em> attribtue. Link included:<br />' + link + '</div>';
	}

	if( vars.length > 0 ){
		embedAppend = '?' . vars.join('&');
	}


	var r = 
		'<div class="iframe-wrapper"><iframe src="//www.youtube.com/embed/'
		+ embed
		+ embedAppend
		+ '" width="560" height="315" frameborder="0" allowfullscreen></iframe></div>';
	return r;
}