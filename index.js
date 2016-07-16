'use strict';

const { slugify } = require('./lib/slug');
const { urlPlaceholders } = require('./lib/placeholders');
const { JekyllUrl, generateUrl } = require('./lib/url');

module.exports = {
  slugify,
  urlPlaceholders,
  JekyllUrl,
  generateUrl
};
