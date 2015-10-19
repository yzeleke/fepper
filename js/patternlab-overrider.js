var $ = jQuery; // Needed for DataSaver. Try to avoid jQuery in custom code.
var d = document;
var FEPPER = window.FEPPER;
var i;
var j;

// Replace event handlers on the S, M, and L buttons.
var bps = FEPPER.breakpoints;
var bpObj = {};
var bpBtn;
var bpBtnClone;

// Feel free to create more breakpoints, but Fepper only has resize buttons
// for the lg, md, and sm breakpoints.
var minWidthL = bps.lg.minWidth;
var minWidthM = bps.md.minWidth;
var median = (minWidthL - minWidthM) / 2;
bpObj.l = minWidthL + median;
bpObj.m = minWidthM + median;
bpObj.s = minWidthM - median;

// ///////////////////////////////////////////////////////////////////////////
// VIEWPORT RESIZER
// ///////////////////////////////////////////////////////////////////////////
function sizeiframe(e) {
  'use strict';

  e.preventDefault();
  var sgSize = this.id.replace('sg-size-', '');

  for (j in bpObj) {
    if (sgSize === j) {
      var maxViewportWidth = 2600; // Defined in patternlab-node/public/js/styleguide.js
      var minViewportWidth = 240; // Defined in patternlab-node/public/js/styleguide.js
      var size = bpObj[j];
      var theSize;
      var viewportResizeHandleWidth = 14; // Defined in patternlab-node/public/js/styleguide.js

      if (size > maxViewportWidth) {
        // If the entered size is larger than the max allowed viewport size, cap
        // value at max vp size.
        theSize = maxViewportWidth;
      }
      else if (size < minViewportWidth) {
        // If the entered size is less than the minimum allowed viewport size, cap
        // value at min vp size.
        theSize = minViewportWidth;
      }
      else {
        theSize = size;
      }

      // Resize viewport wrapper to desired size + size of drag resize handler.
      d.getElementById('sg-gen-container').className = 'vp-animate';
      d.getElementById('sg-gen-container').style.width = theSize + viewportResizeHandleWidth + 'px';
      // Resize viewport to desired size.
      d.getElementById('sg-viewport').className = 'vp-animate';
      d.getElementById('sg-viewport').style.width = theSize + 'px';

      var targetOrigin = (window.location.protocol === 'file:') ? '*' : window.location.protocol + '//' + window.location.host;
      var obj = JSON.stringify({resize: 'true'});
      d.getElementById('sg-viewport').contentWindow.postMessage(obj, targetOrigin);

      // Update values in toolbar
      updateSizeReading(theSize);
      // Save current viewport to cookie
      saveSize(theSize);
    }
  }
}

function updateSizeReading(size) {
  'use strict';

  var bodyFontSize;
  if (d.getElementsByTagName('body')[0].style.fontSize.indexOf('px') !== -1) {
    bodyFontSize = parseInt(d.getElementsByTagName('body')[0].style.fontSize.replace('px', ''), 10);
  }
  else {
    bodyFontSize = 16;
  }

  var pxSize = size;
  var emSize = size / bodyFontSize;
  // Px size input element in toolbar
  var sizePx = d.getElementsByClassName('sg-size-px')[0];
  // Em size input element in toolbar
  var sizeEms = d.getElementsByClassName('sg-size-em')[0];
  sizeEms.value = emSize.toFixed(2);
  sizePx.value = pxSize;
}

function saveSize(size) {
  'use strict';

  if (!DataSaver.findValue('vpWidth')) {
    DataSaver.addValue("vpWidth", size);
  }
  else {
    DataSaver.updateValue("vpWidth", size);
  }
}

(function () {
  'use strict';

  // Iterate through bps in order to create event listeners that resize
  // the viewport.
  for (i in bpObj) {
    if (bpObj.hasOwnProperty(i)) {
      // Stripping breakpoint buttons of original event listeners.
      bpBtn = d.getElementById('sg-size-' + i);
      if (bpBtn) {
        bpBtnClone = bpBtn.cloneNode(true);
        bpBtn.parentNode.replaceChild(bpBtnClone, bpBtn);

        // Re-adding click event listener.
        bpBtn = d.getElementById('sg-size-' + i);
        bpBtn.addEventListener('click', sizeiframe);
      }
    }
  }
})();

