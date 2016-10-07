import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './event.routes';

export class EventController {
  awesomeEvents = [];
  newEvent = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.awesomeEvents = response.data;
        this.socket.syncUpdates('event', this.awesomeEvents);
      });

  }
  addEvent() {
    if(this.newEvent) {
      this.$http.post('/api/events', {
        name: this.newEvent
      });
      this.newEvent = '';
    }
  }

  deleteEvent(event) {
    this.$http.delete(`/api/events/${event._id}`);
  }
}


export default angular.module('es41App.event', [uiRouter])
  .config(routing)
  .component('event', {
    template: require('./event.html'),
    controller: EventController
  })
  .name;
