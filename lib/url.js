'use strict';

const urlPlaceholders = require('./placeholders').urlPlaceholders;

const resolveDefaultPermalinkStyles = function (style) {
  let template;

  switch (style) {
    case 'pretty':
      template = '/:categories/:year/:month/:day/:title/';
      break;
    case 'none':
      template = '/:categories/:title:output_ext';
      break;
    case 'date':
      template = '/:categories/:year/:month/:day/:title:output_ext';
      break;
    case 'ordinal':
      template = '/:categories/:year/:y_day/:title:output_ext';
      break;
    default:
      template = style;
  }

  return template;
};

/**
 * @name generateUrl
 * @param {string} [template=date] - The String used as template for URL generation,
 * for example "/:path/:basename:output_ext", where
 * a placeholder is prefixed with a colon. Or one of the predefined styles "pretty", "none", "date" or "ordinal".
 * @param {object} jekyllResource - A representation of a Jekyll resource such as a Post or a Page
 * @param {string} jekyllResource.basename_without_ext - The file basename without the file extension.
 * @param {Date|number} jekyllResource.date - The published date of the resource
 * @param {object} [jekyllResource.data] - The resource document's data
 * @param {string[]} [jekyllResource.data.categories] - The categories specified on the document
 * @param {string} [jekyllResource.data.slug] - The slug specified on the document
 * @returns {string} the String URL
 * @throws {Error} if not all needed placeholders are found
 */
const generateUrl = function (template, jekyllResource) {
  template = resolveDefaultPermalinkStyles(template || 'date');

  const placeholders = urlPlaceholders(jekyllResource);

  return new JekyllUrl({
    template,
    placeholders
  }).toString();
};

/**
 * Methods that generate a URL for a resource such as a Post or a Page.
 *
 * @example
 * new JekyllUrl({
 *   template: '/:categories/:title.html',
 *   placeholders: {':categories': 'ruby', ':title' => 'something'}
 * }).toString();
 *
 * @class JekyllUrl
 * @param {object} options - One of :permalink or :template must be supplied.
 * @param {string} options.template - The String used as template for URL generation,
 * or example "/:path/:basename:output_ext", where
 * a placeholder is prefixed with a colon.
 * @param {string} options.:placeholders - A hash containing the placeholders which will be
 * replaced when used inside the template. E.g.
 * { year: (new Date()).getFullYear() } would replace
 * the placeholder ":year" with the current year.
 * @param {string} options.permalink - If supplied, no URL will be generated from the
 * template. Instead, the given permalink will be
 * used as URL.
 * @see {@link https://github.com/jekyll/jekyll/blob/cc82d442223bdaee36a2aceada64008a0106d82b/lib/jekyll/url.rb|Mimicked Jekyll Code}
 */
function JekyllUrl (options) {
  options = options || {};

  this.template = options.template;
  this.placeholders = options.placeholders;
  this.permalink = options.permalink;

  if (!this.template) {
    throw new Error('One of template or permalink must be supplied.');
  }
}

/**
 * Generates the relative URL of the resource
 *
 * @returns {string} the String URL
 * @throws {Error} if the relative URL contains a colon
 */
JekyllUrl.prototype.toString = function () {
  let sanitizedUrl = this.sanitize_url(this.generated_permalink() || this.generated_url());

  if (sanitizedUrl.includes(':')) {
    throw new Error('The URL' + sanitizedUrl + 'is invalid because it contains a colon.');
  }

  return sanitizedUrl;
};

/**
 * Generates a URL from the permalink
 *
 * @returns {string|false} the unsanitized String URL
 */
JekyllUrl.prototype.generated_permalink = function () {
  return this.permalink ? this.generate_url(this.permalink) : false;
};

/**
 * Generates a URL from the template
 *
 * @returns {string|false} the unsanitized String URL
 */
JekyllUrl.prototype.generated_url = function () {
  return this.template ? this.generate_url(this.template) : false;
};

/**
 * Internal: Generate the URL by replacing all placeholders with their
 * respective values in the given template
 *
 * @private
 * @param {string} template - The String used as template for URL generation,
 * for example "/:path/:basename:output_ext", where
 * a placeholder is prefixed with a colon.
 * @returns {string} the unsanitized String URL
 */
JekyllUrl.prototype.generate_url = function (template) {
  return Object.keys(this.placeholders).reduce(
    (result, token) => result.split(':' + token).join(this.constructor.escape_path(this.placeholders[token] || '')),
    template
  );
};

/**
 * @param {string} str an unsanitized String URL
 * @returns {string} a sanitized String URL, stripping "../../" and multiples of "/",
 * as well as the beginning "/" so we can enforce and ensure it.
 */
JekyllUrl.prototype.sanitize_url = function (str) {
  return '/' + str.replace(/\/{2,}/g, '/').replace(/\.+\/|^\/+/g, '');
};

/**
 * Escapes a path to be a valid URL path segment
 *
 * @example
 * JekyllUrl.escape_path('/a b')
 * // => '/a%20b'
 *
 * @param {string} path - The path to be escaped.
 * @returns {string} the escaped path.
 */
JekyllUrl.escape_path = function (path) {
  /*
   * Specify unsafe string (except unreserved, sub-delims, ":", "@" and "/").
   *
   * URI path segment is defined in RFC 3986 as follows:
   *   segment       = *pchar
   *   pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
   *   unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
   *   pct-encoded   = "%" HEXDIG HEXDIG
   *   sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
   *                 / "*" / "+" / "," / ";" / "="
   */
  return path.replace(/([^a-zA-Z\d\-._~!$&'()*+,;=:@/])/g, match => encodeURIComponent(match));
};

module.exports = {
  generateUrl,
  JekyllUrl
};
