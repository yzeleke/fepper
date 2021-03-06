## Fepper

# A frontend prototyper for the rapid prototyping of websites

### Downstream projects
* [Fepper Base](https://github.com/electric-eloquence/fepper-base) - no unnecessary assets, styles, or Pattern Lab demo.
* [Fepper for Drupal](https://github.com/electric-eloquence/fepper-drupal) - templates configured for Drupal 8, along with a Drupal theme built to accommodate those templates.
* [Fepper for Wordpress](https://github.com/electric-eloquence/fepper-wordpress) - templates configured for WordPress, along with a WordPress theme built to accommodate those templates.

### Table of contents
* [Install](#install)
* [Update](#update)
* [Configure](#configure)
* [Use](#use)
* [Global Data](#global-data)
* [Partial Data](#partial-data)
* [Static Site Generation](#static-site-generation)
* [The Backend](#the-backend)
* [Webserved Directories](#webserved-directories)
* [GitHub Pages](#github-pages)
* [Templater](#templater)
* [Mustache Browser](#mustache-browser)
* [HTML Scraper](#html-scraper)
* [variables.styl](#variables.styl)
* [Extensions](#extensions)
* [Mobile Devices](#mobile-devices)
* [More Documentation](#more-documentation)
* [Contribute](#contribute)

### <a id="install"></a>Install
* On Mac OS X:
  * Install [Homebrew](http://brew.sh).
* On other Unix-like OSs:
  * Permissions might need to be reworked in order to globally install NPMs.
  * It is a bad practice to run npm as root.
  * If necessary, recursively chown the global node_modules directory with the standard user's ownership.
* On non-Unix-like OSs:
  * Sorry, but Fepper is not supported on non-Unix-like OSs.
* Install Node.js and NPM (Node Package Manager).
  * Requires Node.js v4.0.0 at the very least.
  * On a Mac: `brew install node`
  * If already installed, be sure the version is up to date: `node -v`
  * Update if necessary: `brew update && brew upgrade node`
  * If not on a Mac, and not using Homebrew: https://nodejs.org/en/download/package-manager/
  * After installing Node, `npm install -g fepper-cli`
* On Mac OS X:
  * Double-click `fepper.command`
* On other OSs (or if you prefer the command line, or want a Base install):
  * `npm install` for a Main install - OR -
  * `npm run install-base` for a Base install
* After successful installation:
  * Double-click `fepper.command` again
  * Or enter `fp` on the command line.
* Open http://localhost:3000 in a browser if it doesn't open automatically.
* Consult the [Pattern Lab docs](http://patternlab.io/docs/index.html) for instructions on using Pattern Lab.
* Start editing files in `ui/source`. Changes should automatically appear in the browser.
  * If changes do not appear immediately, it may be necessary to install a [LiveReload browser extension](http://livereload.com/extensions/).  
* To halt Fepper, go to the command line where Fepper is running and press Ctrl+c.

### <a id="update"></a>Update
The easiest way to update Fepper is with Git. This generally means forking an 
Electric Eloquence Fepper repository at your project's onset, and pulling from 
the master branch of the main upstream repository when updates are released.

All updates must pull from https://github.com/electric-eloquence/fepper even if 
your original installation was forked from a downstream repository. Pulling from 
a downstream repository may overwrite custom code specific to your project so 
don't do it!

If not updating with Git, you'll need to copy the latest package over the old. 
Be sure to take care that "dot"-prefixed hidden files at the root level are 
_not_ overwritten. These are important configuration files specific to each 
user's instance.

### <a id="configure"></a>Configure
Edit `pref.yml` to customize preferences and to view further documentation in 
the comments. If you wish to use the `syncback`, `frontend-copy`, or `template` 
tasks, you must supply values for the `backend.synced_dirs` preferences in order 
for those directories to get processed and copied to the backend.

### <a id="use"></a>Use
* To launch from the Mac OS X Finder:
  * Double-click `fepper.command`
* To launch from the command line:
  * `fp`
* These other utility tasks are runnable on the command line:
  * `fp data` to force compile data.json.
  * `fp frontend-copy` to copy assets, scripts, and styles to the backend.
  * `fp lint` to lint HTML, JavaScripts, and JSON.
  * `fp minify` to minify JavaScripts.
  * `fp once` to clean the public folder and do a one-off Fepper build.
  * `fp publish` to publish the public folder to GitHub Pages.
  * `fp restart` to restart after shutdown, but without opening the browser.
  * `fp static` to generate a static site from the 04-pages directory.
  * `fp syncback` combines lint, minify, frontend-copy, and template.
  * `fp template` translates templates for the backend and copies them there.
* If using Git for version control, directories named "ignore" will be ignored.

### <a id="global-data"></a>Global Data
Edit `ui/source/_data/_data.json` to globally populate Mustache templates with 
data. Manual edits to `ui/source/_data/data.json` will get overwritten on 
compilation.

### <a id="partial-data"></a>Partial Data
Underscore-prefixed .json files within 
`ui/source/_patterns` will be concatenated to the output of `_data.json`, the 
whole in turn getting compiled into `data.json`, the final source of globally 
scoped data. 

_Partial data_ is distinct from _pattern data_. For example, `00-homepage.json` 
is _pattern data_ and specific to the `00-homepage` pattern. No other pattern 
will pick up `00-homepage.json`, even if `00-homepage.mustache` is included in 
another pattern. However, `_00-homepage.json` is _partial data_ and will get 
concatenated to the _global data_ outputted to `data.json`. `_00-homepage.json` 
will be picked up by all patterns.

* __DO NOT EDIT ui/source/_data/data.json__
* __DO PUT GLOBAL DATA IN ui/source/_data/_data.json__
* __DO LIBERALLY USE PARTIAL DATA IN ui/source/_patterns FOR ORGANIZATIONAL SANITY__

### <a id="static-site-generation"></a>Static Site Generation
Running `fp static` will generate a complete static site based on the files in 
`ui/source/_patterns/04-pages`. The site will be viewable at http://localhost:3000/static/. 
An `index.html` will be generated based on `04-pages-00-homepage` or whatever is 
defined as the homepage in `_data.json`. If the links are relative and they work 
correctly in the Fepper UI, they will work correctly in the static site even if 
the `static` directory is moved and renamed. The only caveat is that links to 
other pages in the `patterns` directory must start with `../04-pages-` and not 
`../../patterns/04-pages-`.

### <a id="the-backend"></a>The Backend
Fepper can almost as easily work with a CMS backend such as Drupal or WordPress, 
while not requiring Apache, MySQL, or PHP. Put the actual backend codebase or 
even just a symbolic link to the codebase into the `backend` directory. Then, 
enter the relative paths to the appropriate backend directories into `pref.yml`. 
(Do not include "backend" or a leading slash.) You will then be able to run 
`fp syncback` or `fp frontend-copy` to export your frontend data into your 
backend web application.

* Be sure that `backend.synced_dirs.assets_dir`, `backend.synced_dirs.scripts_dir`, and `backend.synced_dirs.styles_dir` are set in `pref.yml`. 
* The above values set in `pref.yml` can be overridden on a per-file basis by similarly named YAML files with similarly named settings. 
* These YAML files must match the source file's name with exception of the extension. 
* The extension must be `.yml`
* The overriding property must only contain the lowest level key-value, not the entire hierarchy, i.e. only `assets_dir`, `scripts_dir`, or `styles_dir` 
* Files prefixed by "__" will be ignored as will files in the `_nosync` directory at the root of the source directories. 

### <a id="templater"></a>Templater
Fepper's Mustache templates can be translated into templates compatible with 
your backend. Mustache tags just need to be replaced with tags the backend can 
use. Put these translations into YAML files named similarly to the Mustache 
files in `ui/source/_patterns/03-templates`. Follow the example in 
`test/files/_patterns/03-templates/00-homepage.yml` for the correct YAML syntax. 

Follow these rules for setting up keys and values:

* Delete the outer two curly Mustache braces for keys.
* Trim any exterior whitespace.
* Leave other control structures within the key, i.e., !#/>^{}
* Escape parentheses and question marks with two backslashes.
* Wrap the key in double quotes.
* Follow the closing quote with a colon, space, pipe, and the numeral 2.
* Indent each line of the value by at least two spaces.

Run `fp syncback` or `fp template` to execute the Templater. 

* Be sure that `backend.synced_dirs.templates_dir` and `backend.synced_dirs.templates_ext` are set in `pref.yml`. 
* The default `templates_dir` and `templates_ext` settings in `pref.yml` can be overridden by similarly named settings in the template-specific YAML files. 
* Templates prefixed by "__" will be ignored by the Templater as will files in the `_nosync` directory. 
* The Templater will recurse through nested Mustache templates if the tags are written in the verbose syntax and have the `.mustache` extension, i.e. `{{> 02-organisms/00-global/00-header.mustache }}`. 
* However, the more common inclusion use-case is to leave off the extension, and not recurse. 

[Fepper for Drupal](https://github.com/electric-eloquence/fepper-drupal) and 
[Fepper for WordPress](https://github.com/electric-eloquence/fepper-wordpress) 
have working examples of templates compatible with the Templater.

### <a id="webserved-directories"></a>Webserved Directories
When using a backend, assets generally need to be shared with the Fepper 
frontend. The `syncback` and `frontend-copy` tasks copy files from Fepper to the 
backend, but not the other way. Instead of providing a task to copy in the 
reverse direction, Fepper serves backend files if their directories are entered 
into the `webserved_dirs` block in `pref.yml`. Be sure these values are 
formatted as YAML array elements.

```
DO NOT INCLUDE DIRECTORIES WITH SOURCE CODE! GITHUB PAGES AND MANY OTHER PUBLIC 
HOSTS DO NOT PREPROCESS PHP AND OTHER PROGRAMMING LANGUAGES, SO ANY PUBLISHED 
SOURCE CODE WILL BE RENDERED AS PLAIN TEXT! THIS WILL MAKE PUBLIC ANY SENSITIVE 
INFORMATION CONTAINED WITHIN THE SOURCE CODE!
```

### <a id="github-pages"></a>GitHub Pages
If you have checked your Fepper instance into a repository in your GitHub 
account, you may run `fp publish` to publish `ui/public/static` to GitHub Pages. 
The static site will then be viewable from the Web at `http://{user}.github.io/{repo}`. 
(This requires that you previously ran `fp static` in order to view anything 
meaningful.) Normally, this is all that is needed. However, if you are using 
`webserved_dirs`, you will need to supply a `gh_pages_prefix` preference in 
`pref.yml`. This preference needs to be set to the name of your GitHub 
repository.

In addition, if you want to publish the entire Fepper UI, you can similarly run
`fp publish:ui`. However, this will overwrite the static site on GitHub Pages if 
you previously ran `fp publish`.

### <a id="mustache-browser"></a>Mustache Browser
Mustache code can be viewed in the Fepper UI by clicking the eyeball icon in the 
upper right, then clicking Code, and then clicking the Mustache tab in the 
bottom pane. The Mustache tags are hot-linked, and if they are written in the 
verbose syntax, clicking on them will open that Mustache file and display its 
code in the Fepper UI, with its Mustache tags hot-linked as well. The Mustache 
tags must be coded in the verbose-pathed manner: `{{> 02-organisms/00-global/00-header }}`

The path must be correct; however, the `.mustache` extension is optional. The 
default homepage is a working example.

### <a id="html-scraper"></a>HTML Scraper
Fepper can scrape and import Mustache templates and JSON data files from actual 
web pages. A common use-case is to scrape pages from a backend populated with 
CMS content in order to auto-generate data, and to replicate the HTML structure. 
To open the Scraper, click Scrape in the Fepper UI, and then click HTML 
Scraper. Enter the URL of the page you wish to scrape. Then, enter the CSS 
selector you wish to target (prepended with "#" for IDs and "." for classes). 
Classnames and tagnames may be appended with array index notation ([n]). 
Otherwise, the Scraper will scrape all elements of that class or tag 
sequentially. Such a loosely targeted scrape will save many of the targeted 
fields to the JSON file, but will only save the first instance of the target to 
a Mustache template.

Upon submission, you should be able to review the scraped output on the 
subsequent page. If the output looks correct, enter a filename and submit again. 
The Scraper will save Mustache and JSON files by that name in the 98-scrape 
directory, also viewable under the Scrape menu of the toolbar. The Scraper will 
correctly indent the Mustache code. However, this beautification may also render 
some attributes of the Mustache code a little different than the original HTML.

### <a id="variables.styl"></a>variables.styl
`ui/source/_scripts/src/variables.styl` is a file containing variables that can 
be shared across the Stylus CSS preprocessor, browser JavaScripts, and PHP 
backends (and possibly other language backends as well). It ships with these 
values:

```
bp_lg_max = -1
bp_lg_min = 1024
bp_md_min = 768
bp_sm_min = 480
bp_xs_min = 0
```

It cannot contain comments, semi-colons, curly braces, etc. It is 
straightforward to import and use these variables in Stylus and JavaScript. PHP 
must import them with `parse_ini_file()`. Fepper tries to be agnostic about CSS 
processors and tries to keep the amount of NPMs to download to a minimum, so it 
does not ship with Stylus (or any other CSS pre/post-processor) configured. 
However, since Stylus allows for this easy sharing of variables, Fepper does 
ship with a `ui/source/css-processors/stylus` directory. In order to compile its 
Stylus into the stock Pattern Lab CSS, run `npm install` in the `extend` 
directory. Then, uncomment the `css-process` tasks in `extend/custom.js`. The 
Stylus files are written in the terse, Python-like, indentation-based syntax; 
however, the more verbose, CSS-like syntax (with curly braces, colons, and 
semi-colons) is perfectly valid as well.

### <a id="extensions"></a>Extensions
The `extend` directory is purposed for extending Fepper's functionality. 
Extensions can be contributed or custom. The `extend` directory will not be 
modified when updating Fepper.

Contributed extensions:

* Install and update contributed extensions with NPM.
* Add the tasks to `extend/contrib.js` (and `extend/auxiliary/auxiliary_contrib.js` if necessary) in order for Fepper to run them.

Custom extensions:

* Write custom extensions within an appropriately named directory just under the `extend/custom` directory.
* They must include a file ending in "~extend.js" in order for Fepper to recognize their tasks.
* Add the tasks to `extend/custom.js` (and `extend/auxiliary/auxiliary_custom.js` if necessary) in order for Fepper to run them.

### <a id="mobile-devices"></a>Mobile Devices
The best way to browse the Fepper UI on a mobile device is through the wireless 
connection on your development machine. These are the instructions for doing 
this on a Mac:

If your Mac is connected to the Internet wirelessly:

* Open System Preferences
* Click Network
* In the left pane, select Wi-Fi
* In the right pane, underneath Status, the IP address will be displayed
* On your mobile device, connect to the same wireless network that your Mac is connected to
* Browse http://{IP address}:3000
* Change the port number if Fepper is listening on a different port

If your Mac is connected to the Internet through a wire:

* In the top menu bar, turn Wi-Fi off
* Open System Preferences
* Click Sharing
* In the left pane, select Internet Sharing
* In the right pane, on "Share your connection from:", select the interface which is connected to the Internet
* On "To computers using:", check Wi-Fi
* Click "Wi-Fi Options..."
* This will show your Mac's name as the wireless network name
* Add security if you are in a public space
* Click OK
* Back in the System Preferences main window, in the left pane, check to activate Internet Sharing
* In the dialog that appears, click "Turn Wi-Fi On"
* In the next dialog, click Start
* The Wi-Fi icon in the top menu bar should now be gray with a white up-arrow
* Back in the System Preferences main window, click Network
* In the left pane, select your wired connection
* In the right pane, underneath Status, the IP address will be displayed
* On your mobile device, connect to the wireless network that is the same name as your Mac
* Browse http://{IP address}:3000
* Change the port number if Fepper is listening on a different port

### <a id="more-documentation"></a>More Documentation
* [default.pref.yml](https://github.com/electric-eloquence/fepper/blob/master/excludes/default.pref.yml)
* [Pattern Lab](http://patternlab.io/docs/index.html)
* [Mustache](https://mustache.github.io/mustache.5.html)

### <a id="contribute"></a>Contribute
Contributions and bug fixes are greatly appreciated!

* Please pull request against the [dev branch](https://github.com/electric-eloquence/fepper/tree/dev).
* Please try to be both concise as well as clear on what is trying to be accomplished.
