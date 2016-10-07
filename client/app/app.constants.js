'use strict';

import angular from 'angular';

export default angular.module('es41App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
