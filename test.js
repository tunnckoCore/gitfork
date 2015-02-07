/**
 * gitfork <https://github.com/tunnckoCore/gitfork>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var gitfork = require('./index');

gitfork('jonschlinkert/extglob', '[you personal access key here]', {
  org: 'regexps'
})
.then(console.log)
.catch(console.log)
