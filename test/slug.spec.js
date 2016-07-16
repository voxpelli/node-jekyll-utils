'use strict';

const chai = require('chai');

const should = chai.should();

describe('Slug', function () {
  const { slugify } = require('../lib/slug');

  describe('slugify', function () {
    // Tests taken from https://github.com/jekyll/jekyll/blob/70aa8a4e37cdbb935d8aacda3d6c6b598c2c91bb/test/test_utils.rb#L129

    it('should return undefined if passed undefined', () => {
      should.not.exist(slugify());
    });
  });
});
