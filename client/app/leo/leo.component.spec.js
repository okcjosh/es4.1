'use strict';

import leo from './leo.component';
import {
  LeoController
} from './leo.component';

describe('Component: LeoComponent', function() {
  beforeEach(angular.mock.module(leo));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var leoComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/leos')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    leoComponent = $componentController('leo', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of leos to the controller', function() {
    leoComponent.$onInit();
    $httpBackend.flush();
    expect(leoComponent.awesomeLeos.length)
      .to.equal(4);
  });
});
