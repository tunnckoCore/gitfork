/**
 * gitfork <https://github.com/tunnckoCore/gitfork>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var got = require('then-got');
var fmt = require('util').format;
var rex = require('github-short-url-regex');
var api = 'https://api.github.com/repos';

module.exports = function gitfork(pattern, token, opts) {
  if (!pattern) {
    throw new Error('[gitfork] expect at least 2 arguments');
  }

  if (typeof token !== 'string') {
    throw new Error('[gitfork] expect `token` be string');
  }

  if (!rex().test(pattern)) {
    throw new Error('[gitfork] expect valid `user/repo` pattern');
  }

  api = fmt('%s/%s/forks', api, pattern);
  token = fmt('token %s', token);

  var options = {};
  options.body = opts.org ? '{"organization": "' + opts.org + '"}': '';
  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token
  }


  var promise = got.post(api, options);

  return opts && opts.silent ? promise : promise.then(function(res) {
    return [JSON.parse(res[0]), res[1].statusCode];
  });
};