(function multisite_0_0_0 () {
  "use strict";

  var sgNavContainer = document.getElementById("sg-nav-container");
  sgNavContainer.insertAdjacentHTML('afterend', '<div class="fp-nav-container sg-nav-container" id="fp-nav-container--subsite1">\n<div class="fp-nav-label">SUBSITE1</div>\n<ol class="sg-nav">\n\n		<li class="sg-nav-atoms"><a class="sg-acc-handle">Atoms</a><ol class="sg-acc-panel">\n			<li class="sg-nav-global"><a class="sg-acc-handle">Global</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-00-global-00-colors/00-atoms-00-global-00-colors.html" class="sg-pop  " data-patternpartial="atoms-colors">Colors</a></li>\n			<li><a href="subsite1/patterns/00-atoms-00-global-01-fonts/00-atoms-00-global-01-fonts.html" class="sg-pop  " data-patternpartial="atoms-fonts">Fonts</a></li>\n			<li><a href="subsite1/patterns/00-atoms-00-global-02-animations/00-atoms-00-global-02-animations.html" class="sg-pop  " data-patternpartial="atoms-animations">Animations</a></li>\n			<li><a href="subsite1/patterns/00-atoms-00-global-03-visibility/00-atoms-00-global-03-visibility.html" class="sg-pop  " data-patternpartial="atoms-visibility">Visibility</a></li>\n			<li><a href="subsite1/patterns/00-atoms-00-global/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-global">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-text"><a class="sg-acc-handle">Text</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-01-text-00-headings/00-atoms-01-text-00-headings.html" class="sg-pop  " data-patternpartial="atoms-headings">Headings</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-01-subheadings/00-atoms-01-text-01-subheadings.html" class="sg-pop  " data-patternpartial="atoms-subheadings">Subheadings</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-02-headings-with-links/00-atoms-01-text-02-headings-with-links.html" class="sg-pop  " data-patternpartial="atoms-headings-with-links">Headings With Links</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-03-paragraph/00-atoms-01-text-03-paragraph.html" class="sg-pop  " data-patternpartial="atoms-paragraph">Paragraph</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-04-blockquote/00-atoms-01-text-04-blockquote.html" class="sg-pop  " data-patternpartial="atoms-blockquote">Blockquote</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-05-inline-elements/00-atoms-01-text-05-inline-elements.html" class="sg-pop  " data-patternpartial="atoms-inline-elements">Inline Elements</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-06-time/00-atoms-01-text-06-time.html" class="sg-pop  " data-patternpartial="atoms-time">Time</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-07-preformatted-text/00-atoms-01-text-07-preformatted-text.html" class="sg-pop  " data-patternpartial="atoms-preformatted-text">Preformatted Text</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-08-emphasis-colors/00-atoms-01-text-08-emphasis-colors.html" class="sg-pop  " data-patternpartial="atoms-emphasis-colors">Emphasis Colors</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-09-hr/00-atoms-01-text-09-hr.html" class="sg-pop  " data-patternpartial="atoms-hr">Hr</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text-10-caption/00-atoms-01-text-10-caption.html" class="sg-pop  " data-patternpartial="atoms-caption">Caption</a></li>\n			<li><a href="subsite1/patterns/00-atoms-01-text/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-text">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-lists"><a class="sg-acc-handle">Lists</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-02-lists-00-unordered/00-atoms-02-lists-00-unordered.html" class="sg-pop  " data-patternpartial="atoms-unordered">Unordered</a></li>\n			<li><a href="subsite1/patterns/00-atoms-02-lists-01-ordered/00-atoms-02-lists-01-ordered.html" class="sg-pop  " data-patternpartial="atoms-ordered">Ordered</a></li>\n			<li><a href="subsite1/patterns/00-atoms-02-lists-02-definition/00-atoms-02-lists-02-definition.html" class="sg-pop  " data-patternpartial="atoms-definition">Definition</a></li>\n			<li><a href="subsite1/patterns/00-atoms-02-lists/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-lists">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-images"><a class="sg-acc-handle">Images</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-03-images-00-logo/00-atoms-03-images-00-logo.html" class="sg-pop  " data-patternpartial="atoms-logo">Logo</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-01-landscape-4x3/00-atoms-03-images-01-landscape-4x3.html" class="sg-pop  " data-patternpartial="atoms-landscape-4x3">Landscape 4x3</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-02-landscape-16x9/00-atoms-03-images-02-landscape-16x9.html" class="sg-pop  " data-patternpartial="atoms-landscape-16x9">Landscape 16x9</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-03-square/00-atoms-03-images-03-square.html" class="sg-pop  " data-patternpartial="atoms-square">Square</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-04-avatar/00-atoms-03-images-04-avatar.html" class="sg-pop  " data-patternpartial="atoms-avatar">Avatar</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-05-icons/00-atoms-03-images-05-icons.html" class="sg-pop  " data-patternpartial="atoms-icons">Icons</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-06-loading-icon/00-atoms-03-images-06-loading-icon.html" class="sg-pop  " data-patternpartial="atoms-loading-icon">Loading Icon</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images-07-favicon/00-atoms-03-images-07-favicon.html" class="sg-pop  " data-patternpartial="atoms-favicon">Favicon</a></li>\n			<li><a href="subsite1/patterns/00-atoms-03-images/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-images">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-forms"><a class="sg-acc-handle">Forms</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-04-forms-00-text-fields/00-atoms-04-forms-00-text-fields.html" class="sg-pop  " data-patternpartial="atoms-text-fields">Text Fields</a></li>\n			<li><a href="subsite1/patterns/00-atoms-04-forms-01-select-menu/00-atoms-04-forms-01-select-menu.html" class="sg-pop  " data-patternpartial="atoms-select-menu">Select Menu</a></li>\n			<li><a href="subsite1/patterns/00-atoms-04-forms-02-checkbox/00-atoms-04-forms-02-checkbox.html" class="sg-pop  " data-patternpartial="atoms-checkbox">Checkbox</a></li>\n			<li><a href="subsite1/patterns/00-atoms-04-forms-03-radio-buttons/00-atoms-04-forms-03-radio-buttons.html" class="sg-pop  " data-patternpartial="atoms-radio-buttons">Radio Buttons</a></li>\n			<li><a href="subsite1/patterns/00-atoms-04-forms-04-html5-inputs/00-atoms-04-forms-04-html5-inputs.html" class="sg-pop  " data-patternpartial="atoms-html5-inputs">Html5 Inputs</a></li>\n			<li><a href="subsite1/patterns/00-atoms-04-forms/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-forms">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-buttons"><a class="sg-acc-handle">Buttons</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-05-buttons-00-buttons/00-atoms-05-buttons-00-buttons.html" class="sg-pop  " data-patternpartial="atoms-buttons">Buttons</a></li>\n			<li><a href="subsite1/patterns/00-atoms-05-buttons/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-buttons">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-tables"><a class="sg-acc-handle">Tables</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-06-tables-00-table/00-atoms-06-tables-00-table.html" class="sg-pop  " data-patternpartial="atoms-table">Table</a></li>\n			<li><a href="subsite1/patterns/00-atoms-06-tables/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-tables">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-media"><a class="sg-acc-handle">Media</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/00-atoms-07-media-00-video/00-atoms-07-media-00-video.html" class="sg-pop  " data-patternpartial="atoms-video">Video</a></li>\n			<li><a href="subsite1/patterns/00-atoms-07-media-01-audio/00-atoms-07-media-01-audio.html" class="sg-pop  " data-patternpartial="atoms-audio">Audio</a></li>\n			<li><a href="subsite1/patterns/00-atoms-07-media/index.html" class="sg-pop  " data-patternpartial="viewall-atoms-media">View All</a></li>\n			</ol></li>\n		</ol></li>\n		<li class="sg-nav-molecules"><a class="sg-acc-handle">Molecules</a><ol class="sg-acc-panel">\n			<li class="sg-nav-text"><a class="sg-acc-handle">Text</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-00-text-00-byline-author-only/01-molecules-00-text-00-byline-author-only.html" class="sg-pop  " data-patternpartial="molecules-byline-author-only">Byline Author Only</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-01-byline-author-time/01-molecules-00-text-01-byline-author-time.html" class="sg-pop  " data-patternpartial="molecules-byline-author-time">Byline Author Time</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-02-address/01-molecules-00-text-02-address.html" class="sg-pop  " data-patternpartial="molecules-address">Address</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-03-heading-group/01-molecules-00-text-03-heading-group.html" class="sg-pop  " data-patternpartial="molecules-heading-group">Heading Group</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-04-blockquote-with-citation/01-molecules-00-text-04-blockquote-with-citation.html" class="sg-pop  " data-patternpartial="molecules-blockquote-with-citation">Blockquote With Citation</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-05-intro-text/01-molecules-00-text-05-intro-text.html" class="sg-pop  " data-patternpartial="molecules-intro-text">Intro Text</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text-06-pullquote/01-molecules-00-text-06-pullquote.html" class="sg-pop  " data-patternpartial="molecules-pullquote">Pullquote</a></li>\n			<li><a href="subsite1/patterns/01-molecules-00-text/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-text">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-layout"><a class="sg-acc-handle">Layout</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-01-layout-00-one-up/01-molecules-01-layout-00-one-up.html" class="sg-pop  " data-patternpartial="molecules-one-up">One Up</a></li>\n			<li><a href="subsite1/patterns/01-molecules-01-layout-01-two-up/01-molecules-01-layout-01-two-up.html" class="sg-pop  " data-patternpartial="molecules-two-up">Two Up</a></li>\n			<li><a href="subsite1/patterns/01-molecules-01-layout-02-three-up/01-molecules-01-layout-02-three-up.html" class="sg-pop  " data-patternpartial="molecules-three-up">Three Up</a></li>\n			<li><a href="subsite1/patterns/01-molecules-01-layout-03-four-up/01-molecules-01-layout-03-four-up.html" class="sg-pop  " data-patternpartial="molecules-four-up">Four Up</a></li>\n			<li><a href="subsite1/patterns/01-molecules-01-layout/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-layout">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-blocks"><a class="sg-acc-handle">Blocks</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-00-media-block/01-molecules-02-blocks-00-media-block.html" class="sg-pop  " data-patternpartial="molecules-media-block">Media Block</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-01-headline-byline/01-molecules-02-blocks-01-headline-byline.html" class="sg-pop  " data-patternpartial="molecules-headline-byline">Headline Byline</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-02-block-hero/01-molecules-02-blocks-02-block-hero.html" class="sg-pop  " data-patternpartial="molecules-block-hero">Block Hero</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-03-block-thumb-headline/01-molecules-02-blocks-03-block-thumb-headline.html" class="sg-pop  " data-patternpartial="molecules-block-thumb-headline">Block Thumb Headline</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-04-headline-only/01-molecules-02-blocks-04-headline-only.html" class="sg-pop  " data-patternpartial="molecules-headline-only">Headline Only</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks-05-inset-block/01-molecules-02-blocks-05-inset-block.html" class="sg-pop  " data-patternpartial="molecules-inset-block">Inset Block</a></li>\n			<li><a href="subsite1/patterns/01-molecules-02-blocks/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-blocks">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-media"><a class="sg-acc-handle">Media</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-03-media-00-figure-with-caption/01-molecules-03-media-00-figure-with-caption.html" class="sg-pop  " data-patternpartial="molecules-figure-with-caption">Figure With Caption</a></li>\n			<li><a href="subsite1/patterns/01-molecules-03-media/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-media">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-forms"><a class="sg-acc-handle">Forms</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-04-forms-00-search/01-molecules-04-forms-00-search.html" class="sg-pop  " data-patternpartial="molecules-search">Search</a></li>\n			<li><a href="subsite1/patterns/01-molecules-04-forms-01-comment-form/01-molecules-04-forms-01-comment-form.html" class="sg-pop  " data-patternpartial="molecules-comment-form">Comment Form</a></li>\n			<li><a href="subsite1/patterns/01-molecules-04-forms-02-newsletter/01-molecules-04-forms-02-newsletter.html" class="sg-pop  " data-patternpartial="molecules-newsletter">Newsletter</a></li>\n			<li><a href="subsite1/patterns/01-molecules-04-forms/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-forms">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-navigation"><a class="sg-acc-handle">Navigation</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-05-navigation-00-primary-nav/01-molecules-05-navigation-00-primary-nav.html" class="sg-pop  " data-patternpartial="molecules-primary-nav">Primary Nav</a></li>\n			<li><a href="subsite1/patterns/01-molecules-05-navigation-01-footer-nav/01-molecules-05-navigation-01-footer-nav.html" class="sg-pop  " data-patternpartial="molecules-footer-nav">Footer Nav</a></li>\n			<li><a href="subsite1/patterns/01-molecules-05-navigation-02-breadcrumbs/01-molecules-05-navigation-02-breadcrumbs.html" class="sg-pop  " data-patternpartial="molecules-breadcrumbs">Breadcrumbs</a></li>\n			<li><a href="subsite1/patterns/01-molecules-05-navigation-03-pagination/01-molecules-05-navigation-03-pagination.html" class="sg-pop  " data-patternpartial="molecules-pagination">Pagination</a></li>\n			<li><a href="subsite1/patterns/01-molecules-05-navigation-04-tabs/01-molecules-05-navigation-04-tabs.html" class="sg-pop  " data-patternpartial="molecules-tabs">Tabs</a></li>\n			<li><a href="subsite1/patterns/01-molecules-05-navigation/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-navigation">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-components"><a class="sg-acc-handle">Components</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-06-components-00-social-share/01-molecules-06-components-00-social-share.html" class="sg-pop  " data-patternpartial="molecules-social-share">Social Share</a></li>\n			<li><a href="subsite1/patterns/01-molecules-06-components-01-accordion/01-molecules-06-components-01-accordion.html" class="sg-pop  " data-patternpartial="molecules-accordion">Accordion</a></li>\n			<li><a href="subsite1/patterns/01-molecules-06-components-02-single-comment/01-molecules-06-components-02-single-comment.html" class="sg-pop  " data-patternpartial="molecules-single-comment">Single Comment</a></li>\n			<li><a href="subsite1/patterns/01-molecules-06-components/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-components">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-messaging"><a class="sg-acc-handle">Messaging</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/01-molecules-07-messaging-00-alert/01-molecules-07-messaging-00-alert.html" class="sg-pop  " data-patternpartial="molecules-alert">Alert</a></li>\n			<li><a href="subsite1/patterns/01-molecules-07-messaging/index.html" class="sg-pop  " data-patternpartial="viewall-molecules-messaging">View All</a></li>\n			</ol></li>\n		</ol></li>\n		<li class="sg-nav-organisms"><a class="sg-acc-handle">Organisms</a><ol class="sg-acc-panel">\n			<li class="sg-nav-global"><a class="sg-acc-handle">Global</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/02-organisms-00-global-00-header/02-organisms-00-global-00-header.html" class="sg-pop  " data-patternpartial="organisms-header">Header</a></li>\n			<li><a href="subsite1/patterns/02-organisms-00-global-01-footer/02-organisms-00-global-01-footer.html" class="sg-pop  " data-patternpartial="organisms-footer">Footer</a></li>\n			<li><a href="subsite1/patterns/02-organisms-00-global/index.html" class="sg-pop  " data-patternpartial="viewall-organisms-global">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-article"><a class="sg-acc-handle">Article</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/02-organisms-01-article-00-article-body/02-organisms-01-article-00-article-body.html" class="sg-pop  " data-patternpartial="organisms-article-body">Article Body</a></li>\n			<li><a href="subsite1/patterns/02-organisms-01-article/index.html" class="sg-pop  " data-patternpartial="viewall-organisms-article">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-comments"><a class="sg-acc-handle">Comments</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/02-organisms-02-comments-00-comment-thread/02-organisms-02-comments-00-comment-thread.html" class="sg-pop  " data-patternpartial="organisms-comment-thread">Comment Thread</a></li>\n			<li><a href="subsite1/patterns/02-organisms-02-comments-01-sticky-comment/02-organisms-02-comments-01-sticky-comment.html" class="sg-pop  " data-patternpartial="organisms-sticky-comment">Sticky Comment</a></li>\n			<li><a href="subsite1/patterns/02-organisms-02-comments/index.html" class="sg-pop  " data-patternpartial="viewall-organisms-comments">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-components"><a class="sg-acc-handle">Components</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/02-organisms-03-components-00-carousel/02-organisms-03-components-00-carousel.html" class="sg-pop  " data-patternpartial="organisms-carousel">Carousel</a></li>\n			<li><a href="subsite1/patterns/02-organisms-03-components/index.html" class="sg-pop  " data-patternpartial="viewall-organisms-components">View All</a></li>\n			</ol></li>\n			<li class="sg-nav-sections"><a class="sg-acc-handle">Sections</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/02-organisms-04-sections-00-latest-posts/02-organisms-04-sections-00-latest-posts.html" class="sg-pop  " data-patternpartial="organisms-latest-posts">Latest Posts</a></li>\n			<li><a href="subsite1/patterns/02-organisms-04-sections-01-recent-tweets/02-organisms-04-sections-01-recent-tweets.html" class="sg-pop  " data-patternpartial="organisms-recent-tweets">Recent Tweets</a></li>\n			<li><a href="subsite1/patterns/02-organisms-04-sections-02-related-posts/02-organisms-04-sections-02-related-posts.html" class="sg-pop  " data-patternpartial="organisms-related-posts">Related Posts</a></li>\n			<li><a href="subsite1/patterns/02-organisms-04-sections/index.html" class="sg-pop  " data-patternpartial="viewall-organisms-sections">View All</a></li>\n			</ol></li>\n		</ol></li>\n		<li class="sg-nav-templates"><a class="sg-acc-handle">Templates</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/03-templates-00-homepage/03-templates-00-homepage.html" class="sg-pop " "="" data-patternpartial="templates-homepage">Homepage</a></li>\n			<li><a href="subsite1/patterns/03-templates-01-blog/03-templates-01-blog.html" class="sg-pop " "="" data-patternpartial="templates-blog">Blog</a></li>\n			<li><a href="subsite1/patterns/03-templates-02-article/03-templates-02-article.html" class="sg-pop " "="" data-patternpartial="templates-article">Article</a></li>\n		</ol></li>\n		<li class="sg-nav-pages"><a class="sg-acc-handle">Pages</a><ol class="sg-acc-panel">\n			<li><a href="subsite1/patterns/04-pages-00-homepage/04-pages-00-homepage.html" class="sg-pop " "="" data-patternpartial="pages-homepage">Homepage</a></li>\n			<li><a href="subsite1/patterns/04-pages-00-homepage-emergency/04-pages-00-homepage-emergency.html" class="sg-pop sg-pattern-state inprogress" "="" data-patternpartial="pages-homepage-emergency">Homepage Emergency</a></li>\n			<li><a href="subsite1/patterns/04-pages-01-blog/04-pages-01-blog.html" class="sg-pop " "="" data-patternpartial="pages-blog">Blog</a></li>\n			<li><a href="subsite1/patterns/04-pages-02-article/04-pages-02-article.html" class="sg-pop " "="" data-patternpartial="pages-article">Article</a></li>\n		</ol></li>\n	<li><a href="subsite1/styleguide/html/styleguide.html" class="sg-pop" data-patternpartial="all">All</a></li>\n\n</ol>\n</div>\n  ');

  var msPatternPaths = {"subsite1":{"atoms-colors":"patterns/00-atoms-00-global-00-colors/00-atoms-00-global-00-colors.html","atoms-fonts":"patterns/00-atoms-00-global-01-fonts/00-atoms-00-global-01-fonts.html","atoms-animations":"patterns/00-atoms-00-global-02-animations/00-atoms-00-global-02-animations.html","atoms-visibility":"patterns/00-atoms-00-global-03-visibility/00-atoms-00-global-03-visibility.html","viewall-atoms-global":"patterns/00-atoms-00-global/index.html","atoms-headings":"patterns/00-atoms-01-text-00-headings/00-atoms-01-text-00-headings.html","atoms-subheadings":"patterns/00-atoms-01-text-01-subheadings/00-atoms-01-text-01-subheadings.html","atoms-headings-with-links":"patterns/00-atoms-01-text-02-headings-with-links/00-atoms-01-text-02-headings-with-links.html","atoms-paragraph":"patterns/00-atoms-01-text-03-paragraph/00-atoms-01-text-03-paragraph.html","atoms-blockquote":"patterns/00-atoms-01-text-04-blockquote/00-atoms-01-text-04-blockquote.html","atoms-inline-elements":"patterns/00-atoms-01-text-05-inline-elements/00-atoms-01-text-05-inline-elements.html","atoms-time":"patterns/00-atoms-01-text-06-time/00-atoms-01-text-06-time.html","atoms-preformatted-text":"patterns/00-atoms-01-text-07-preformatted-text/00-atoms-01-text-07-preformatted-text.html","atoms-emphasis-colors":"patterns/00-atoms-01-text-08-emphasis-colors/00-atoms-01-text-08-emphasis-colors.html","atoms-hr":"patterns/00-atoms-01-text-09-hr/00-atoms-01-text-09-hr.html","atoms-caption":"patterns/00-atoms-01-text-10-caption/00-atoms-01-text-10-caption.html","viewall-atoms-text":"patterns/00-atoms-01-text/index.html","atoms-unordered":"patterns/00-atoms-02-lists-00-unordered/00-atoms-02-lists-00-unordered.html","atoms-ordered":"patterns/00-atoms-02-lists-01-ordered/00-atoms-02-lists-01-ordered.html","atoms-definition":"patterns/00-atoms-02-lists-02-definition/00-atoms-02-lists-02-definition.html","viewall-atoms-lists":"patterns/00-atoms-02-lists/index.html","atoms-logo":"patterns/00-atoms-03-images-00-logo/00-atoms-03-images-00-logo.html","atoms-landscape-4x3":"patterns/00-atoms-03-images-01-landscape-4x3/00-atoms-03-images-01-landscape-4x3.html","atoms-landscape-16x9":"patterns/00-atoms-03-images-02-landscape-16x9/00-atoms-03-images-02-landscape-16x9.html","atoms-square":"patterns/00-atoms-03-images-03-square/00-atoms-03-images-03-square.html","atoms-avatar":"patterns/00-atoms-03-images-04-avatar/00-atoms-03-images-04-avatar.html","atoms-icons":"patterns/00-atoms-03-images-05-icons/00-atoms-03-images-05-icons.html","atoms-loading-icon":"patterns/00-atoms-03-images-06-loading-icon/00-atoms-03-images-06-loading-icon.html","atoms-favicon":"patterns/00-atoms-03-images-07-favicon/00-atoms-03-images-07-favicon.html","viewall-atoms-images":"patterns/00-atoms-03-images/index.html","atoms-text-fields":"patterns/00-atoms-04-forms-00-text-fields/00-atoms-04-forms-00-text-fields.html","atoms-select-menu":"patterns/00-atoms-04-forms-01-select-menu/00-atoms-04-forms-01-select-menu.html","atoms-checkbox":"patterns/00-atoms-04-forms-02-checkbox/00-atoms-04-forms-02-checkbox.html","atoms-radio-buttons":"patterns/00-atoms-04-forms-03-radio-buttons/00-atoms-04-forms-03-radio-buttons.html","atoms-html5-inputs":"patterns/00-atoms-04-forms-04-html5-inputs/00-atoms-04-forms-04-html5-inputs.html","viewall-atoms-forms":"patterns/00-atoms-04-forms/index.html","atoms-buttons":"patterns/00-atoms-05-buttons-00-buttons/00-atoms-05-buttons-00-buttons.html","viewall-atoms-buttons":"patterns/00-atoms-05-buttons/index.html","atoms-table":"patterns/00-atoms-06-tables-00-table/00-atoms-06-tables-00-table.html","viewall-atoms-tables":"patterns/00-atoms-06-tables/index.html","atoms-video":"patterns/00-atoms-07-media-00-video/00-atoms-07-media-00-video.html","atoms-audio":"patterns/00-atoms-07-media-01-audio/00-atoms-07-media-01-audio.html","viewall-atoms-media":"patterns/00-atoms-07-media/index.html","molecules-byline-author-only":"patterns/01-molecules-00-text-00-byline-author-only/01-molecules-00-text-00-byline-author-only.html","molecules-byline-author-time":"patterns/01-molecules-00-text-01-byline-author-time/01-molecules-00-text-01-byline-author-time.html","molecules-address":"patterns/01-molecules-00-text-02-address/01-molecules-00-text-02-address.html","molecules-heading-group":"patterns/01-molecules-00-text-03-heading-group/01-molecules-00-text-03-heading-group.html","molecules-blockquote-with-citation":"patterns/01-molecules-00-text-04-blockquote-with-citation/01-molecules-00-text-04-blockquote-with-citation.html","molecules-intro-text":"patterns/01-molecules-00-text-05-intro-text/01-molecules-00-text-05-intro-text.html","molecules-pullquote":"patterns/01-molecules-00-text-06-pullquote/01-molecules-00-text-06-pullquote.html","viewall-molecules-text":"patterns/01-molecules-00-text/index.html","molecules-one-up":"patterns/01-molecules-01-layout-00-one-up/01-molecules-01-layout-00-one-up.html","molecules-two-up":"patterns/01-molecules-01-layout-01-two-up/01-molecules-01-layout-01-two-up.html","molecules-three-up":"patterns/01-molecules-01-layout-02-three-up/01-molecules-01-layout-02-three-up.html","molecules-four-up":"patterns/01-molecules-01-layout-03-four-up/01-molecules-01-layout-03-four-up.html","viewall-molecules-layout":"patterns/01-molecules-01-layout/index.html","molecules-media-block":"patterns/01-molecules-02-blocks-00-media-block/01-molecules-02-blocks-00-media-block.html","molecules-headline-byline":"patterns/01-molecules-02-blocks-01-headline-byline/01-molecules-02-blocks-01-headline-byline.html","molecules-block-hero":"patterns/01-molecules-02-blocks-02-block-hero/01-molecules-02-blocks-02-block-hero.html","molecules-block-thumb-headline":"patterns/01-molecules-02-blocks-03-block-thumb-headline/01-molecules-02-blocks-03-block-thumb-headline.html","molecules-headline-only":"patterns/01-molecules-02-blocks-04-headline-only/01-molecules-02-blocks-04-headline-only.html","molecules-inset-block":"patterns/01-molecules-02-blocks-05-inset-block/01-molecules-02-blocks-05-inset-block.html","viewall-molecules-blocks":"patterns/01-molecules-02-blocks/index.html","molecules-figure-with-caption":"patterns/01-molecules-03-media-00-figure-with-caption/01-molecules-03-media-00-figure-with-caption.html","viewall-molecules-media":"patterns/01-molecules-03-media/index.html","molecules-search":"patterns/01-molecules-04-forms-00-search/01-molecules-04-forms-00-search.html","molecules-comment-form":"patterns/01-molecules-04-forms-01-comment-form/01-molecules-04-forms-01-comment-form.html","molecules-newsletter":"patterns/01-molecules-04-forms-02-newsletter/01-molecules-04-forms-02-newsletter.html","viewall-molecules-forms":"patterns/01-molecules-04-forms/index.html","molecules-primary-nav":"patterns/01-molecules-05-navigation-00-primary-nav/01-molecules-05-navigation-00-primary-nav.html","molecules-footer-nav":"patterns/01-molecules-05-navigation-01-footer-nav/01-molecules-05-navigation-01-footer-nav.html","molecules-breadcrumbs":"patterns/01-molecules-05-navigation-02-breadcrumbs/01-molecules-05-navigation-02-breadcrumbs.html","molecules-pagination":"patterns/01-molecules-05-navigation-03-pagination/01-molecules-05-navigation-03-pagination.html","molecules-tabs":"patterns/01-molecules-05-navigation-04-tabs/01-molecules-05-navigation-04-tabs.html","viewall-molecules-navigation":"patterns/01-molecules-05-navigation/index.html","molecules-social-share":"patterns/01-molecules-06-components-00-social-share/01-molecules-06-components-00-social-share.html","molecules-accordion":"patterns/01-molecules-06-components-01-accordion/01-molecules-06-components-01-accordion.html","molecules-single-comment":"patterns/01-molecules-06-components-02-single-comment/01-molecules-06-components-02-single-comment.html","viewall-molecules-components":"patterns/01-molecules-06-components/index.html","molecules-alert":"patterns/01-molecules-07-messaging-00-alert/01-molecules-07-messaging-00-alert.html","viewall-molecules-messaging":"patterns/01-molecules-07-messaging/index.html","organisms-header":"patterns/02-organisms-00-global-00-header/02-organisms-00-global-00-header.html","organisms-footer":"patterns/02-organisms-00-global-01-footer/02-organisms-00-global-01-footer.html","viewall-organisms-global":"patterns/02-organisms-00-global/index.html","organisms-article-body":"patterns/02-organisms-01-article-00-article-body/02-organisms-01-article-00-article-body.html","viewall-organisms-article":"patterns/02-organisms-01-article/index.html","organisms-comment-thread":"patterns/02-organisms-02-comments-00-comment-thread/02-organisms-02-comments-00-comment-thread.html","organisms-sticky-comment":"patterns/02-organisms-02-comments-01-sticky-comment/02-organisms-02-comments-01-sticky-comment.html","viewall-organisms-comments":"patterns/02-organisms-02-comments/index.html","organisms-carousel":"patterns/02-organisms-03-components-00-carousel/02-organisms-03-components-00-carousel.html","viewall-organisms-components":"patterns/02-organisms-03-components/index.html","organisms-latest-posts":"patterns/02-organisms-04-sections-00-latest-posts/02-organisms-04-sections-00-latest-posts.html","organisms-recent-tweets":"patterns/02-organisms-04-sections-01-recent-tweets/02-organisms-04-sections-01-recent-tweets.html","organisms-related-posts":"patterns/02-organisms-04-sections-02-related-posts/02-organisms-04-sections-02-related-posts.html","viewall-organisms-sections":"patterns/02-organisms-04-sections/index.html","templates-homepage":"patterns/03-templates-00-homepage/03-templates-00-homepage.html","templates-blog":"patterns/03-templates-01-blog/03-templates-01-blog.html","templates-article":"patterns/03-templates-02-article/03-templates-02-article.html","pages-homepage":"patterns/04-pages-00-homepage/04-pages-00-homepage.html","pages-homepage-emergency":"patterns/04-pages-00-homepage-emergency/04-pages-00-homepage-emergency.html","pages-blog":"patterns/04-pages-01-blog/04-pages-01-blog.html","pages-article":"patterns/04-pages-02-article/04-pages-02-article.html","all":"styleguide/html/styleguide.html"}};

  urlHandler.pushPattern = function (pattern, givenPath) {
    var data         = { "pattern": pattern };
    var fileName     = urlHandler.getFileName(pattern);
    var expectedPath = window.location.pathname.replace("public/index.html","public/")+fileName;

    if (givenPath.indexOf(expectedPath) === -1) {
      // make sure to update the iframe because there was a click
      document.getElementById("sg-viewport").contentWindow.postMessage( { "path": fileName }, urlHandler.targetOrigin);
    } else {
      var addressReplacement = (window.location.protocol == "file:") ? null : window.location.protocol+"//"+window.location.host+window.location.pathname.replace("index.html","")+"?p="+pattern;
      var href;
      var sgViewportPathname = document.getElementById("sg-viewport").contentWindow.location.pathname;
      var pathParts = sgViewportPathname.split("/");

      if (pathParts.length > 3 && (
          (pathParts[1] !== "patterns" && pathParts[2] === "patterns") ||
          (pathParts[1] !== "styleguide" && pathParts[2] === "styleguide")))
      {
        addressReplacement += "&subsite="+pathParts[1];
        href = sgViewportPathname.substr(1);
      } else {
        href = urlHandler.getFileName(pattern);
      }

      // add to the history
      history.pushState(data, null, addressReplacement);
      // update title
      document.getElementById("title").innerHTML = "Fepper - "+pattern;
      // insert multisite path into "Open in new window" link
      document.getElementById("sg-raw").setAttribute("href", href);
    }
  };

  /* Pattern Lab accordion dropdown */
  // Accordion dropdown
  $(".fp-nav-container .sg-acc-handle").on("click", function(e){
    e.preventDefault();

    var $this = $(this),
      $panel = $this.next(".fp-nav-container .sg-acc-panel"),
      subnav = $this.parent().parent().hasClass("sg-acc-panel");

    //Close other panels if link isn't a subnavigation item
    if (!subnav) {
      $(".fp-nav-container .sg-acc-handle").not($this).removeClass("active");
      $(".fp-nav-container .sg-acc-panel").not($panel).removeClass("active");
    }

    //Activate selected panel
    $this.toggleClass("active");
    $panel.toggleClass("active");
    setAccordionHeight();
  });

  //Accordion Height
  function setAccordionHeight() {
    var $activeAccordion = $(".fp-nav-container .sg-acc-panel.active").first(),
      accordionHeight = $activeAccordion.height(),
      sh = $(document).height(), //Viewport Height
      $headerHeight = $(".sg-header").height(),
      availableHeight = sh-$headerHeight; //Screen height minus the height of the header

    $activeAccordion.height(availableHeight); //Set height of accordion to the available height
  }

  $(".fp-nav-container .sg-nav-toggle").on("click", function(e){
    e.preventDefault();
    $(".fp-nav-container .sg-nav-container").toggleClass("active");
  });

  // update the iframe with the source from clicked element in pull down menu. also close the menu
  // having it outside fixes an auto-close bug i ran into
  // replacing the default listener
  $(".sg-nav a").not(".sg-acc-handle").off("click", "**");
  $(".sg-nav a").not(".sg-acc-handle").on("click", function(e){

    e.preventDefault();

    // update the iframe via the history api handler
    var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
    var $this = $(this);
    var navLinkHref = $this.attr("href");
    var hrefParts = navLinkHref.split("/");
    var sgViewportPathname = document.getElementById("sg-viewport").contentWindow.location.pathname;
    var pathnameParts = sgViewportPathname.split("/");

    if (pathnameParts.length > 3 && (
        (pathnameParts[1] !== "patterns" && pathnameParts[2] === "patterns") ||
        (pathnameParts[1] !== "styleguide" && pathnameParts[2] === "styleguide")))
    {
      if (hrefParts.length > 2 && (
          (hrefParts[0] !== "patterns" && hrefParts[1] === "patterns") ||
          (hrefParts[0] !== "styleguide" && hrefParts[1] === "styleguide")))
      {
        navLinkHref = hrefParts.splice(1).join("/");
      } else {
        navLinkHref = "../" + navLinkHref;
      }
    }

    document.getElementById("sg-viewport").contentWindow.postMessage( { "path": navLinkHref }, targetOrigin);

    // close up the menu
    $this.parents(".fp-nav-container .sg-acc-panel").toggleClass("active");
    $this.parents(".fp-nav-container .sg-acc-panel").siblings(".sg-acc-handle").toggleClass("active");

    return false;

  });

  // push viewport down beyond expanded toolbar
  document.getElementById("sg-vp-wrap").style.top = "4.125em";

  // load iframe on parent load
  // possible but unlikely race condition here with the default location.replace
  // will ignore unless it becomes a recurring problem
  var oGetVars = urlHandler.getRequestVars();
  if (typeof oGetVars.subsite === "string" && oGetVars.subsite) {
    if (typeof oGetVars.p === "string" && oGetVars.p) {
      var iFramePath;
      var iFrameLocation = document.getElementById("sg-viewport").contentWindow.location;
      var patternPath;

      patternPath = msPatternPaths[oGetVars.subsite][oGetVars.p];
      iFramePath = window.location.protocol+"//"+window.location.host+"/"+oGetVars.subsite+"/"+patternPath;
      document.getElementById("sg-viewport").contentWindow.location.replace(iFramePath);
      document.getElementById("sg-raw").setAttribute("href", oGetVars.subsite+"/"+patternPath);
    }
  }
})();

