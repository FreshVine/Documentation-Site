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
var define = require('metalsmith-define');
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
// var lunr = require('metalsmith-lunr');
// var lunr_ = require('lunr');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var precompile = require('./precompile');
var apidoc = require('./apidoc');
var git = require('git-rev');

var handlebars = require('handlebars');
var prettify = require('prettify');
prettify.register(handlebars);

//disable autolinking
function noop() {}
noop.exec = noop;
var marked = require('marked');
marked.InlineLexer.rules.gfm.url = noop;

var environment;

var gitBranch;

exports.metalsmith = function() {
  var _removeEmptyTokens = function removeEmptyTokens(token) {
    if (token.length > 0) {return token;}
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
      {pattern: "content/**/*.md", metadata: {"lunr": true, "assets": '/assets', "branch": gitBranch}}
    ]))
    .use(msIf(
      environment === 'development',
      fileMetadata([
        {pattern: "content/**/*.md", metadata: {"development": true}}
      ])
    ))
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
	// .use(lunr({
	// 	ref: 'title',
	// 	indexPath: 'search-index.json',
	// 	fields: {
	// 		contents: 1,
	// 		title: 10
	// 	},
	// 	preprocess: function(content) {
	// 		// Replace all occurrences of __title__ with the current file's title metadata.
	// 		return content.replace(/__title__/g, this.title);
	// 	}
	// }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(permalinks({
      relative: false
    }))
    .use(redirect({
      '/developers': '/developers/overview',
      '/developers/authentication': '/developers/authentication/overview',
      '/guide': '/guide/getting-started/overview',
      '/guide/getting-started': '/guide/getting-started/overview'
    }))
    .use(msIf(
      environment !== 'development',
      compress({overwrite: true})
    ));

  return metalsmith;
};


exports.build = function(callback) {
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().build(function(err, files) {
      if (err) { throw err; }
      if (callback) {
        callback(err, files);
      }
    });
  });
};

exports.server = function(callback) {
  environment = 'development';
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().use(serve())
      .use(watch({
        paths: {
          "${source}/content/**/*.md": true,
          "${source}/assets/less/*.less": "assets/less/*.less",
          "../templates/reference.hbs": "content/reference/*.md",
          "../templates/guide.hbs": "content/guide/**/*.md",
          "${source}/assets/js/*.js" : true
        },
        livereload: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};
