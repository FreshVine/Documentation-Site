# Fresh Vine Documentation
=======

Here you'll find the documentation for the Fresh Vine platforms, including the Leadership Site, Portal, Concierge, Event Kiosk, and API.

To view this documentation, visit [our website](http://docs.freshvine.co), where the documentation is hosted.

### Installation

To host this documentation locally, you'll need Node.js and npm:

    brew install nodejs

Once you have Node.js set up, navigate to this repository's directory on your machine, and then:

    npm install

to install any other necessary dependencies.

### Hosting locally

This documentation uses a fabulous tool from the folks at Segment called [Metalsmith](http://www.metalsmith.io). Metalsmith is a static site generator that builds static HTML sites from source material in other formats; in this case, Markdown and Handlebars.

To run a locally hosted version of the documentation, follow the installation instructions above, and then within the 'docs' directory type in your terminal:

`npm start`

This will set up a server running at `http://localhost:8080`. If you make changes to the source content, your browser should automatically refresh using `livereload`.

### Testing

To run the tests locally, run `npm test` from the root of the
repository. This will tell you whether the build will pass on Travis or
not.

### Deployment
  
Check out the [Setup documentation](SETUP.md) for instructions/tips on getting this running in a production environment.  
  
### Organization

The majority of the content herein is stored in the `src/content/en` directory as a set of Markdown files. Assets such as images and javascript are stored in the `src/assets` directory.

Within the `en` subdirectory, there are three subfolders: `core`,
`photon`, and `shared`. Files in `core` will only be shown in the menu when the user
is viewing Core-specific docs, and `photon` files will be visible when
viewing Photon-specific docs. Files in `shared` will be nested under both
devices, so put pages here that apply to both the Core and the Photon.

If you create a new file under the `shared`, please add `shared: true`
to the front-matter at the beginning of the MD file so that the link to
edit the file on GitHub will be correct. For instance:

```
---
word: API
title: Cloud code (API)
order: 4
shared: true
---
```

### Structuring your content

The docs dynamically generate a table of contents for navigation purposes based on the headers (i.e. `###`) that you use on each page. It is important to note that _order and heirarchy matters_ when you are designing the organization of content on your page. Your page should include the following:

* 1 `h1` at the top of the page that will serve as the title of the page. You can even copy the `title` directly from the front-matter of the markdown file like this: `# {{title}}`

* As many `h2`s (`##`) as you'd like to serve as the section headers for the page.

* Underneath every `h2`, if applicable, as many `h3`s (`###`) as you'd like to serve as sub-sections within the section. These will appear as nested within the navigation on the left.

Note that there are only 2 levels of navigation that will appear in the table of contents. *`h4`s and below will not appear in the table of contents*.

### Tests

To run the test scripts, run `npm test`.

### Attributions

Some of this documentation is derived from the [Arduino documentation](http://arduino.cc/en/Reference), as the Arduino/Wiring language and libraries are used extensively on the Spark Core.

This documentation was originally built using [Flatdoc](http://ricostacruz.com/flatdoc/), an awesome tool for building beautiful documentation from simple Markdown files. We have made many modifications since, but the inspiration remains.

### Contributions

This documentation is managed by Fresh Vine, but supported by the community. We welcome contributions such as:

* Edits to improve grammar or fix typos
* Edits to improve clarity
* Additional annotated examples for others to follow
* Additional content that would help provide a complete understanding of the Particle platform
* Translations to other languages

Making a contribution is as simple as forking this repository, making edits to your fork, and contributing those edits as a pull request. For more information on how to make a pull request, see [Github's documentation](https://help.github.com/articles/using-pull-requests/).

### License

These files have been made available online through a [Creative Commons Attribution-ShareAlike 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/us/).

You are welcome to distribute, remix, and use these files for commercial purposes. If you do so, please attribute the original design to Spark Labs, Inc. (the Fresh Vine docs are a derivitive work of theirs) both on the website and on the physical packaging of the product or in the instruction manual. All derivative works must be published under the same or a similar license.
