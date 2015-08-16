'use strict';

angular.module('stockQuote.version', [
  'stockQuote.version.interpolate-filter',
  'stockQuote.version.version-directive'
])

.value('version', '0.1');
