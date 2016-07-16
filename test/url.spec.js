'use strict';

const chai = require('chai');

const should = chai.should();

describe('Url', function () {
  const JekyllUrl = require('../lib/url').JekyllUrl;

  describe('JekyllUrl', function () {
    // Tests taken from https://github.com/jekyll/jekyll/blob/a29498eaaebbccd415cc3b811d050137f456cd9a/test/test_url.rb

    it('should throw an exception if neither permalink or template is specified', () => {
      should.Throw(() => new JekyllUrl({ placeholders: {} }));
    });

    it('should replace placeholders in templates', () => {
      new JekyllUrl({
        template: '/:x/:y',
        placeholders: { x: 'foo', y: 'bar' }
      }).toString().should.equal('/foo/bar');
    });

    it('should handle multiple of the same key in the template', () => {
      new JekyllUrl({
        template: '/:x/:y/:x/',
        placeholders: { x: 'foo', y: 'bar' }
      }).toString().should.equal('/foo/bar/foo/');
    });

    it('should use permalink if given', () => {
      new JekyllUrl({
        template: '/:x/:y',
        placeholders: { x: 'foo', y: 'bar' },
        permalink: '/le/perma/link'
      }).toString().should.equal('/le/perma/link');
    });

    it('should replace placeholders in permalinks', () => {
      new JekyllUrl({
        template: '/baz',
        permalink: '/:x/:y',
        placeholders: { x: 'foo', y: 'bar' }
      }).toString().should.equal('/foo/bar');
    });

    it('should handle multiple of the same key in the permalink', () => {
      new JekyllUrl({
        template: '/baz',
        permalink: '/:x/:y/:x/',
        placeholders: { x: 'foo', y: 'bar' }
      }).toString().should.equal('/foo/bar/foo/');
    });

    it('should handle null values for keys in the template', () => {
      new JekyllUrl({
        template: '/:x/:y/:z/',
        placeholders: { x: 'foo', y: 'bar', z: null }
      }).toString().should.equal('/foo/bar/');
    });

    it('should throw an exception if the URL contains a colon', () => {
      const url = new JekyllUrl({
        template: '/:x/:y/:z',
        placeholders: { x: 'foo', z: 'bar' }
      });
      should.Throw(() => url.toString());
    });

    // Tests taken from https://github.com/jekyll/jekyll/blob/eebb6414bf9dbcb3e02ed11b22cde3e6f96b7f4f/test/test_post.rb

    it('should escape urls', () => {
      JekyllUrl.escape_path('/2009/03/12/hash-#1').should.equal('/2009/03/12/hash-%231');
    });

    it('should escape urls with non-alphabetic characters', () => {
      JekyllUrl.escape_path('/2014/03/22/escape-+ %20[]').should.equal('/2014/03/22/escape-+%20%2520%5B%5D');
    });
  });
});
