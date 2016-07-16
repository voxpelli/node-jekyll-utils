'use strict';

const slugify = require('./lib/slug').slugify;
const urlPlaceholders = require('./lib/placeholders').urlPlaceholders;
const libUrl = require('./lib/url');

module.exports = {
  slugify,
  urlPlaceholders,
  JekyllUrl: libUrl.JekyllUrl,
  generateUrl: libUrl.generateUrl
};
