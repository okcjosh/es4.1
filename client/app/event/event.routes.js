'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('event', {
    url: '/event',
    template: '<event></event>'
  });
}
