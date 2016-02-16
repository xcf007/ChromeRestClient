'use strict';
/*******************************************************************************
 * Copyright 2012 Pawel Psztyc
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ******************************************************************************/

/**
 * Advanced Rest Client namespace
 */
var arc = arc || {};
/**
 * ARC app's namespace
 */
arc.app = arc.app || {};
/**
 * A namespace for the utilis functions
 */
arc.app.utils = {};
/**
 * Generate a RFC4122, version 4 ID. Example:
 * "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * http://stackoverflow.com/a/21963136/1127848
 * @return {String} The UUID string.
 */
arc.app.utils.uuid = function() {
  // jscs:disable
  /* jshint ignore:start */
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }
  var fn = function() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] +
      lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' +
      lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] +
      lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
      lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  };
  return fn();
  // jscs:enable
  /* jshint ignore:end */
};
/**
 * This function will search for links in the `input` and replace it with anchor.
 *
 * @param {String} input A search string
 * @return {String} Parsed string.
 */
arc.app.utils.autoLink = function(input) {
  var r = new RegExp('(https?:\\/\\/([^" >]*))', 'gim');
  return input.replace(r, '<a target="_blank" class="auto-link" href="$1">$1</a>');
};
/**
 * Escape characters to display HTML code.
 *
 * @return {String} Encoded string.
 */
arc.app.utils.encodeHtml = function(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
arc.app.utils._chromeVersion = null;
/**
 * Get Chrome full version.
 *
 * @type {String} A full version or `(not set)` is can't find.
 */
Object.defineProperty(arc.app.utils, 'chromeVersion', {
  enumerable: true,

  get: function() {
    if (arc.app.utils._chromeVersion) {
      return arc.app.utils._chromeVersion;
    }
    var raw = navigator.userAgent.match(/Chrom[e|ium]\/([0-9\.]+)/);
    arc.app.utils._chromeVersion = raw ? raw[1] : '(not set)';
    return arc.app.utils._chromeVersion;
  },

  set: function(value) {
    throw new Error('appVer can\'t be overrited.');
  }
});
arc.app.utils._appVer = null;
/**
 * Get ARC version from the manifest file.
 *
 * @type {String} An ARC version.
 */
Object.defineProperty(arc.app.utils, 'appVer', {
  enumerable: true,

  get: function() {
    if (arc.app.utils._appVer) {
      return arc.app.utils._appVer;
    }
    arc.app.utils._appVer = chrome.runtime.getManifest().version;
    return arc.app.utils._appVer;
  },

  set: function(value) {
    throw new Error('appVer can\'t be overrited.');
  }
});