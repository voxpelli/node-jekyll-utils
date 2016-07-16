'use strict';

const XRegExp = require('xregexp');

// These constants mimicks https://github.com/jekyll/jekyll/blob/9278eb8fcec85b17573c6658d7d67ef6ea6ffb92/lib/jekyll/utils.rb#L10
const SLUGIFY_RAW_REGEXP = XRegExp('\\s+', 'g');
const SLUGIFY_DEFAULT_REGEXP = XRegExp('[^\\pL\\pN]+', 'g');
const SLUGIFY_PRETTY_REGEXP = XRegExp('[^\\pL\\pN._~!$&\'()+,;=@]+', 'g');

const SLUGIFY_TRAILING_LEADING_HYPHEN = /^-|-$/g;

/**
 * Slugify a filename or title.
 *
 * When mode is "none", return the given string.
 *
 * When mode is "raw", return the given string,
 * with every sequence of spaces characters replaced with a hyphen.
 *
 * When mode is "default" or nil, non-alphabetic characters are
 * replaced with a hyphen too.
 *
 * When mode is "pretty", some non-alphabetic characters (._~!$&'()+,;=@)
 * are not replaced with hyphen.
 *
 * If cased is true, all uppercase letters in the result string are
 * replaced with their lowercase counterparts.
 *
 * @example
 * slugify('The _config.yml file')
 * // => 'the-config-yml-file'
 *
 * @example
 * slugify('The _config.yml file', 'pretty')
 * // => 'the-_config.yml-file'
 *
 * @example
 * slugify('The _config.yml file', 'pretty', true)
 * // => 'The-_config.yml file'
 *
 * @name slugify
 * @param  {string} str - the string to create a slug of
 * @param  {string} [mode=default] - how string is slugified. Can be set to "default", "pretty" or "raw"
 * @param  {boolean} [cased=false] – whether to keep the character casing or not
 * @return {string} the slugified string
 * @see {@link https://github.com/jekyll/jekyll/blob/9278eb8fcec85b17573c6658d7d67ef6ea6ffb92/lib/jekyll/utils.rb#L177|Mimicked Jekyll Code}
 */
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
    slug = XRegExp.replace(slug, replacer, '-');
    slug = slug.replace(SLUGIFY_TRAILING_LEADING_HYPHEN, '');
  }

  return cased ? slug : slug.toLowerCase();
};

module.exports = {
  slugify
};
