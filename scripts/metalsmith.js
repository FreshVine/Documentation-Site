/*
 * Generate the documentation website using the Metalsmith generator.
 *
 * Metalsmith reads all files in the source directory and passes an object of files through a set of plugins.
 * Each key in the files object is a path and the value is an object with many properties.
 * The contents properties has the contents of the file as a Buffer.
 * The frontmatter (stuff between --- at the top of the file) is added as additional properties.
 * When all the plugins are done running, the files object is written to the destination directory.
 * That's it!
 */
'use strict';

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var cleanCSS = require('metalsmith-clean-css');
var compress = require('metalsmith-gzip');
var paths = require('metalsmith-paths');
var partials = require('metalsmith-register-partials');
var helpers = require('metalsmith-register-helpers');
var redirect = require('metalsmith-redirect');
var copy = require('metalsmith-copy');
// var fork = require('./fork');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var autotoc = require('metalsmith-autotoc');
var lunr = require('metalsmith-lunr');
var lunr_ = require('lunr');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var precompile = require('./precompile');
var apidoc = require('./apidoc');

var handlebars = require('handlebars');
var prettify = require('prettify');
prettify.register(handlebars);

//disable autolinking
function noop() {}
noop.exec = noop;
var marked = require('marked');
marked.InlineLexer.rules.gfm.url = noop;

var environment;

exports.metalsmith = function() {
	function removeEmptyTokens(token) {
		if (token.length > 0) {
			return token;
		}
	};
  var metalsmith = Metalsmith(__dirname)
    .concurrency(100)
    .source("../src")
    .destination("../build")
    .use(less({
      pattern: "**/less/style.less",
      useDynamicSourceMap: true
    }))
    .use(ignore([
      '**/less/*.less',
      'content/languages/**/*',
      'assets/images/**/*.ai',
      'content/reference/api_old.md'
    ]))
    .use(cleanCSS({
      files: '**/*.css'
    }))
    .use(apidoc({
      src: '../api-node/',
      config: '../api-node/',
      destFile: 'content/reference/api.md',
      includeFilters: ['.*[vV]iews[^.]*\\.js$', 'lib/AccessTokenController.js']
    }))
    .use(partials({
      directory: '../templates/partials'
    }))
    .use(fileMetadata([
      {pattern: "content/**/*.md", metadata: { "lunr": true, "assets": '/assets'}}
    ]))
    .use(precompile({
      directory: '../templates/precompile',
      dest: 'assets/js/precompiled.js',
      knownHelpers: {
        'each': true,
        'if': true
      }
    }))
    .use(moveUp(['content/**/*']))
    .use(paths())
    .use(helpers({
      directory: '../templates/helpers'
    }))
    .use(collections({
      guide: {
        pattern: 'guide/:section/*.md',
        sortBy: 'order',
        orderDynamicCollections: [
          'getting-started',
          'applications',
          'modules'
        ]
      },
      developers: {
        pattern: 'developers/:section/*md',
        sortBy: 'order',
        orderDynamicCollections: [
          'overview',
          'authentication'
        ]
      }
    }))
    .use(inPlace({
      engine: 'jade',
      pattern: '**/*.jade'
    }))
    .use(copy({
      pattern: '**/*.jade',
      extension: '.html',
      move: true
    }))
    .use(inPlace({
      engine: 'handlebars',
      pattern: '**/*.md'
    }))
    .use(markdown())
    .use(autotoc({
      selector: 'h2, h3',
      pattern: '**/**/*.md'
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(permalinks({
      relative: false
    }))
    // .use(msIf(
    //   environment !== 'development',
    //   compress({overwrite: true})
    // ))
    .use(redirect({
      '/developers': '/developers/overview/getting-started',
      '/developers/overview/': '/developers/overview/getting-started',
      '/developers/authentication': '/developers/authentication/overview',
      '/guide': '/guide/getting-started/overview',
      '/guide/getting-started': '/guide/getting-started/overview'
    }));

	metalsmith.use(lunr({
		indexPath: 'search-index.json',
		fields: {
			contents: 1,
			tags: 10
		},
		pipelineFunctions: [
			removeEmptyTokens
		]
	}));

  return metalsmith;
};


exports.compress = function(callback) {
  Metalsmith(__dirname)
    .clean(false)
    .concurrency(100)
    .source('../build')
    .destination('../build')
    .use(compress({
      src: ['search-index.json'],
      overwrite: true
    }))
    .build(callback);
};

exports.build = function(callback) {
    exports.metalsmith()
      .use(compress({
        src: ['search-index.json'],
        overwrite: true
      }))
      .build(function(err, files) {
        if (err) {
          throw err;
        }
        if (callback) {
          callback(err, files);
        }
      });
};

exports.server = function(callback) {
	environment = 'development';
	// environment = 'production';
	exports.metalsmith().use(serve({ host: "0.0.0.0", port: 8080, verbose: false }))
	.use(msIf(
		environment === 'development',
		watch({
			paths: {
				"${source}/content/**/*": "**/*",	// Rebuild Everything
				"${source}/assets/less/**/*": "**/*",	// Rebuild Everything
				"${source}/assets/js/**/*" : "**/*",		// Rebuild Everything
				"${source}/assets/images/**/*" : true,	// Just build that image
				"../templates/**/*": "**/*"	// Rebuild Everything
				// "${source}/content/**/*.md": true,
				// "${source}/assets/less/*.less": "assets/less/*.less",
				// "../templates/reference.hbs": "content/developers/**/*.md",
				// "../templates/guide.hbs": "content/guide/**/*.md",
				// "../templates/start.hbs" : "content/index.md",
				// "${source}/assets/js/*.js" : true,
				// "${source}/assets/images/*" : true
			},
			livereload: false
		})
	))
	// .use(msIf(
	// 	environment === 'production',
	// 	watch({
	// 		paths: {
	// 			"${source}/content/**/*": "**/*",	// Rebuild Everything
	// 			"${source}/assets/less/**/*": "**/*",	// Rebuild Everything
	// 			"${source}/assets/js/**/*" : "**/*",		// Rebuild Everything
	// 			"${source}/assets/images/**/*" : true,	// Just build that image
	// 			"../templates/**/*": "**/*"	// Rebuild Everything
	// 		},
	// 		lifereload: true
	// 	})
	// ))
	.build(function(err, files) {
		if (err) {
			console.error(err, err.stack);
		}
		if (callback) {
			callback(err, files);
		}
	});
};