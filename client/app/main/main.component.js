import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  awesomeLeos = [];
  newLeo = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('leo');
    });
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
    this.$http.get('/api/leos')
      .then(response => {
        this.awesomeLeos = response.data;
        this.socket.syncUpdates('leo', this.awesomeLeos);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }
  addLeo() {
    if(this.newLeo) {
      this.$http.post('/api/leos', {
        name: this.newLeo
      });
      this.newLeo = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
  deleteLeo(leo) {
    this.$http.delete(`/api/leos/${leo._id}`);
  }
}


export default angular.module('es41App.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
