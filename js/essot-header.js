var essotHomeApp = angular.module('essotHeader', []);

essotHomeApp.controller('essotHeaderController', function($scope, $http) {

  $scope.menus = [];
  $http.get('http://localhost:8080/essotg/rest/category/menu')

	.success(function(data) {
      $scope.loaded = true;
      $scope.menus = data;
	})
	.error(function(err) {
      alert(err);
    });
});