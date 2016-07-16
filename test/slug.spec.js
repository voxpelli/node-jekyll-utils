'use strict';

const chai = require('chai');

const should = chai.should();

describe('Slug', function () {
  const slugify = require('../lib/slug').slugify;

  describe('slugify', function () {
    // Tests taken from https://github.com/jekyll/jekyll/blob/70aa8a4e37cdbb935d8aacda3d6c6b598c2c91bb/test/test_utils.rb#L129

    it('should return undefined if passed undefined', () => {
      should.not.exist(slugify());
    });

    it('should replace whitespace with hyphens', () => {
      slugify('Working with drafts').should.equal('working-with-drafts');
    });

    it('should replace consecutive whitespace with a single hyphen', () => {
      slugify('Basic   Usage').should.equal('basic-usage');
    });

    it('should trim leading and trailing whitespace', () => {
      slugify('  Working with drafts   ').should.equal('working-with-drafts');
    });

    it('should drop trailing punctuation', () => {
      slugify('So what is Jekyll, exactly?').should.equal('so-what-is-jekyll-exactly');
      slugify('كيف حالك؟').should.equal('كيف-حالك');
    });

    it('should ignore hyphens', () => {
      slugify('Pre-releases').should.equal('pre-releases');
    });

    it('should replace underscores with hyphens', () => {
      slugify('The _config.yml file').should.equal('the-config-yml-file');
    });

    it('should combine adjacent hyphens and spaces', () => {
      slugify('Customizing Git - Git Hooks').should.equal('customizing-git-git-hooks');
    });

    it('should replace punctuation in any scripts by hyphens', () => {
      slugify('5時〜6時 三・一四').should.equal('5時-6時-三-一四');
    });

    it('should not modify the original string', () => {
      let title = 'Quick-start guide';
      slugify(title);
      title.should.equal('Quick-start guide');
    });

    it('should not change behaviour if mode is default', () => {
      slugify('The _config.yml file?', 'default').should.equal('the-config-yml-file');
    });

    it('should not change behaviour if mode is nil', () => {
      slugify('The _config.yml file?').should.equal('the-config-yml-file');
    });

    it('should not replace period and underscore if mode is pretty', () => {
      slugify('The _config.yml file?', 'pretty').should.equal('the-_config.yml-file');
    });

    it('should only replace whitespace if mode is raw', () => {
      slugify('The _config.yml file?', 'raw').should.equal('the-_config.yml-file?');
    });

    it('should return the given string if mode is none', () => {
      slugify('The _config.yml file?', 'none').should.equal('the _config.yml file?');
    });

    it('should Keep all uppercase letters if cased is true', () => {
      slugify('Working with drafts', undefined, true).should.equal('Working-with-drafts');
      slugify('Basic   Usage', undefined, true).should.equal('Basic-Usage');
      slugify('  Working with drafts   ', undefined, true).should.equal('Working-with-drafts');
      slugify('So what is Jekyll, exactly?', undefined, true).should.equal('So-what-is-Jekyll-exactly');
      slugify('Pre-releases', undefined, true).should.equal('Pre-releases');
      slugify('The _config.yml file', undefined, true).should.equal('The-config-yml-file');
      slugify('Customizing Git - Git Hooks', undefined, true).should.equal('Customizing-Git-Git-Hooks');
      slugify('The _config.yml file?', 'default', true).should.equal('The-config-yml-file');
      slugify('The _config.yml file?', undefined, true).should.equal('The-config-yml-file');
      slugify('The _config.yml file?', 'pretty', true).should.equal('The-_config.yml-file');
      slugify('The _config.yml file?', 'raw', true).should.equal('The-_config.yml-file?');
      slugify('The _config.yml file?', 'none', true).should.equal('The _config.yml file?');
    });
  });
});
