'use strict';

const XRegExp = require('xregexp');

// These constants mimicks https://github.com/jekyll/jekyll/blob/9278eb8fcec85b17573c6658d7d67ef6ea6ffb92/lib/jekyll/utils.rb#L10
const SLUGIFY_RAW_REGEXP = XRegExp('\\s+');
const SLUGIFY_DEFAULT_REGEXP = XRegExp('[^\\pL\\pN]+');
const SLUGIFY_PRETTY_REGEXP = XRegExp('[^\\pL\\pN._~!$&\'()+,;=@]+');

const SLUGIFY_TRAILING_LEADING_HYPHEN = /^-|-$/g;

// This methods mimicks https://github.com/jekyll/jekyll/blob/9278eb8fcec85b17573c6658d7d67ef6ea6ffb92/lib/jekyll/utils.rb#L177
const slugify = function (str, mode, cased) {
  if (!str) { return str; }

  mode = mode || 'default';

  let replacer;

  if (mode === 'raw') {
    replacer = SLUGIFY_RAW_REGEXP;
  } else if (mode === 'default') {
    replacer = SLUGIFY_DEFAULT_REGEXP;
  } else if (mode === 'pretty') {
    replacer = SLUGIFY_PRETTY_REGEXP;
  } else {
    return cased ? str : str.toLowerCase();
  }

  let slug = str;

  if (replacer) {
    slug = replacer.replace(slug, '-');
    slug = slug.replace(SLUGIFY_TRAILING_LEADING_HYPHEN, '');
  }

  return cased ? slug : slug.toLowerCase();
};

module.exports = {
  slugify
};
