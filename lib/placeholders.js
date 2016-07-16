'use strict';

const strftime = require('strftime');

const slugify = require('./slug').slugify;

// This methods mimicks https://github.com/jekyll/jekyll/blob/1c937013fdf702864f8ac6f75a1ff6dd784e2f88/lib/jekyll/drops/url_drop.rb
const urlPlaceholders = function (obj) {
  const data = obj.data || {};
  const published = obj.date;

  const result = {
    // collection: obj.collection.label
    output_ext: '.html',
    name: slugify(obj.basename_without_ext),
    title: slugify(data.slug, 'pretty', true) || slugify(obj.basename_without_ext, 'pretty', true),
    slug: slugify(data.slug) || slugify(obj.basename_without_ext),
    categories: data.categories.map(category => category.toLowerCase()).join('/'),
    year: strftime('%Y', published),
    month: strftime('%m', published),
    day: strftime('%d', published),
    hour: strftime('%H', published),
    minute: strftime('%M', published),
    second: strftime('%S', published),
    i_day: strftime('%-d', published),
    i_month: strftime('%-m', published),
    short_month: strftime('%b', published),
    short_year: strftime('%y', published),
    y_day: strftime('%j', published)
  };

  return result;
};

module.exports = {
  urlPlaceholders
};
