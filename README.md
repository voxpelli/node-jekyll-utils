# Jekyll Utils

[![Build Status](https://travis-ci.org/voxpelli/node-jekyll-utils.svg?branch=master)](https://travis-ci.org/voxpelli/node-jekyll-utils)
[![Coverage Status](https://coveralls.io/repos/voxpelli/node-jekyll-utils/badge.svg)](https://coveralls.io/r/voxpelli/node-jekyll-utils)
[![Dependency Status](https://gemnasium.com/voxpelli/node-jekyll-utils.svg)](https://gemnasium.com/voxpelli/node-jekyll-utils)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat)](https://github.com/Flet/semistandard)

A collection of Jekyll utilility methods to generate eg. Jekyll permalinks and slugs

## Requirements

Requires at least Node.js 5.x

## Installation

```bash
npm install jekyll-utils --save
```

## API Usage

### slugify

Slugify a filename or title.

When mode is "none", return the given string.

When mode is "raw", return the given string,
with every sequence of spaces characters replaced with a hyphen.

When mode is "default" or nil, non-alphabetic characters are
replaced with a hyphen too.

When mode is "pretty", some non-alphabetic characters (.\_~!$&'()+,;=@)
are not replaced with hyphen.

If cased is true, all uppercase letters in the result string are
replaced with their lowercase counterparts.

**Parameters**

-   `str` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the string to create a slug of
-   `mode` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** how string is slugified. Can be set to "default", "pretty" or "raw" (optional, default `default`)
-   `cased` **\[[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)]** – whether to keep the character casing or not (optional, default `false`)

**Examples**

```javascript
slugify('The _config.yml file')
// => 'the-config-yml-file'
```

```javascript
slugify('The _config.yml file', 'pretty')
// => 'the-_config.yml-file'
```

```javascript
slugify('The _config.yml file', 'pretty', true)
// => 'The-_config.yml file'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the slugified string

### generateUrl

**Parameters**

-   `template` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The String used as template for URL generation,
    for example "/:path/:basename:output_ext", where
    a placeholder is prefixed with a colon. Or one of the predefined styles "pretty", "none", "date" or "ordinal". (optional, default `date`)
-   `jekyllResource` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** A representation of a Jekyll resource such as a Post or a Page
    -   `jekyllResource.basename_without_ext` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The file basename without the file extension.
    -   `jekyllResource.date` **([Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** The published date of the resource
    -   `jekyllResource.data` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** The resource document's data
        -   `jekyllResource.data.categories` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>]** The categories specified on the document
        -   `jekyllResource.data.slug` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The slug specified on the document


-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if not all needed placeholders are found

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the String URL

### JekyllUrl

Methods that generate a URL for a resource such as a Post or a Page.

**Parameters**

-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** One of :permalink or :template must be supplied.
    -   `options.template` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The String used as template for URL generation,
        or example "/:path/:basename:output_ext", where
        a placeholder is prefixed with a colon.
    -   `options.null` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** :placeholders - A hash containing the placeholders which will be
        replaced when used inside the template. E.g.
        { year: (new Date()).getFullYear() } would replace
        the placeholder ":year" with the current year.
    -   `options.permalink` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** If supplied, no URL will be generated from the
        template. Instead, the given permalink will be
        used as URL.

**Examples**

```javascript
new JekyllUrl({
  template: '/:categories/:title.html',
  placeholders: {':categories': 'ruby', ':title' => 'something'}
}).toString();
```

#### toString

Generates the relative URL of the resource

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if the relative URL contains a colon

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the String URL

#### generated_permalink

Generates a URL from the permalink

Returns **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | false)** the unsanitized String URL

#### generated_url

Generates a URL from the template

Returns **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | false)** the unsanitized String URL

#### sanitize_url

**Parameters**

-   `str` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an unsanitized String URL

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a sanitized String URL, stripping "../../" and multiples of "/",
as well as the beginning "/" so we can enforce and ensure it.

#### escape_path

Escapes a path to be a valid URL path segment

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The path to be escaped.

**Examples**

```javascript
JekyllUrl.escape_path('/a b')
// => '/a%20b'
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the escaped path.
