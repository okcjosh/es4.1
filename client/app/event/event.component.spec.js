'use strict';

import event from './event.component';
import {
  EventController
} from './event.component';

describe('Component: EventComponent', function() {
  beforeEach(angular.mock.module(event));
  beforeEach(angular.mock.module('stateMock'));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var eventComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/events')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    eventComponent = $componentController('event', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of events to the controller', function() {
    eventComponent.$onInit();
    $httpBackend.flush();
    expect(eventComponent.awesomeEvents.length)
      .to.equal(4);
  });
});
