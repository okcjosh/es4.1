import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './leo.routes';

export class LeoController {
  awesomeLeos = [];
  newLeo = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('leo');
    });
  }

  $onInit() {
    this.$http.get('/api/leos')
      .then(response => {
        this.awesomeLeos = response.data;
        this.socket.syncUpdates('leo', this.awesomeLeos);
      });

  }
  addLeo() {
    if(this.newLeo) {
      this.$http.post('/api/leos', {
        name: this.newLeo
      });
      this.newLeo = '';
    }
  }

  deleteLeo(leo) {
    this.$http.delete(`/api/leos/${leo._id}`);
  }
}


export default angular.module('es41App.leo', [uiRouter])
  .config(routing)
  .component('leo', {
    template: require('./leo.html'),
    controller: LeoController
  })
  .name;
